import type {
  Meta,
  StoryObj,
} from "@storybook/tanstack-react";

import BottomNavBar from "./BottomNavBar";
import { NAV_LINKS } from "./index.consts";

const meta = {
  title: "Navigation/TapNavigation",
  component: BottomNavBar,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Mobile bottom tap navigation. Active item follows the current route pathname.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-canvas text-ink relative min-h-48 w-full max-w-md">
        <div className="fixed inset-x-0 bottom-0 mx-auto max-w-md">
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof BottomNavBar>;

export default meta;
type Story = StoryObj<typeof meta>;

const routeStory = (
  path: (typeof NAV_LINKS)[number]["to"]
): Story => ({
  parameters: {
    tanstack: {
      router: {
        route: { path },
      },
    },
    docs: {
      description: {
        story: `Active route: \`${path}\``,
      },
    },
  },
});

export const Default: Story = {
  ...routeStory("/work"),
};

export const WorkActive: Story = {
  ...routeStory("/work"),
};

export const WritingActive: Story = {
  ...routeStory("/writing"),
};

export const StudyActive: Story = {
  ...routeStory("/study"),
};

export const MapActive: Story = {
  ...routeStory("/map"),
};

export const ProjectsActive: Story = {
  ...routeStory("/projects"),
};
