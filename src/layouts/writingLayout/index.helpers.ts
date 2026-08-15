import { useMatches } from "@tanstack/react-router";

import { Route as articlesRoute } from "@/routes/_app/writing/articles/$article_id";
import { Route as carouselsRoute } from "@/routes/_app/writing/carousels/$carousel_id";
import { Route as postsRoute } from "@/routes/_app/writing/posts/$post_id";
import { isSameOrNestedPath } from "@/utils/path";

import { LayoutLinks } from "./index.consts";

const detailRoutesIds = [
  postsRoute.id,
  articlesRoute.id,
  carouselsRoute.id,
] as const;

function useIsSingle() {
  return useMatches({
    select: (matches) =>
      matches.some((match) =>
        detailRoutesIds.includes(
          match.routeId as (typeof detailRoutesIds)[number]
        )
      ),
  });
}

function getActiveTab(pathname: string) {
  return (
    LayoutLinks.find((link) => {
      if (link.label === "All") return false;
      return isSameOrNestedPath(pathname, link.href);
    }) ?? LayoutLinks[0]
  );
}

export { useIsSingle, getActiveTab };
