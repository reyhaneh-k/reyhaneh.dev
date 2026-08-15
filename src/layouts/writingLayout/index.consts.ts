import {
  listedArticles,
  listedCarousels,
  listedPosts,
  writingCopy,
} from "@/pages/writing/index.consts";
import { Route as articlesRoute } from "@/routes/_app/writing/articles";
import { Route as carouselsRoute } from "@/routes/_app/writing/carousels";
import { Route as writingRoute } from "@/routes/_app/writing/index";
import { Route as postsRoute } from "@/routes/_app/writing/posts";

import { LayoutLinkType } from "./index.type";
const LayoutLinks: LayoutLinkType[] = [
  {
    label: "All",
    href: writingRoute.to,
    badge:
      listedPosts.length +
      listedArticles.length +
      listedCarousels.length,
    title: writingCopy.all.title as unknown as string[],
    description: writingCopy.all.description,
  },
  {
    label: "Posts",
    href: postsRoute.to,
    badge: listedPosts.length,
    title: writingCopy.posts.title as unknown as string[],
    description: writingCopy.posts.description,
  },
  {
    label: "Articles",
    href: articlesRoute.to,
    badge: listedArticles.length,
    title: writingCopy.articles
      .title as unknown as string[],
    description: writingCopy.articles.description,
  },
  {
    label: "Carousels",
    href: carouselsRoute.to,
    badge: listedCarousels.length,
    title: writingCopy.carousels
      .title as unknown as string[],
    description: writingCopy.carousels.description,
  },
] as const;

export { LayoutLinks };
