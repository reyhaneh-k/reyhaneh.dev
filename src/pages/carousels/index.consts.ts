import img from "@/assets/images/carousel1/post_05_timings_latency_startup_carousel.avif";

import { CarouselStackProps } from "./components/carouselStack/index.types";

const slides = Array.from({ length: 10 }, () => img);

const carouselMockData: CarouselStackProps[] = [
  {
    id: "1",
    views: 100,
    publishedAt: "2026-01-01",
    title:
      "Perceived Performance: Making Slow Interfaces Feel Instant",
    description:
      "A slide-by-slide breakdown of skeleton screens, optimistic UI, and why frame timing matters more than raw TTI when users decide if your app feels fast. A slide-by-slide breakdown of skeleton screens, optimistic UI, and why frame timing matters more than raw TTI when users decide if your app feels fast. A slide-by-slide breakdown of skeleton screens, optimistic UI, and why frame timing matters more than raw TTI when users decide if your app feels fast. A slide-by-slide breakdown of skeleton screens, optimistic UI, and why frame timing matters more than raw TTI when users decide if your app feels fast. A slide-by-slide breakdown of skeleton screens, optimistic UI, and why frame timing matters more than raw TTI when users decide if your app feels fast. A slide-by-slide breakdown of skeleton screens, optimistic UI, and why frame timing matters more than raw TTI when users decide if your app feels fast. A slide-by-slide breakdown of skeleton screens, optimistic UI, and why frame timing matters more than raw TTI when users decide if your app feels fast. A slide-by-slide breakdown of skeleton screens, optimistic UI, and why frame timing matters more than raw TTI when users decide if your app feels fast. A slide-by-slide breakdown of skeleton screens, optimistic UI, and why frame timing matters more than raw TTI when users decide if your app feels fast.",
    images: slides,
  },
  {
    id: "2",
    views: 100,
    publishedAt: "2026-01-01",
    title:
      "CSS Cascade Layers and the End of Specificity Wars",
    description:
      "How @layer, design tokens, and a calm reset strategy keep large Tailwind codebases readable when every team ships another utility-heavy surface.",
    images: slides,
  },
  {
    id: "3",
    views: 100,
    publishedAt: "2026-01-01",
    title: "Motion That Means Something",
    description:
      "Spring physics, layoutId, and reduced-motion paths for carousel stacks, nav notches, and hover reveals that explain hierarchy instead of decorating it.",
    images: slides,
  },
  {
    id: "4",
    views: 100,
    publishedAt: "2026-01-01",
    title: "Accessible Tabs That Are Actually Navigation",
    description:
      "When to use tab semantics versus links, aria-current on routes, and why wrapping your writing filters in Radix Tabs can confuse screen readers.",
    images: slides,
  },
  {
    id: "5",
    views: 100,
    publishedAt: "2026-01-01",
    title:
      "Grain, Atmosphere, and Theme Tokens That Survive Dark Mode",
    description:
      "Building a dual-theme canvas with SVG noise, radial washes, and color-mix stops that stay subtle in dark mode without disappearing in light.",
    images: slides,
  },
  {
    id: "6",
    views: 100,
    publishedAt: "2026-01-01",
    title: "The Future of CSS",
    description:
      "A look at the future of CSS, including new features and how they will be implemented.",
    images: slides,
  },
  {
    id: "7",
    views: 100,
    publishedAt: "2026-01-01",
    title: "The Future of CSS",
    description:
      "A look at the future of CSS, including new features and how they will be implemented.",
    images: slides,
  },
  {
    id: "8",
    views: 100,
    publishedAt: "2026-01-01",
    title: "The Future of CSS",
    description:
      "A look at the future of CSS, including new features and how they will be implemented.",
    images: slides,
  },
  {
    id: "9",
    views: 100,
    publishedAt: "2026-01-01",
    title: "The Future of CSS",
    description:
      "A look at the future of CSS, including new features and how they will be implemented.",
    images: slides,
  },
  {
    id: "10",
    views: 100,
    publishedAt: "2026-01-01",
    title: "The Future of CSS",
    description:
      "A look at the future of CSS, including new features and how they will be implemented.",
    images: slides,
  },
];

const carouselTexts = {
  title: "Carousels",
  description:
    "Slide-by-slide breakdowns, built for the LinkedIn feed.",
};

const virtualSizes = {
  CARD_WIDTH: 288,
  GAP: 40,
};

/** Enough rows that virtualization is obvious while scrolling. */
const carouselListData: CarouselStackProps[] = Array.from(
  { length: 25 },
  (_, index) => {
    const seedIndex = index % carouselMockData.length;
    const seed = carouselMockData[seedIndex];
    return {
      ...seed,
      id: `carousel-${index}`,
    };
  }
);

async function getCarouselById(id: string) {
  await new Promise((resolve) => setTimeout(resolve, 120));
  return (
    carouselListData.find(
      (carousel) => carousel.id === id
    ) ??
    carouselMockData.find((carousel) => carousel.id === id)
  );
}

export {
  carouselMockData,
  carouselListData,
  carouselTexts,
  getCarouselById,
  virtualSizes,
};
