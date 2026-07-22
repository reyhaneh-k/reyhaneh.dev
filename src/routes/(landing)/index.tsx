import { createFileRoute } from "@tanstack/react-router";

import { Hero } from "./-components/hero/Hero";

export const Route = createFileRoute("/(landing)/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <Hero />
    </div>
  );
}
