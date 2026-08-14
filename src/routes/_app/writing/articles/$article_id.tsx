import { createFileRoute } from "@tanstack/react-router";

import ArticleDetail from "@/pages/articleDetail/ArticleDetail";
import { getArticleById } from "@/pages/writing/index.consts";
import type { ArticleRecord } from "@/pages/writing/index.types";

export const Route = createFileRoute(
  "/_app/writing/articles/$article_id"
)({
  component: ArticleDetail,
  loader: ({ params }) => {
    const article = getArticleById(params.article_id);
    if (!article) {
      throw new Error(
        `Article not found: ${params.article_id}`
      );
    }
    return article;
  },
  staticData: {
    breadcrumb: ({ loaderData }) =>
      (loaderData as ArticleRecord | undefined)?.title ??
      "Article",
  },
});
