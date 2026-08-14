import {
  createFileRoute,
  Outlet,
} from "@tanstack/react-router";

export const Route = createFileRoute("/_app/writing/posts")(
  {
    component: Outlet,
    staticData: {
      breadcrumb: "Posts",
    },
  }
);
