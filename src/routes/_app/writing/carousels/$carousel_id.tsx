import { createFileRoute } from "@tanstack/react-router";

import CarouselDetail from "@/pages/carouselDetail/CarouselDetail";
import type { StackProps } from "@/pages/carouselList/components/stack/index.types";
import { getCarouselById } from "@/pages/carouselList/index.consts";

export const Route = createFileRoute(
  "/_app/writing/carousels/$carousel_id"
)({
  component: CarouselDetail,
  loader: async ({ params }) => {
    const carousel = await getCarouselById(
      params.carousel_id
    );
    if (!carousel) {
      throw new Error(
        `Carousel not found: ${params.carousel_id}`
      );
    }
    return carousel;
  },
  staticData: {
    breadcrumb: ({ loaderData }) =>
      (loaderData as StackProps | undefined)?.title ??
      "Carousel",
  },
});
