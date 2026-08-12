import { createFileRoute } from "@tanstack/react-router";

import Carousles from "@/pages/carousels/Carousles";

export const Route = createFileRoute(
  "/_app/writing/carousels/"
)({
  component: Carousles,
  staticData: {
    breadcrumb: "Carousels",
  },
});
