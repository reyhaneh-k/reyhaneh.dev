import { createFileRoute } from "@tanstack/react-router";

import ArticleList from "@/pages/articleList/ArticleList";

export const Route = createFileRoute(
  "/_app/writing/articles/"
)({
  component: ArticleList,
  staticData: {
    breadcrumb: "",
  },
});
