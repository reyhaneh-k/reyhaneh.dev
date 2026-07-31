import img from "@/assets/images/carousel1/post_01_perceived_performance_carousel.avif";

import { CarouselStackProps } from "./components/carouselStack/index.types";

const slides = Array.from({ length: 10 }, () => img);

const carouselMockData: CarouselStackProps[] = [
  {
    id: "1",
    title:
      "Perceived Performance: Making Slow Interfaces Feel Instant",
    description:
      "A slide-by-slide breakdown of skeleton screens, optimistic UI, and why frame timing matters more than raw TTI when users decide if your app feels fast.",
    data: slides,
  },
  {
    id: "2",
    title:
      "CSS Cascade Layers and the End of Specificity Wars",
    description:
      "How @layer, design tokens, and a calm reset strategy keep large Tailwind codebases readable when every team ships another utility-heavy surface.",
    data: slides,
  },
  {
    id: "3",
    title: "Motion That Means Something",
    description:
      "Spring physics, layoutId, and reduced-motion paths for carousel stacks, nav notches, and hover reveals that explain hierarchy instead of decorating it.",
    data: slides,
  },
  {
    id: "4",
    title: "Accessible Tabs That Are Actually Navigation",
    description:
      "When to use tab semantics versus links, aria-current on routes, and why wrapping your writing filters in Radix Tabs can confuse screen readers.",
    data: slides,
  },
  {
    id: "5",
    title:
      "Grain, Atmosphere, and Theme Tokens That Survive Dark Mode",
    description:
      "Building a dual-theme canvas with SVG noise, radial washes, and color-mix stops that stay subtle in dark mode without disappearing in light.",
    data: slides,
  },
];

const carouselTexts = {
  title: "Carousels",
  description:
    "Slide-by-slide breakdowns, built for the LinkedIn feed.",
};

export { carouselMockData, carouselTexts };
