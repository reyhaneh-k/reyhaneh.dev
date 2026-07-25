import {
  createFileRoute,
  Outlet,
} from "@tanstack/react-router";

import WritingLayout from "@/layouts/writingLayout/WritingLayout";

export const Route = createFileRoute("/_app/writing")({
  component: RouteComponent,
  staticData: {
    breadcrumb: "Writing",
  },
});

function RouteComponent() {
  return (
    <WritingLayout>
      <Outlet />
    </WritingLayout>
  );
}
