import babel from "@rolldown/plugin-babel";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react, {
  reactCompilerPreset,
} from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

const nodeConfig = {
  projectName: "reyhanehdotdev",
} as const;

const svgrCommonOptions = {
  jsxRuntime: "automatic" as const,
  svgo: true,
  plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx"],
  //Accessibility
  titleProp: true,
  descProp: true,
  svgProps: {
    role: "img",
  },
};

export default defineConfig({
  build: {
    target: "ES2024",
    sourcemap: "hidden",
    outDir: "build",
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    react(),
    babel({
      presets: [reactCompilerPreset()],
    }),

    svgr({
      svgrOptions: {
        ...svgrCommonOptions,
        svgoConfig: {
          plugins: [
            "preset-default",
            {
              name: "convertColors",
              params: {
                currentColor: true,
              },
            },
          ],
        },
        icon: true,
        dimensions: false,
      },
      include: "src/assets/icons/**/*.svg?react",
    }),
    svgr({
      svgrOptions: {
        ...svgrCommonOptions,
        svgoConfig: {
          plugins: ["preset-default"],
        },
      },
      include: "src/assets/svgs/**/*.svg?react",
    }),

    sentryVitePlugin({
      org: "reyhanehdev",
      project: nodeConfig.projectName,
      authToken: process.env.SENTRY_AUTH_TOKEN,
      sourcemaps: {
        assets: "./build/**",
        filesToDeleteAfterUpload: ["./build/**/*.map"],
      },
      reactComponentAnnotation: {
        enabled: true,
        _experimentalInjectIntoHtml: true,
      },
      release: {
        name: `${nodeConfig.projectName}@${process.env.GITHUB_SHA}`,
        dist: "1", // optional: further segment (e.g. Android/iOS/web build)
        deploy: { env: "production" }, // optional: record a deploy
      },
    }),
  ],
});
