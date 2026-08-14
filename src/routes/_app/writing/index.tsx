import { createFileRoute } from "@tanstack/react-router";

import WritingAll from "@/pages/writingAll/WritingAll";

export const Route = createFileRoute("/_app/writing/")({
  component: RouteComponent,
  staticData: {
    breadcrumb: "",
  },
});

function RouteComponent() {
  return <WritingAll />;
}
