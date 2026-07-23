/// <reference types="vite/client" />

import type { Preview } from "@storybook/tanstack-react";
import { withThemeByDataAttribute } from "@storybook/addon-themes";

import { ThemeProvider } from "../src/providers/theme/ThemeProvider";

import "../src/styles/index.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
    withThemeByDataAttribute({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
      attributeName: "data-theme",
    }),
  ],
};

export default preview;
