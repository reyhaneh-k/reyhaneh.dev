import { createFileRoute } from "@tanstack/react-router";

import Posts from "@/pages/posts/Posts";

export const Route = createFileRoute("/_app/writing/posts")(
  {
    component: RouteComponent,
    staticData: {
      breadcrumb: "Posts",
    },
  }
);

function RouteComponent() {
  return <Posts />;
}
