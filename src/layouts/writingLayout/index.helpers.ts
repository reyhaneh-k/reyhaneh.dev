import {
  useMatches,
  useMatchRoute,
} from "@tanstack/react-router";

import { LayoutLinks } from "./index.consts";

const writingDetailRouteIds = [
  "/_app/writing/posts/$post_id",
  "/_app/writing/articles/$article_id",
  "/_app/writing/carousels/$carousel_id",
] as const;

function useIsWritingDetail() {
  return useMatches({
    select: (matches) =>
      matches.some((match) =>
        writingDetailRouteIds.includes(
          match.routeId as (typeof writingDetailRouteIds)[number]
        )
      ),
  });
}

function useActiveWritingTab() {
  const matchRoute = useMatchRoute();

  return (
    LayoutLinks.find((link) => {
      if (link.label === "All") return false;
      return Boolean(
        matchRoute({ to: link.href, fuzzy: true })
      );
    }) ?? LayoutLinks[0]
  );
}

export { useIsWritingDetail, useActiveWritingTab };
