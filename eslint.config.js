// eslint.config.js
//
// Flat config for ESLint 10 (flat config is the ONLY supported format in v10 —
// .eslintrc* files are no longer read). Targets a Vite + React + TypeScript app.
//
// If your package.json does NOT have "type": "module", rename this file to
// eslint.config.mjs so the `import` statements resolve.

import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import {
  importX,
  createNodeResolver,
} from "eslint-plugin-import-x";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";

import prettier from "eslint-config-prettier/flat";

import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  // ─────────────────────────────────────────────────────────────
  // 1. Global ignores — never linted (build output, deps, generated)
  //    An `ignores`-only entry is global; globalIgnores() makes that explicit.
  // ─────────────────────────────────────────────────────────────
  globalIgnores([
    "dist/**",
    "build/**",
    "coverage/**",
    "node_modules/**",
    "vite.config.*.timestamp-*", // Vite's temp config artifacts
    "**/*.min.js",
  ]),

  // ─────────────────────────────────────────────────────────────
  // 2. Language baseline for all source files
  // ─────────────────────────────────────────────────────────────
  {
    files: ["src/**/*.{js,mjs,cjs,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.es2024,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // 3. Core JS recommended rules
  // ─────────────────────────────────────────────────────────────
  {
    files: ["src/**/*.{js,mjs,cjs,jsx,ts,tsx}"],
    extends: [js.configs.recommended],
  },

  // ─────────────────────────────────────────────────────────────
  // 4. TypeScript — type-aware linting (the "bulletproof" part).
  //    `projectService: true` lets typescript-eslint find the right tsconfig
  //    per file automatically (v8 approach; no manual `project` glob needed).
  // ─────────────────────────────────────────────────────────────
  {
    files: ["src/**/*.{ts,tsx}"],
    extends: [
      tseslint.configs.recommendedTypeChecked,
      tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // 5. React (with the new JSX runtime — no `import React` needed)
  // ─────────────────────────────────────────────────────────────
  {
    files: ["src/**/*.{jsx,tsx}"],
    extends: [
      react.configs.flat.recommended,
      react.configs.flat["jsx-runtime"],
    ],
    settings: {
      react: { version: "19" },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // 6. React Hooks (v7 flat preset — rules-of-hooks + exhaustive-deps).
  //    Use configs.flat['recommended-latest'] instead if you want the
  //    experimental React Compiler rules.
  // ─────────────────────────────────────────────────────────────
  {
    files: ["src/**/*.{jsx,tsx,ts,js}"],
    extends: [reactHooks.configs.flat.recommended],
  },

  // ─────────────────────────────────────────────────────────────
  // 7. Accessibility for JSX
  // ─────────────────────────────────────────────────────────────
  {
    files: ["src/**/*.{jsx,tsx}"],
    extends: [jsxA11y.flatConfigs.recommended],
  },

  // ─────────────────────────────────────────────────────────────
  // 8. Import hygiene + a clean, auto-fixable import order (import-x).
  //    Requires: eslint-import-resolver-typescript (install as devDep).
  // ─────────────────────────────────────────────────────────────
  {
    files: ["src/**/*.{js,mjs,cjs,jsx,ts,tsx}"],
    extends: [importX.flatConfigs.recommended],
  },
  {
    // The `typescript` preset wires up the TS parser + extension settings
    // that the import rules need to understand .ts/.tsx files.
    files: ["src/**/*.{ts,tsx}"],
    extends: [importX.flatConfigs.typescript],
  },
  {
    files: ["src/**/*.{js,mjs,cjs,jsx,ts,tsx}"],
    settings: {
      // The TypeScript resolver reads your tsconfig, so `import-x/no-unresolved`
      // now correctly understands path aliases like "@/components/Button".
      "import-x/resolver-next": [
        createTypeScriptImportResolver({
          alwaysTryTypes: true,
        }),
        createNodeResolver(),
      ],
    },
    rules: {
      // These four are fully covered by TypeScript's own type checking and are
      // expensive/redundant to duplicate here — keep them off. `no-unresolved`
      // stays ON (via the resolver above) since it catches broken paths tsc may
      // not, e.g. case-sensitivity and bad alias config.
      "import-x/named": "off",
      "import-x/namespace": "off",
      "import-x/default": "off",
      "import-x/no-named-as-default-member": "off",
      "import-x/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────
  // 9. Project rule tweaks (sensible defaults — adjust to taste)
  // ─────────────────────────────────────────────────────────────
  {
    files: ["src/**/*.{js,mjs,cjs,jsx,ts,tsx}"],
    rules: {
      // Prefer the TS-aware unused-vars rule; allow `_`-prefixed on purpose.
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "react/prop-types": "off", // TypeScript handles prop types
      "no-console": "error",
      eqeqeq: ["error", "smart"],
    },
  },

  // ─────────────────────────────────────────────────────────────
  // 10. Config / build / plain-JS files run in Node and are NOT type-checked.
  //     `disableTypeChecked` prevents "file not in project" parser errors on
  //     files that live outside your tsconfig's `include`.
  // ─────────────────────────────────────────────────────────────
  {
    files: [
      "**/*.{js,cjs,mjs}",
      "*.config.{js,ts,mjs,cjs}",
    ],
    languageOptions: {
      globals: { ...globals.node },
    },
    extends: [tseslint.configs.disableTypeChecked],
  },

  // ─────────────────────────────────────────────────────────────
  // 11. Prettier — MUST be last. Turns off every rule that would fight
  //     Prettier's formatting. (v10 flat entry point.)
  // ─────────────────────────────────────────────────────────────
  prettier,
]);
