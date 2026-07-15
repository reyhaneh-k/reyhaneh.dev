import babel from "@rolldown/plugin-babel";
import react, {
  reactCompilerPreset,
} from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

const svgrCommonOptions = {
  jsxRuntime: "automatic" as const,
  svgo: true,
  plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx"],
  svgoConfig: {
    floatPrecision: 2,
    plugins: [
      {
        name: "preset-default",
      },
      {
        name: "convertColors",
        params: {
          currentColor: true,
        },
      },
    ],
  },
  //Accessibility
  titleProp: true,
  descProp: true,
  svgProps: {
    role: "img",
  },
};
export default defineConfig({
  build: { target: "ES2024" },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    react(),
    babel({
      presets: [reactCompilerPreset()],
    }),
    svgr({
      svgrOptions: {
        ...svgrCommonOptions,
        icon: true,
        dimensions: false,
      },
      include: "src/assets/icons/**/*.svg?react",
    }),
    svgr({
      svgrOptions: {
        ...svgrCommonOptions,
      },
      include: "src/assets/svgs/**/*.svg?react",
    }),
  ],
});
