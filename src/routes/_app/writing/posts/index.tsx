import { createFileRoute } from "@tanstack/react-router";

import PostList from "@/pages/postList/PostList";

export const Route = createFileRoute(
  "/_app/writing/posts/"
)({
  component: PostList,
  staticData: {
    breadcrumb: "",
  },
});
