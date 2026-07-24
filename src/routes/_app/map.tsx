import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/map")({
  component: MapPage,
});

function MapPage() {
  return (
    <div className="p-2">
      <h1 className="font-display text-3xl font-bold">
        Map
      </h1>
    </div>
  );
}
