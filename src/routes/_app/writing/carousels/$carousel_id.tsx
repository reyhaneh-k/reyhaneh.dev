import { createFileRoute } from "@tanstack/react-router";

import CarouselDetail from "@/pages/carouselDetail/CarouselDetail";
import { getCarouselById } from "@/pages/writing/index.consts";
import type { CarouselRecord } from "@/pages/writing/index.types";

export const Route = createFileRoute(
  "/_app/writing/carousels/$carousel_id"
)({
  component: RouteComponent,
  loader: ({ params }) => {
    const carousel = getCarouselById(params.carousel_id);
    if (!carousel) {
      throw new Error(
        `Carousel not found: ${params.carousel_id}`
      );
    }
    return carousel;
  },
  staticData: {
    breadcrumb: ({ loaderData }) =>
      (loaderData as CarouselRecord | undefined)?.title ??
      "Carousel",
  },
});

function RouteComponent() {
  const { carousel_id } = Route.useParams();
  return <CarouselDetail key={carousel_id} />;
}
