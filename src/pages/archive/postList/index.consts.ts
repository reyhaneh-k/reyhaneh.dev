interface PostProps {
  id: string;
  title: string;
  description: string;
  date: string;
  views: number;
}

const postTexts = {
  title: "Posts",
  description: "Short takes, straight from the feed.",
};

const postMockData: (PostProps & { id: string })[] = [
  {
    id: "1",
    title: "object-fit: contain is underrated",
    description:
      "Cover crops. Contain respects the asset. Pair it with a blurred duplicate behind the frame and letterboxing stops looking like a bug. Cover crops. Contain respects the asset. Pair it with a blurred duplicate behind the frame and letterboxing stops looking like a bug. Cover crops. Contain respects the asset. Pair it with a blurred duplicate behind the frame and letterboxing stops looking like a bug. Cover crops. Contain respects the asset. Pair it with a blurred duplicate behind the frame and letterboxing stops looking like a bug. Cover crops. Contain respects the asset. Pair it with a blurred duplicate behind the frame and letterboxing stops looking like a bug. Cover crops. Contain respects the asset. Pair it with a blurred duplicate behind the frame and letterboxing stops looking like a bug. Cover crops. Contain respects the asset. Pair it with a blurred duplicate behind the frame and letterboxing stops looking like a bug.",
    date: "2026-01-01",
    views: 10000,
  },
  {
    id: "2",
    title: "Your tabs are links. Treat them like it.",
    description:
      'If the URL changes, it’s navigation — not a tabpanel. aria-current beats role="tab" when you’re routing between real pages.',
    date: "2026-01-01",
    views: 100,
  },
  {
    id: "3",
    title: "useSyncExternalStore > custom media listeners",
    description:
      "One matchMedia subscription, a Set of listeners, getServerSnapshot for SSR. Stop reinventing resize/theme stores with useEffect spaghetti.",
    date: "2026-01-01",
    views: 100,
  },
  {
    id: "4",
    title: "Opacity on stacked cards will betray you",
    description:
      "Translucent fills show the card underneath. If it’s a fan stack, keep letterbox fills fully opaque — soft gradients, hard coverage.",
    date: "2026-01-01",
    views: 100,
  },
  {
    id: "5",
    title: "Motion variants beat hover useState",
    description:
      'whileHover="hover" + child variants for rotate/scale/overlay. No boolean state, no stale style reads from motion values.',
    date: "2026-01-01",
    views: 100,
  },
  {
    id: "6",
    title: "Dark mode atmosphere needs quieter mixes",
    description:
      "What reads as a soft coral wash at 28% in light becomes neon at the same stop in dark. Theme the percentages, not just the hues.",
    date: "2026-01-01",
    views: 100,
  },
  {
    id: "7",
    title: "Scroll offset: name the nav, don’t fight it",
    description:
      "start start assumes the target kisses the viewport top. With a fixed bar, use start 4rem (or your pad token) or progress starts mid-scroll.",
    date: "2026-01-01",
    views: 100,
  },
  {
    id: "8",
    title:
      "ColorThief wants a loaded <img>, not a URL guess",
    description:
      "getPaletteSync on the decoded element beats async getPalette(src) for Vite AVIF. Guard short palettes or you’ll silently hit fallback.",
    date: "2026-01-01",
    views: 100,
  },
];

export { postTexts, postMockData };
