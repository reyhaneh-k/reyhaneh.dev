import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";

import type { Configuration } from "lint-staged";

const require = createRequire(import.meta.url);

const eslintBin = join(
  dirname(require.resolve("eslint/package.json")),
  "bin/eslint.js"
);
const prettierBin =
  require.resolve("prettier/bin/prettier.cjs");

type Command = readonly [string, ...string[]];

const step = (
  title: string,
  commands: readonly Command[]
) => ({
  title,
  task: (files: readonly string[]): void => {
    for (const [bin, ...args] of commands) {
      try {
        execFileSync(bin, [...args, ...files], {
          stdio: "pipe",
        });
      } catch (error) {
        const { stdout, stderr } = error as {
          stdout?: Buffer;
          stderr?: Buffer;
        };
        const output =
          `${stdout ?? ""}${stderr ?? ""}`.trim();
        throw new Error(
          output
            ? `✖ ${bin} ${args.join(" ")}\n\n${output}`
            : `✖ ${bin} ${args.join(" ")}`,
          { cause: error }
        );
      }
    }
  },
});

const lintAndFormat: Command[] = [
  [
    process.execPath,
    eslintBin,
    "--fix",
    "--no-warn-ignored",
  ],
  [
    process.execPath,
    prettierBin,
    "--write",
    "--ignore-unknown",
  ],
];

const config: Configuration = {
  "**/*.{ts,tsx,js,jsx,mjs,cjs}": step(
    "🧠  Code — TypeScript / JavaScript / JSX",
    lintAndFormat
  ),

  "**/*.css": step("🎨  Styles — CSS", lintAndFormat),

  "**/*.html": step("📄  Markup — HTML", lintAndFormat),

  "**/*.{json,jsonc}": step(
    "🗂️  Data — JSON / JSONC",
    lintAndFormat
  ),
};

export default config;
