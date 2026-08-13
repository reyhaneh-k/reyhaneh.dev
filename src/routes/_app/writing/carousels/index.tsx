import { createFileRoute } from "@tanstack/react-router";

import CarouselList from "@/pages/carouselList/CarouselList";

export const Route = createFileRoute(
  "/_app/writing/carousels/"
)({
  component: CarouselList,
  staticData: {
    breadcrumb: "",
  },
});
