import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_app/writing/carousels"
)({
  component: RouteComponent,
  staticData: {
    breadcrumb: "Carousels",
  },
});

function RouteComponent() {
  return (
    <div>Hello &quot;/_app/writing/carousels&quot;!</div>
  );
}
