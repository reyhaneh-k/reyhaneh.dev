import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_app/writing/carousels/$carousel_id"
)({
  component: RouteComponent,
  staticData: {
    breadcrumb: "Carousel",
  },
});

function RouteComponent() {
  return (
    <div>
      Hello
      &quot;/_app/writing/carousels/$carousel_id&quot;!
    </div>
  );
}
