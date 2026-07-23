import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/projects")({
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <div className="p-2">
      <h1 className="font-display text-3xl font-bold">
        Projects
      </h1>
    </div>
  );
}
