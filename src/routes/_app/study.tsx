import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/study")({
  component: StudyPage,
});

function StudyPage() {
  return (
    <div className="p-2">
      <h1 className="font-display text-3xl font-bold">
        Study
      </h1>
    </div>
  );
}
