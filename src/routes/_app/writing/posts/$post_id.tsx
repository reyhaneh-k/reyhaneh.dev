import { createFileRoute } from "@tanstack/react-router";

import PostDetail from "@/pages/postDetail/PostDetail";
import { getPostById } from "@/pages/writing/index.consts";
import type { PostRecord } from "@/pages/writing/index.types";

export const Route = createFileRoute(
  "/_app/writing/posts/$post_id"
)({
  component: PostDetail,
  loader: ({ params }) => {
    const post = getPostById(params.post_id);
    if (!post) {
      throw new Error(`Post not found: ${params.post_id}`);
    }
    return post;
  },
  staticData: {
    breadcrumb: ({ loaderData }) =>
      (loaderData as PostRecord | undefined)?.title ??
      "Post",
  },
});
