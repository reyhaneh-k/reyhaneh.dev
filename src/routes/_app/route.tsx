import { createFileRoute } from "@tanstack/react-router";

import { RootLayout } from "@/layouts/rootLayout/RootLayout";

export const Route = createFileRoute("/_app")({
  component: RootLayout,
  staticData: {
    breadcrumb: "Home",
  },
});
