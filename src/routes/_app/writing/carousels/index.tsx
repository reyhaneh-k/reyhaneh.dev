import { createFileRoute } from "@tanstack/react-router";

import Carousels from "@/pages/carousels/Carousels";

export const Route = createFileRoute(
  "/_app/writing/carousels/"
)({
  component: Carousels,
  staticData: {
    breadcrumb: "",
  },
});
