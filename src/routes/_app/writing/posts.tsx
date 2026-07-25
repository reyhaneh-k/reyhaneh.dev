import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/writing/posts")(
  {
    component: RouteComponent,
    staticData: {
      breadcrumb: "Posts",
    },
  }
);

function RouteComponent() {
  return <div>Hello &quot;/_app/writing/posts&quot;!</div>;
}
