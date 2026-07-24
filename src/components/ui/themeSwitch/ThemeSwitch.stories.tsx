import type {
  Meta,
  StoryObj,
} from "@storybook/tanstack-react";

import { ThemeSwitch } from "./ThemeSwitch";

const meta = {
  title: "UI/ThemeSwitch",
  component: ThemeSwitch,
  parameters: {
    docs: {
      description: {
        component:
          "Light / auto / dark theme control. Uses the app ThemeProvider and updates `data-theme`.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-canvas text-ink flex min-h-24 items-center justify-center p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ThemeSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const OnSurface: Story = {
  decorators: [
    (Story) => (
      <div className="bg-surface border-border rounded-2xl border p-6">
        <Story />
      </div>
    ),
  ],
};

/** Matches the stacked mobile control (column). */
export const Vertical: Story = {
  args: {
    className: "!flex-col-reverse !gap-1",
  },
};

/** Matches the desktop pill (row). */
export const Horizontal: Story = {
  args: {
    className: "!flex-row !gap-1 !bg-transparent",
  },
};
