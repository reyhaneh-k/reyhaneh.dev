import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_app/writing/articles"
)({
  component: RouteComponent,
  staticData: {
    breadcrumb: "Articles",
  },
});

function RouteComponent() {
  return (
    <div>Hello &quot;/_app/writing/articles&quot;!</div>
  );
}
