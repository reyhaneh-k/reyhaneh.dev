import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/writing")({
  component: WritingPage,
});

function WritingPage() {
  return (
    <div className="p-2">
      <h1 className="font-display text-3xl font-bold">
        Writing
      </h1>
    </div>
  );
}
