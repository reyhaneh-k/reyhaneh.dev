import type { UserConfig } from "@commitlint/types";
import { RuleConfigSeverity } from "@commitlint/types";

const { Error, Warning, Disabled } = RuleConfigSeverity;

/**
 * Conventional Commits for reyhaneh.dev
 *
 * Format:
 *   <type>(<scope>)!: <subject>
 *
 *   [optional body]
 *
 *   [optional footer(s)]
 *
 * Examples:
 *   feat(hero): add full-bleed portfolio hero
 *   fix(eslint): replace excludes with ignores in flat config
 *   chore(deps): bump vite to 8.1
 *   refactor(routes)!: switch home page to file-based routing
 *
 * Skip hook once: SKIP_COMMITLINT=1 git commit -m "..."
 *
 * @see https://www.conventionalcommits.org/
 * @see https://commitlint.js.org/
 */
const config = {
  extends: ["@commitlint/config-conventional"],
  formatter: "@commitlint/format",

  // Keep default ignores (merges, reverts, semver tags, etc.)
  defaultIgnores: true,
  ignores: [
    (message) => message.includes("WIP"),
    (message) => /^draft\b/i.test(message),
  ],

  rules: {
    // ── Header ──────────────────────────────────────────────
    "header-max-length": [Error, "always", 100],
    "header-trim": [Error, "always"],

    // ── Type ────────────────────────────────────────────────
    "type-empty": [Error, "never"],
    "type-case": [Error, "always", "lower-case"],
    "type-enum": [
      Error,
      "always",
      [
        "feat", // new user-facing capability
        "fix", // bug fix
        "docs", // README, STRUCTURE, comments-only
        "style", // formatting / Prettier; no logic change
        "refactor", // neither fix nor feat
        "perf", // performance
        "test", // tests
        "build", // Vite / bundler / tsconfig that affect build
        "ci", // GitHub Actions / Vercel pipelines
        "chore", // tooling, deps, husky, eslint, lockfile
        "revert", // revert a previous commit
      ],
    ],

    // ── Scope (required and must be known) ──────────────────
    "scope-empty": [Error, "never"],
    "scope-case": [Error, "always", "lower-case"],
    "scope-enum": [
      Error,
      "always",
      [
        // App areas (from STRUCTURE.md)
        "routes",
        "layout",
        "components",
        "prim",
        "modules",
        "hooks",
        "providers",
        "stores",
        "utils",
        "consts",
        "types",
        "styles",
        "assets",

        // Tooling / infra
        "eslint",
        "prettier",
        "husky",
        "lint-staged",
        "commitlint",
        "vite",
        "tsconfig",
        "tailwind",
        "deps",
        "ci",
        "sentry",
        "seo",
        "a11y",
        "dx",
      ],
    ],

    // ── Subject ─────────────────────────────────────────────
    "subject-empty": [Error, "never"],
    "subject-full-stop": [Error, "never", "."],
    "subject-exclamation-mark": [Disabled, "never"],
    // Allow "add X" / "fix Y" — ban Title Case / UPPER
    "subject-case": [
      Error,
      "never",
      [
        "sentence-case",
        "start-case",
        "pascal-case",
        "upper-case",
      ],
    ],

    // ── Body / footer ───────────────────────────────────────
    "body-leading-blank": [Disabled, "always"],
    "body-max-line-length": [Error, "always", 100],
    "footer-leading-blank": [Warning, "always"],
    "footer-max-line-length": [Error, "always", 100],
  },
} satisfies UserConfig;

export default config;
