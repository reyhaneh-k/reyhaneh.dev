import type { Configuration } from "lint-staged";

const config: Configuration = {
  // Docs say "eslint --fix" (tinyexec resolves node_modules/.bin), but on
  // Windows those shims are POSIX/.CMD and tinyexec can't spawn them → ENOENT.
  "*.{js,mjs,cjs,jsx,ts,tsx}":
    "node ./node_modules/eslint/bin/eslint.js --fix",
};

export default config;
