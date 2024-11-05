import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#1A1A2E", // Dark Slate
        primary: "#0F3460", // Soft Blue
        secondary: "#3282B8", // Teal
        text: "#EAEAEA", // Light Gray
        highlight: "#F05454", // Coral Pink
      },
      fontFamily: {
        code: ['"M PLUS Code Latin"', "sans-serif"],
        sans: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
