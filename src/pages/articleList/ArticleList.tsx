import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { cn } from "@/utils/classname";

import { listedArticles } from "../writing/index.consts";

const layoutClassName = {
  featured: "md:col-span-12 lg:col-span-8 lg:flex-row",
  tall: "md:col-span-12 lg:col-span-4",
  wide: "md:col-span-6 lg:mt-8",
} as const;

const limeCategories = new Set([
  "Design Theory",
  "Typography",
]);

function ArticleList() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
      {listedArticles.map((article) => {
        const layout = article.layout ?? "wide";
        const isFeatured = layout === "featured";

        return (
          <Link
            key={article.id}
            to="/writing/articles/$article_id"
            params={{ article_id: article.id }}
            className={cn(
              "bg-surface border-line group flex flex-col overflow-hidden rounded-2xl border",
              "transition-transform duration-300 hover:-translate-y-0.5",
              layoutClassName[layout]
            )}
          >
            <div
              className={cn(
                "bg-canvas p-[5%]",
                isFeatured && "md:w-1/2"
              )}
            >
              <div
                className={cn(
                  "relative overflow-hidden rounded-2xl",
                  isFeatured
                    ? "min-h-[280px]"
                    : layout === "tall"
                      ? "h-48"
                      : "h-64"
                )}
              >
                <img
                  src={article.cover}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
            <div
              className={cn(
                "flex flex-1 flex-col p-8",
                isFeatured &&
                  "md:w-1/2 md:justify-center md:p-12"
              )}
            >
              <span
                className={cn(
                  "mb-4 w-max rounded-full px-3 py-1 text-xs font-medium",
                  limeCategories.has(article.category)
                    ? "bg-tertiary text-ink"
                    : "bg-canvas text-ink"
                )}
              >
                {article.category}
              </span>
              <h2
                className={cn(
                  "group-hover:text-accent mb-3 font-bold tracking-tight",
                  isFeatured
                    ? "text-2xl md:text-3xl"
                    : "text-xl"
                )}
              >
                {article.title}
              </h2>
              <p className="text-ink-muted mb-6 line-clamp-3 flex-grow text-sm leading-relaxed">
                {article.excerpt}
              </p>
              <span className="text-accent mt-auto inline-flex items-center gap-2 text-sm font-medium">
                Read essay
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default ArticleList;
