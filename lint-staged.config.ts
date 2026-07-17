import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import {
  dirname,
  join,
  relative,
  resolve,
} from "node:path";
import { pathToFileURL } from "node:url";

import type { Configuration } from "lint-staged";

const require = createRequire(import.meta.url);

const eslintBin = join(
  dirname(require.resolve("eslint/package.json")),
  "bin/eslint.js"
);
const prettierBin =
  require.resolve("prettier/bin/prettier.cjs");

type Command = readonly [string, ...string[]];

const c = {
  reset: "\u001B[0m",
  bold: "\u001B[1m",
  dim: "\u001B[2m",
  red: "\u001B[31m",
  yellow: "\u001B[33m",
  cyan: "\u001B[36m",
  green: "\u001B[32m",
};

const LINE = "─".repeat(56);

/** Skip build output + generated files even if someone stages them. */
const SKIP_RE =
  /(?:^|\/)(?:node_modules|dist|build|coverage)(?:\/|$)|(?:^|\/)routeTree\.gen\.ts$/i;

function shouldLint(file: string): boolean {
  return !SKIP_RE.test(file.replaceAll("\\", "/"));
}

function toolLabel(
  bin: string,
  args: readonly string[]
): string {
  if (
    bin === eslintBin ||
    args.some((a) => a.includes("eslint"))
  ) {
    return "ESLint";
  }
  if (
    bin === prettierBin ||
    args.some((a) => a.includes("prettier"))
  ) {
    return "Prettier";
  }
  return "Tool";
}

function toolCommand(
  bin: string,
  args: readonly string[]
): string {
  return [toolLabel(bin, args).toLowerCase(), ...args].join(
    " "
  );
}

function shortPath(file: string): string {
  const rel = relative(process.cwd(), file).replaceAll(
    "\\",
    "/"
  );
  if (!rel || rel === ".") {
    return ".";
  }
  if (!rel.startsWith("../") && !rel.startsWith("./")) {
    return `./${rel}`;
  }
  return rel;
}

function clickablePath(file: string): string {
  const label = shortPath(file);
  const abs = resolve(file);
  if (process.env.NO_COLOR != null) {
    return abs.replaceAll("\\", "/");
  }
  const uri = pathToFileURL(abs).href;
  return `\u001B]8;;${uri}\u001B\\${label}\u001B]8;;\u001B\\`;
}

function say(message: string): void {
  process.stderr.write(`${message}\n`);
}

/**
 * Status line so the commit doesn't look "stuck" on a spinner while
 * type-aware ESLint boots (often several seconds with no output).
 */
function announceStart(
  tool: string,
  files: readonly string[]
): void {
  say("");
  say(
    `${c.cyan}${c.bold}→ ${tool}${c.reset} ${c.dim}on ${String(files.length)} file(s)…${c.reset}`
  );
  for (const file of files) {
    say(`  ${c.dim}•${c.reset} ${clickablePath(file)}`);
  }
  if (tool === "ESLint") {
    say(
      `${c.dim}  (type-aware lint — first output can take a few seconds)${c.reset}`
    );
  }
  say("");
}

function announceDone(tool: string): void {
  say(`${c.green}✓${c.reset} ${tool} ${c.dim}ok${c.reset}`);
}

/**
 * lint-staged TaskFunctions only show `title [FAILED]` on throw.
 * Diagnostics already streamed via stdio: "inherit"; this frame adds context.
 */
function reportFailure(options: {
  stepTitle: string;
  tool: string;
  command: string;
  exitCode: string;
  files: readonly string[];
}): never {
  const { stepTitle, tool, command, exitCode, files } =
    options;
  const out = process.stderr;

  out.write("\n");
  out.write(`${c.red}${c.bold}${LINE}${c.reset}\n`);
  out.write(
    `${c.red}${c.bold}✖  ${tool} failed${c.reset}${c.dim}  (exit ${exitCode})${c.reset}\n`
  );
  out.write(`${c.red}${LINE}${c.reset}\n`);
  out.write(
    `${c.dim}step${c.reset}     ${c.cyan}${stepTitle}${c.reset}\n`
  );
  out.write(
    `${c.dim}command${c.reset}  ${c.dim}${command}${c.reset}\n`
  );
  out.write(
    `${c.dim}files${c.reset}    ${c.yellow}${String(files.length)}${c.reset}\n`
  );
  for (const file of files) {
    out.write(
      `           ${c.yellow}•${c.reset} ${clickablePath(file)}\n`
    );
  }
  out.write(`${c.red}${LINE}${c.reset}\n`);
  out.write(
    `${c.dim}Scroll up for ${tool} diagnostics. Fix, stage, re-commit.${c.reset}\n\n`
  );

  const err = new Error(
    `${tool} failed (exit ${exitCode})`
  );
  err.stack = `${err.name}: ${err.message}`;
  throw err;
}

const step = (
  title: string,
  commands: readonly Command[]
) => ({
  title,
  task: (files: readonly string[]): void => {
    const staged = files.filter(shouldLint);
    if (staged.length === 0) {
      return;
    }

    for (const [bin, ...args] of commands) {
      const argv = [...args, ...staged];
      const command = toolCommand(bin, args);
      const tool = toolLabel(bin, args);

      announceStart(tool, staged);

      try {
        // inherit = live ESLint/Prettier output (no silent spinner void)
        execFileSync(bin, argv, { stdio: "inherit" });
        announceDone(tool);
      } catch (error) {
        const status =
          error &&
          typeof error === "object" &&
          "status" in error
            ? String(
                (error as { status?: number | null })
                  .status ?? "?"
              )
            : "?";

        reportFailure({
          stepTitle: title,
          tool,
          command,
          exitCode: status,
          files: staged,
        });
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
    "Code — TypeScript / JavaScript / JSX",
    lintAndFormat
  ),
  "**/*.css": step("Styles — CSS", lintAndFormat),
  "**/*.{json,jsonc}": step(
    "Data — JSON / JSONC",
    lintAndFormat
  ),
};

export default config;
