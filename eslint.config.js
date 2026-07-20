// eslint.config.js
//
// Flat config for ESLint 10 (flat config is the ONLY supported format in v10 —
// .eslintrc* files are no longer read). Targets a Vite + React + TypeScript app.
//
// If your package.json does NOT have "type": "module", rename this file to
// eslint.config.mjs so the `import` statements resolve.

import js from "@eslint/js";
import jsonEslint from "@eslint/json";
import { defineConfig, globalIgnores } from "eslint/config";
import prettier from "eslint-config-prettier/flat";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";
import checkFile from "eslint-plugin-check-file";
import pluginRouter from "@tanstack/eslint-plugin-router";
import {
  importX,
  createNodeResolver,
} from "eslint-plugin-import-x";
import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";
import storybook, {
  configs as storyBookConfigs,
} from "eslint-plugin-storybook";

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
    "**/routeTree.gen.ts",
  ]),

  // ─────────────────────────────────────────────────────────────
  // 2. Language baseline for all source files
  // ─────────────────────────────────────────────────────────────
  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],
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
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],
    extends: [js.configs.recommended],
  },

  // ─────────────────────────────────────────────────────────────
  // 4. TypeScript — type-aware linting (the "bulletproof" part).
  //    `projectService: true` lets typescript-eslint find the right tsconfig
  //    per file automatically (v8 approach; no manual `project` glob needed).
  // ─────────────────────────────────────────────────────────────
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: [
            ".storybook/main.ts",
            ".storybook/preview.tsx",
          ],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "no-unused-vars": "off", // defer to the TS-aware version
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/restrict-template-expressions":
        "off",
    },
  },

  // ─────────────────────────────────────────────────────────────
  // 5. React (with the new JSX runtime — no `import React` needed)
  // ─────────────────────────────────────────────────────────────
  {
    files: ["**/*.{jsx,tsx}"],
    extends: [
      react.configs.flat.recommended,
      react.configs.flat["jsx-runtime"],
    ],
    settings: {
      react: { version: "19" },
    },
    rules: {
      "react/prop-types": "off", // defer to the TS-aware version
    },
  },

  // ─────────────────────────────────────────────────────────────
  // 6. React Hooks (v7 flat preset — rules-of-hooks + exhaustive-deps).
  //    Use configs.flat['recommended-latest'] instead if you want the
  //    experimental React Compiler rules.
  // ─────────────────────────────────────────────────────────────
  {
    files: ["**/*.{jsx,tsx,ts,js}"],
    extends: [reactHooks.configs.flat.recommended],
  },

  // ─────────────────────────────────────────────────────────────
  // 7. Accessibility for JSX
  // ─────────────────────────────────────────────────────────────
  {
    files: ["**/*.{jsx,tsx}"],
    extends: [jsxA11y.flatConfigs.recommended],
  },

  // ─────────────────────────────────────────────────────────────
  // 8. Import hygiene + a clean, auto-fixable import order (import-x).
  //    Requires: eslint-import-resolver-typescript (install as devDep).
  // ─────────────────────────────────────────────────────────────
  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],
    extends: [importX.flatConfigs.recommended],
  },
  {
    // The `typescript` preset wires up the TS parser + extension settings
    // that the import rules need to understand .ts/.tsx files.
    files: ["**/*.{ts,tsx}"],
    extends: [importX.flatConfigs.typescript],
  },
  {
    files: ["src/**/*.{js,mjs,cjs,jsx,ts,tsx}"],
    settings: {
      // The TypeScript resolver reads your tsconfig, so `import-x/no-unresolved`
      // now correctly understands path aliases like "@/components/Button".
      // App aliases (@/*) live in src/tsconfig.json; root tsconfig is Node-only.
      "import-x/resolver-next": [
        createTypeScriptImportResolver({
          alwaysTryTypes: true,
          project: "./src/tsconfig.json",
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

      "import-x/extensions": [
        "error",
        "never",
        {
          pattern: {
            css: "always",
            json: "always",
            jsonc: "always",
            svg: "always",
            gif: "always",
            webp: "always",
            avif: "always",
            woff: "always",
            woff2: "always",
            webm: "always",
          },
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────
  // 9. Project rule tweaks (sensible defaults — adjust to taste)
  // ─────────────────────────────────────────────────────────────
  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],
    rules: {
      "no-console": "warn",
      eqeqeq: ["error", "smart"],
    },
  },

  // ─────────────────────────────────────────────────────────────
  // 10. Config / build / plain-JS files run in Node and are NOT type-checked.
  //     `disableTypeChecked` prevents "file not in project" parser errors on
  //     files that live outside your tsconfig's `include`.
  // ─────────────────────────────────────────────────────────────
  {
    files: ["**/*.{js,cjs,mjs}", "*.config.{js,mjs,cjs}"],
    languageOptions: {
      globals: { ...globals.node },
    },
    extends: [tseslint.configs.disableTypeChecked],
  },

  // ─────────────────────────────────────────────────────────────
  // 11. JSON — linting for JSON files
  // ─────────────────────────────────────────────────────────────
  {
    files: ["**/*.json"],
    plugins: { json: jsonEslint },
    language: "json/jsonc",
    extends: [jsonEslint.configs.recommended],
  },

  // ─────────────────────────────────────────────────────────────
  // 12. File & folder naming (check-file)
  // ─────────────────────────────────────────────────────────────
  {
    files: ["src/**/*"],
    ignores: ["src/routes/**/*"],
    plugins: { "check-file": checkFile },
    rules: {
      // No barrels: ban a BARE index.ts/tsx/js/jsx. Deliberately NOT `no-index`
      // (see note) so index.types.ts / index.consts.ts / index.helpers.ts survive.
      "check-file/filename-blocklist": [
        "error",
        { "**/index.{js,jsx,ts,tsx}": "**/!(index).*" },
      ],

      // All folders under src are lowercase-camel (button, userCard, authStore…)
      "check-file/folder-naming-convention": [
        "error",
        { "src/**/": "CAMEL_CASE" },
      ],

      // Component-shaped .tsx → PascalCase; hook/store/util/const/type .ts → camelCase
      "check-file/filename-naming-convention": [
        "error",
        {
          "src/{components,layout,pages,providers}/**/*.tsx":
            "PASCAL_CASE",
          "src/{hooks,stores,utils,consts,types}/**/*.ts":
            "CAMEL_CASE",
        },
        { ignoreMiddleExtensions: true },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────
  // 13. Named exports everywhere by default
  // ─────────────────────────────────────────────────────────────
  {
    files: [
      "src/{components,layout,providers}/**/*.{ts,tsx}",
      "src/{hooks,stores,utils,consts,types,styles}/**/*.{ts,tsx}",
    ],
    rules: { "import-x/no-default-export": "error" },
  },
  {
    files: ["src/pages/**/*.tsx"],
    rules: {
      "import-x/no-default-export": "off",
      "import-x/no-named-export": "error",
    },
  },

  // ─────────────────────────────────────────────────────────────
  // 14. TanStack Router — linting for TanStack Router files
  // ─────────────────────────────────────────────────────────────
  {
    plugins: {
      "@tanstack/router": pluginRouter,
    },
    files: ["src/routes/**"],
    extends: [pluginRouter.configs["flat/recommended"]],
  },
  {
    files: ["src/routes/**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/only-throw-error": [
        "error",
        {
          allow: [
            {
              from: "package",
              package: "@tanstack/router-core",
              name: "Redirect",
            },
            {
              from: "package",
              package: "@tanstack/router-core",
              name: "NotFoundError",
            },
          ],
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────
  // 15. Prettier — MUST be last. Turns off every rule that would fight
  //     Prettier's formatting. (v10 flat entry point.)
  // ─────────────────────────────────────────────────────────────
  prettier,

  // ─────────────────────────────────────────────────────────────
  // 16. Storybook — linting for Storybook files
  // ─────────────────────────────────────────────────────────────
  {
    plugins: {
      storybook: storybook,
    },
    files: ["**/*stories.{ts,tsx}"],
    extends: [storyBookConfigs["flat/recommended"]],
  },
]);
