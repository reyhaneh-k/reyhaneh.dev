import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/writing/")({
  component: RouteComponent,
  staticData: {
    breadcrumb: "",
  },
});

function RouteComponent() {
  return (
    <div>
      {Array.from({ length: 100 }).map((_, index) => (
        <div key={index}>{index}</div>
      ))}
    </div>
  );
}
