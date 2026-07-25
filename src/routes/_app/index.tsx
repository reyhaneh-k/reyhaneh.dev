import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/")({
  component: Index,
  staticData: {
    breadcrumb: "",
  },
});

function Index() {
  return <div className="p-2">Hello World</div>;
}
