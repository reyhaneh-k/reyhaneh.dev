# Project Structure & Conventions

This document defines how this project is organized and the rules every file
follows. It's a **folder-per-unit, co-located, no-barrel** layout for a
Vite + React + TypeScript app. Read it before adding files — the conventions are
deliberate and several are enforced by ESLint.

**Stack:** Vite 8 (Rolldown) · React · TypeScript 6 · ESLint 10 (flat config,
type-aware) · Prettier · Husky + lint-staged · `vite-plugin-svgr` · Sentry.

---

## 1. Top-level layout

Everything lives under `src/`, which is the target of the `@/` path alias.

```
src/
├─ main.tsx              # entry: side-effect init, then mounts <App/>
├─ App.tsx              # root: composes providers + router
├─ vite-env.d.ts        # /// <reference types="vite/client" /> + vite-plugin-svgr/client
│
├─ components/
│  ├─ prim/             # primitives: atomic, app-agnostic (button, input, modal)
│  └─ modules/          # composites: feature-aware, may nest `subs/`
├─ layout/              # route shells (rootLayout, authLayout …), may nest `subs/`
├─ pages/               # route leaves, one per route (default export)
├─ hooks/               # useX units
├─ providers/           # context providers (+ their mount-time side effects)
├─ stores/              # client state units (zustand/jotai)
├─ utils/               # pure, React-free helpers
├─ consts/              # flat files of app-wide constants
├─ types/               # flat files of shared TypeScript types
├─ styles/              # global CSS / tokens only
└─ assets/
   ├─ icons/            # monochrome SVGs → SVGR component, `currentColor`
   ├─ svgs/             # multicolor SVGs → SVGR component, colors preserved
   └─ imgs/             # raster images → URL imports
```

---

## 2. Core conventions (apply everywhere)

### Imports use the `@/` alias — never relative climbs

```ts
import { Button } from "@/components/prim/button/Button"; // ✅
import { Button } from "../../components/prim/button/Button"; // ❌
```

### No barrels — import the file, not the folder

There are **no** `index.ts` barrel files. To import a unit you name its main
file, which means the last path segment repeats:

```ts
import { Button } from "@/components/prim/button/Button";
import { useAuth } from "@/hooks/useAuth/useAuth";
import { formatDate } from "@/utils/formatDate/formatDate";
```

This repetition (`button/Button`, `useAuth/useAuth`) is intentional and expected.
Barrels are avoided because a bare `index.ts` forces the bundler and the TS
server to load every module the barrel touches during dev/cold builds, and
because side-effectful or large barrels (especially over `assets/`) can defeat
tree-shaking. Files named `index.types.ts` / `index.consts.ts` / `index.helpers.ts`
are **not** barrels — only a bare `index.ts` would be; the `index.` prefix here
is just a naming choice and resolves as a normal file.

### Folder names are lowercase; multi-word is camelCase

```
button/        userCard/       loginForm/
useAuth/       authStore/      rootLayout/
```

Consistent casing is also our case-sensitivity safety net (see §7).

---

## 3. Unit types

Each unit is a folder containing a main file plus co-located siblings. Summary:

### components/prim

Atomic, reusable, knows nothing about the app's features.

```
components/prim/button/
├─ Button.tsx          # export function Button() { … }  ← ONE named export
├─ index.types.ts
├─ index.consts.ts
└─ index.helpers.ts
```

### components/modules

Composite components that use primitives and are feature-aware. May nest a
`subs/` folder for private child components — recursively shaped like `prim`
units (each sub is its own folder with a named export).

```
components/modules/loginForm/
├─ LoginForm.tsx       # ONE named export
├─ index.types.ts
├─ index.consts.ts
├─ index.helpers.ts
└─ subs/
   └─ passwordField/
      ├─ PasswordField.tsx   # named export
      └─ index.types.ts
```

### layout

Route shells that wrap pages with shared chrome (nav, sidebar, footer) via an
`<Outlet/>`. Module-shaped (named export, `subs/` allowed). Layouts are imported
eagerly as part of the route tree, so they use **named** exports — flip a single
layout to a default export only if you specifically lazy-load it.

```
layout/rootLayout/
├─ RootLayout.tsx      # ONE named export
├─ index.types.ts
└─ subs/
   └─ navbar/
      ├─ Navbar.tsx    # named export
      └─ index.types.ts
```

### pages

One folder per route. Identical in shape to a module **except** the main file
has exactly **one default export**, because pages are the code-split boundary:

```ts
const Home = lazy(() => import("@/pages/home/Home")); // default export
```

```
pages/home/
├─ Home.tsx            # export default function Home() { … }  ← ONE default export
├─ index.types.ts
├─ index.consts.ts
├─ index.helpers.ts
└─ subs/               # subs are components → NAMED exports
```

### hooks

Shaped like components, but the main file is `useX.ts` (not `.tsx`, no JSX) and
the export is named. No `subs/`.

```
hooks/useMediaQuery/
├─ useMediaQuery.ts    # export function useMediaQuery() { … }  ← named
└─ index.types.ts
```

### providers

Context providers, shaped like a component (`XProvider.tsx`, named export). A
provider may own **mount-time** side effects — put those in a co-located
`sideEffect.ts` and run them from a `useEffect` inside the provider. (Side
effects that must run _before_ React are entry-level, not provider-owned — see §5.)

```
providers/theme/
├─ ThemeProvider.tsx   # named export
├─ sideEffect.ts       # optional: mount-time effect this provider owns
└─ index.types.ts
```

### stores

Client-state units (Zustand/Jotai), shaped like hooks but the `use` prefix is
dropped from the **file and folder** name. The exported hook keeps its `use`
prefix, because React's rules-of-hooks require it:

```
stores/authStore/
├─ authStore.ts        # export const useAuthStore = create(…)  ← named
└─ index.types.ts
```

```ts
import { useAuthStore } from "@/stores/authStore/authStore";
```

### utils

Pure, React-free helpers. Hook-shaped folder, main file `x.ts`, named export.

```
utils/formatDate/
├─ formatDate.ts       # export function formatDate() { … }  ← named
└─ index.types.ts
```

### consts & types

Flat files directly in the folder — no per-unit subfolders. Named exports for
`consts`; plain type/interface exports for `types`.

```
consts/routes.ts   consts/config.ts
types/user.ts      types/api.ts
```

### styles

Freestyle. Reserved for **global** concerns only: resets, design tokens,
CSS variables. Component-specific styles co-locate next to their component.

---

## 4. Export rules

- **Named exports by default**, everywhere. They refactor cleanly, keep import
  names consistent, fail loudly on typos, and (relevant here) are what let us
  live without barrels comfortably.
- **Default export exceptions**, and only these:
  - `pages/**` route leaves — one default export, for `React.lazy`.
  - SVGR icon/SVG imports — default by necessity (`import Logo from "./x.svg?react"`).
  - A layout you explicitly lazy-load — flip that one file to default.
- **One export per main file.** A `Component.tsx` exports exactly one component;
  never mix a named and default export of the same thing in one file.

---

## 5. Entry files & side-effect timing

Some setup can't live in a unit because it has no export and must run at a
specific time. Split side effects by **when** they must run:

**Before React (entry-level).** Anything that must initialize before React
mounts and before the app graph loads — e.g. `Sentry.init()`. The file can be
co-located in its unit (`providers/sentry/sideEffect.ts`), but it is imported as
the **first line of** `main.tsx`, as a bare side-effect import:

```ts
// src/main.tsx
// eslint-disable-next-line import-x/order
import "@/providers/sentry/sideEffect"; // FIRST — must precede React
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "@/App";
```

The `eslint-disable` is required: `import-x/order` would otherwise alphabetize
this below the React imports on `--fix` (which lint-staged runs every commit) and
silently reintroduce the timing gap.

**At mount (provider-owned).** Effects that should run within React's lifecycle
(listeners, subscriptions, store↔storage sync) belong in a provider's
`useEffect` / co-located `sideEffect.ts`, not at the entry.

`sideEffect.ts` is the naming convention for any impure, imported-for-effect
module. If `package.json` ever sets `"sideEffects": false`, list these so they
aren't tree-shaken away: `"sideEffects": ["**/sideEffect.ts", "**/*.css"]`.

---

## 6. Assets

Three buckets, wired to two `vite-plugin-svgr` instances plus raw imports:

- `assets/icons/` — monochrome icons. SVGR transforms to components with colors
  converted to `currentColor` (so they inherit CSS `color`), dimensions stripped
  for CSS sizing. Import: `import Logo from "@/assets/icons/logo.svg?react"`.
- `assets/svgs/` — multicolor illustrations. SVGR transforms to components but
  **preserves** their colors and dimensions.
- `assets/imgs/` — raster (png/jpg/webp). Plain URL imports:
  `import hero from "@/assets/imgs/hero.png"`.

Never barrel `assets/` — import each asset file directly.

---

## 7. Case sensitivity (important on Windows/macOS)

Local filesystems are case-insensitive; CI/Linux is case-sensitive. A casing
mismatch that resolves locally will fail the build in CI. Rules:

- Folders lowercase-camel; component/page/layout/provider files PascalCase;
  everything else camelCase — pick the name once and match imports **exactly**.
- `forceConsistentCasingInFileNames` is on (TS default) and will flag mismatches
  on every OS.
- For a case-only rename on Windows, force it through a temp name
  (`ren x.tsx tmp.tsx` → `ren tmp.tsx X.tsx`) and get the casing right **before**
  the first `git add`.

---

## 8. Quick reference

**Do**

- One folder per unit; co-locate `index.types.ts` / `index.consts.ts` / `index.helpers.ts`.
- Import the file (`unit/Unit`), through `@/`.
- Named exports — except `pages` (default) and SVGR imports.
- `subs/` for private children of modules, layouts, and pages.

**Don't**

- No `index.ts` barrels.
- No relative-climb imports (`../../`).
- No barreling `assets/`.
- No second export in a main file.
- Don't let the import sorter move the entry-level side-effect import.
