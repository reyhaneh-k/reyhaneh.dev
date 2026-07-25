import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/work")({
  component: WorkPage,
  staticData: {
    breadcrumb: "Work",
  },
});

function WorkPage() {
  return (
    <div className="p-2">
      <h1 className="font-display text-3xl font-bold">
        Work
      </h1>
    </div>
  );
}
