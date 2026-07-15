import { defineConfig } from "vite";

export default defineConfig({
  build: { target: "ES2024" },
  resolve: {
    tsconfigPaths: true,
  },
  root: process.cwd(),
});
