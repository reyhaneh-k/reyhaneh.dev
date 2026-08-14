import { getRouteApi, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { listedArticles } from "../writing/index.consts";
import { formatWritingDate } from "../writing/index.helpers";
import type { WritingBodyBlock } from "../writing/index.types";

const routeApi = getRouteApi(
  "/_app/writing/articles/$article_id"
);

const limeCategories = new Set([
  "Design Theory",
  "Typography",
]);

function ArticleBody({
  block,
  afterQuote,
}: {
  block: WritingBodyBlock;
  afterQuote?: ReactNode;
}) {
  if (block.type === "heading") {
    return (
      <h2 className="mt-8 mb-4 text-2xl font-bold">
        {block.text}
      </h2>
    );
  }

  if (block.type === "quote") {
    return (
      <>
        <blockquote className="bg-canvas my-8 rounded-2xl p-6 text-lg leading-snug font-medium">
          {block.text}
        </blockquote>
        {afterQuote}
      </>
    );
  }

  if (block.type === "image") {
    return null;
  }

  return (
    <p className="text-base leading-relaxed md:text-lg">
      {block.text}
    </p>
  );
}

function ArticleDetail() {
  const article = routeApi.useLoaderData();
  const related = listedArticles
    .filter((item) => item.id !== article.id)
    .slice(0, 2);
  const quoteIndex = article.body.findIndex(
    (block) => block.type === "quote"
  );

  return (
    <div className="mx-auto max-w-3xl">
      <header className="mb-10">
        <h1 className="mb-4 text-3xl leading-tight font-bold tracking-tight md:text-5xl">
          {article.title}
        </h1>
        <div className="text-ink-muted flex flex-wrap items-center gap-3 text-xs tracking-wide">
          <time dateTime={article.date}>
            {formatWritingDate(article.date)}
          </time>
          <span
            aria-hidden
            className="bg-line size-1 rounded-full"
          />
          <span>{article.readTime}</span>
        </div>
      </header>

      <div className="bg-canvas mb-12 rounded-2xl p-[5%]">
        <img
          src={article.cover}
          alt={article.title}
          className="w-full rounded-xl object-cover"
        />
      </div>

      <article className="space-y-6">
        {article.body.map((block, index) => (
          <ArticleBody
            key={`${block.type}-${index}`}
            block={block}
            afterQuote={
              index === quoteIndex &&
              article.inlineImage ? (
                <figure className="bg-surface my-10 rounded-2xl p-4">
                  <img
                    src={article.inlineImage}
                    alt=""
                    className="h-64 w-full rounded-xl object-cover"
                  />
                  {article.caption ? (
                    <figcaption className="text-ink-muted mt-3 text-center text-xs">
                      {article.caption}
                    </figcaption>
                  ) : null}
                </figure>
              ) : null
            }
          />
        ))}
      </article>

      <section className="border-line mt-16 border-t pt-10">
        <h3 className="mb-8 text-2xl font-bold">
          More articles
        </h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {related.map((item) => (
            <Link
              key={item.id}
              to="/writing/articles/$article_id"
              params={{ article_id: item.id }}
              className="bg-surface border-line group block rounded-2xl border p-4 transition-transform hover:-translate-y-0.5"
            >
              <div className="mb-4 h-40 overflow-hidden rounded-xl">
                <img
                  src={item.cover}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mb-2 flex items-center gap-2">
                <span
                  className={
                    limeCategories.has(item.category)
                      ? "bg-tertiary rounded-lg px-2 py-1 text-[10px] font-medium"
                      : "bg-canvas rounded-lg px-2 py-1 text-[10px] font-medium"
                  }
                >
                  {item.category}
                </span>
                <span className="text-ink-muted text-xs">
                  {item.readTime}
                </span>
              </div>
              <h4 className="group-hover:text-accent font-bold">
                {item.title}
              </h4>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ArticleDetail;
