import { Route as articlesRoute } from "@/routes/_app/writing/articles";
import { Route as carouselsRoute } from "@/routes/_app/writing/carousels";
import { Route as writingRoute } from "@/routes/_app/writing/index";
import { Route as postsRoute } from "@/routes/_app/writing/posts";
const writingLayoutConsts = {
  title: "Thinking, out loud.",
  description:
    "Notes on shipping, systems, and the craft of interfaces. Long essays, carousel breakdowns, and short posts.",
  totalPosts: 16,
};

const LayoutLinks = [
  {
    label: "Articles",
    href: articlesRoute.to,
  },
  {
    label: "Carousels",
    href: carouselsRoute.to,
  },
  {
    label: "Posts",
    href: postsRoute.to,
  },
  {
    label: "All",
    href: writingRoute.to,
  },
];

export { writingLayoutConsts, LayoutLinks };
