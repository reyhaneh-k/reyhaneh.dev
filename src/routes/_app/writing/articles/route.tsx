import {
  createFileRoute,
  Outlet,
} from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_app/writing/articles"
)({
  component: Outlet,
  staticData: {
    breadcrumb: "Articles",
  },
});
