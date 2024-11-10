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
      animation: {
        "slide-right-left": "slide-right-left 1.4s ease-in-out forwards",
        float: "float 1.4s ease-in-out infinite",
      },
      fontFamily: {
        code: ["var(--font-code)"],
        roboto: ["var(--font-roboto)"],
      },
      keyframes: {
        "slide-right-left": {
          "0%": {
            transform: "translateX(-120%)",
            opacity: "0",
          },
          "50%": { transform: "translateX(50%)", opacity: "1" },
          "100%": {
            transform: "translateX(-120%)",
            opacity: "0",
          },
        },
        float: {
          "0%": { transform: "translate(0px,0px)" },
          "30%": { transform: "translate(3px,3px)" },
          "60%": { transform: "translate(0px,0px)" },
          "90%": { transform: "translate(-3px,-3px)" },
          "100%": { transform: "translate(0px,0px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
