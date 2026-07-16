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
  const tool = toolLabel(bin, args).toLowerCase();
  return [tool, ...args].join(" ");
}

/** Relative label — prefix `./` for cwd files so they parse as paths (not bare words). */
function shortPath(file: string): string {
  const rel = relative(process.cwd(), file).replaceAll(
    "\\",
    "/"
  );
  if (!rel || rel === ".") {
    return ".";
  }
  // `src/foo.ts` is fine; bare `eslint.config.js` is often NOT clickable in Cursor.
  if (!rel.startsWith("../") && !rel.startsWith("./")) {
    return `./${rel}`;
  }
  return rel;
}

/**
 * OSC-8 hyperlink: short relative text, absolute file:// target.
 * Makes src/* AND repo-root files (eslint.config.js, vite.config.ts, …) Ctrl+clickable.
 */
function clickablePath(file: string): string {
  const label = shortPath(file);
  const abs = resolve(file);
  if (process.env.NO_COLOR != null) {
    return abs.replaceAll("\\", "/");
  }
  const uri = pathToFileURL(abs).href;
  return `\u001B]8;;${uri}\u001B\\${label}\u001B]8;;\u001B\\`;
}

function bufferText(value: unknown): string {
  if (Buffer.isBuffer(value)) {
    return value.toString("utf8");
  }
  if (typeof value === "string") {
    return value;
  }
  return "";
}

/**
 * lint-staged TaskFunctions only surface `title [FAILED]` — Error.message is hidden.
 * Capture tool output and print a structured report ourselves before throwing.
 *
 * Do NOT attach `cause` / a full stack: Node will print frames from
 * `node_modules/<pkg>/dist` (lint-staged, eslint, prettier builds), which looks
 * like "your dist files" but is just package internals.
 */
function reportFailure(options: {
  stepTitle: string;
  tool: string;
  command: string;
  exitCode: string;
  files: readonly string[];
  stdout: string;
  stderr: string;
}): never {
  const {
    stepTitle,
    tool,
    command,
    exitCode,
    files,
    stdout,
    stderr,
  } = options;
  const body = [stdout, stderr]
    .map((s) => s.trim())
    .filter(Boolean)
    .join("\n\n");

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

  if (body) {
    out.write(`\n${body}\n`);
  } else {
    out.write(
      `\n${c.dim}(no stdout/stderr from ${tool} — see exit code above)${c.reset}\n`
    );
  }

  out.write(`\n${c.red}${c.bold}${LINE}${c.reset}\n`);
  out.write(
    `${c.dim}Fix the issues above, then stage again and re-commit.${c.reset}\n\n`
  );

  const err = new Error(
    `${tool} failed (exit ${exitCode})`
  );
  // Keep the message only — no stack dump into node_modules/.../dist/...
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

      try {
        execFileSync(bin, argv, {
          stdio: ["ignore", "pipe", "pipe"],
          encoding: "utf8",
        });
      } catch (error) {
        const err = error as {
          status?: number | null;
          stdout?: Buffer | string;
          stderr?: Buffer | string;
        };

        reportFailure({
          stepTitle: title,
          tool,
          command,
          exitCode: String(err.status ?? "?"),
          files: staged,
          stdout: bufferText(err.stdout),
          stderr: bufferText(err.stderr),
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
