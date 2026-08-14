import { getRouteApi, Link } from "@tanstack/react-router";

import { KindChip } from "../writing/components/kindChip/KindChip";
import { listedPosts } from "../writing/index.consts";
import {
  formatCompactNumber,
  formatWritingDate,
} from "../writing/index.helpers";
import type { WritingBodyBlock } from "../writing/index.types";

const routeApi = getRouteApi(
  "/_app/writing/posts/$post_id"
);

function PostBody({
  block,
  cover,
}: {
  block: WritingBodyBlock;
  cover?: string;
}) {
  if (block.type === "heading") {
    return (
      <h2 className="mt-8 mb-4 text-xl font-bold">
        {block.text}
      </h2>
    );
  }

  if (block.type === "quote") {
    return (
      <blockquote className="border-accent my-8 border-l-4 py-2 pl-6">
        <p className="text-lg leading-snug italic">
          {block.text}
        </p>
      </blockquote>
    );
  }

  if (block.type === "code") {
    return (
      <pre className="bg-ink text-canvas my-6 overflow-x-auto rounded-xl p-6 font-mono text-sm">
        <code>{block.text}</code>
      </pre>
    );
  }

  if (block.type === "image") {
    return (
      <figure className="bg-canvas my-10 rounded-2xl p-[5%]">
        {cover ? (
          <img
            src={cover}
            alt=""
            className="w-full rounded-xl object-cover"
          />
        ) : null}
        {block.text ? (
          <figcaption className="text-ink-muted mt-4 text-center text-xs">
            {block.text}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  return (
    <p className="text-ink-muted text-base leading-relaxed md:text-lg">
      {block.text}
    </p>
  );
}

function PostDetail() {
  const post = routeApi.useLoaderData();
  const related = listedPosts
    .filter((item) => item.id !== post.id)
    .slice(0, 2);

  return (
    <div className="mx-auto max-w-3xl">
      <article className="bg-surface border-line rounded-2xl border p-6 md:p-12">
        {post.category ? (
          <KindChip kind="article" className="mb-6">
            {post.category}
          </KindChip>
        ) : (
          <KindChip kind="post" className="mb-6 capitalize">
            Post
          </KindChip>
        )}
        <h1 className="mb-6 text-3xl leading-tight font-bold tracking-tight md:text-5xl">
          {post.title}
        </h1>
        <div className="border-line text-ink-muted mb-8 flex flex-wrap items-center gap-3 border-b pb-8 text-xs tracking-wide">
          <time dateTime={post.date}>
            {formatWritingDate(post.date)}
          </time>
          <span
            aria-hidden
            className="bg-line size-1 rounded-full"
          />
          <span>
            {formatCompactNumber(post.views)} views
          </span>
          <span
            aria-hidden
            className="bg-line size-1 rounded-full"
          />
          <span>{post.readTime}</span>
        </div>

        <div className="space-y-6">
          {post.body.map((block, index) => (
            <PostBody
              key={`${block.type}-${index}`}
              block={block}
              cover={post.cover}
            />
          ))}
        </div>

        {post.snippet ? (
          <pre className="bg-ink text-canvas my-8 overflow-x-auto rounded-xl p-6 font-mono text-sm leading-relaxed">
            <code>{post.snippet}</code>
          </pre>
        ) : null}
      </article>

      <section className="mt-12">
        <h3 className="mb-6 text-lg font-bold">
          Related explorations
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {related.map((item) => (
            <Link
              key={item.id}
              to="/writing/posts/$post_id"
              params={{ post_id: item.id }}
              className="bg-surface border-line hover:border-accent/40 flex gap-4 rounded-2xl border p-4 transition-colors"
            >
              {item.cover ? (
                <img
                  src={item.cover}
                  alt=""
                  className="size-16 shrink-0 rounded-lg object-cover"
                />
              ) : (
                <div className="bg-tertiary size-16 shrink-0 rounded-lg" />
              )}
              <div>
                <span className="text-ink-muted mb-1 block text-[11px] tracking-wider uppercase">
                  {item.category ?? "Post"}
                </span>
                <h4 className="hover:text-accent text-sm leading-tight font-bold">
                  {item.title}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default PostDetail;
