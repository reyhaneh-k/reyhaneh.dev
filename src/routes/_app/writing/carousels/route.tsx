import {
  createFileRoute,
  Outlet,
} from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_app/writing/carousels"
)({
  component: Outlet,
  staticData: {
    breadcrumb: "Carousels",
  },
});
