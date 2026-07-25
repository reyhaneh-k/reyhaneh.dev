import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/writing/")({
  component: RouteComponent,
  staticData: {
    breadcrumb: "",
  },
});

function RouteComponent() {
  return <div>Hello &quot;/_app/writing/&quot;!</div>;
}
