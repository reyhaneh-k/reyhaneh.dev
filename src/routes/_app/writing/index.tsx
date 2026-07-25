import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/writing/")({
  component: RouteComponent,
  staticData: {
    breadcrumb: "",
  },
});

function RouteComponent() {
  return (
    <div className="h-[10000px]">
      <h1>Writing</h1>
    </div>
  );
}
