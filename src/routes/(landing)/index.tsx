import { createFileRoute } from "@tanstack/react-router";

import { Hero } from "./-components/hero/Hero";

export const Route = createFileRoute("/(landing)/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2 text-red-500">
      <h3>Welcome from the index route!</h3>
      <Hero />
    </div>
  );
}
