import { useState } from "react";

import { cn } from "@/utils/classname";

import { FeaturedCarousel } from "./components/featured/Featured";
import { CarouselStack } from "./components/stack/Stack";
import {
  archiveCarousels,
  archiveSorts,
  featuredCarousel,
  sortArchive,
  type ArchiveSort,
} from "./index.consts";

function CarouselList() {
  const [sort, setSort] = useState<ArchiveSort>("popular");
  const archive = sortArchive(archiveCarousels, sort);

  return (
    <div className="space-y-16 md:space-y-20">
      <FeaturedCarousel
        id={featuredCarousel.id}
        title={featuredCarousel.title}
        description={featuredCarousel.description}
        images={featuredCarousel.images}
        cover={featuredCarousel.cover}
        tags={featuredCarousel.tags}
        slideCount={featuredCarousel.slideCount}
      />

      <section>
        <div className="border-line/40 mb-12 flex items-end justify-between border-b pb-4">
          <h3 className="text-2xl font-semibold">
            Archive
          </h3>
          <div className="flex gap-4">
            {archiveSorts.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => {
                  setSort(value);
                }}
                className={cn(
                  "text-sm font-medium tracking-wide capitalize transition-colors",
                  sort === value
                    ? "text-accent font-bold"
                    : "text-ink-muted hover:text-accent"
                )}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {archive.map((item) => (
            <CarouselStack
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description}
              cover={item.cover}
              slideCount={item.slideCount}
              tags={item.tags}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default CarouselList;
