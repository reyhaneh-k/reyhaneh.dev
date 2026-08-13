import { createFileRoute } from "@tanstack/react-router";

import type { CarouselStackProps } from "@/pages/carousels/components/carouselStack/index.types";
import { getCarouselById } from "@/pages/carousels/index.consts";

export const Route = createFileRoute(
  "/_app/writing/carousels/$carousel_id"
)({
  component: RouteComponent,
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
      (loaderData as CarouselStackProps | undefined)
        ?.title ?? "Carousel",
  },
});

function RouteComponent() {
  const carousel = Route.useLoaderData();

  return (
    <div>
      <h2 className="text-2xl font-bold">
        {carousel.title}
      </h2>
      <p className="text-ink-muted mt-2">
        {carousel.description}
      </p>
    </div>
  );
}
