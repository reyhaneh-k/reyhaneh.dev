import { Route as articlesRoute } from "@/routes/_app/writing/articles";
import { Route as carouselsRoute } from "@/routes/_app/writing/carousels";
import { Route as writingRoute } from "@/routes/_app/writing/index";
import { Route as postsRoute } from "@/routes/_app/writing/posts";
const writingLayoutConsts = {
  title: { part1: "Thinking", part2: "out loud." },
  description:
    "Notes on shipping, systems, and the craft of interfaces. Long essays, carousel breakdowns, and short posts.",
  totalPosts: 28,
};

const LayoutLinks = [
  {
    label: "All",
    href: writingRoute.to,
    badge: 28,
  },
  {
    label: "Posts",
    href: postsRoute.to,
    badge: 14,
  },
  {
    label: "Articles",
    href: articlesRoute.to,
    badge: 8,
  },
  {
    label: "Carousels",
    href: carouselsRoute.to,
    badge: 6,
  },
];

export { writingLayoutConsts, LayoutLinks };
