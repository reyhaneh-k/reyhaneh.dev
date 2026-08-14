import {
  archiveCarousels,
  featuredCarousel,
} from "../writing/index.consts";
import type { CarouselRecord } from "../writing/index.types";

const archiveSorts = ["latest", "popular"] as const;

type ArchiveSort = (typeof archiveSorts)[number];

function sortArchive(
  items: CarouselRecord[],
  sort: ArchiveSort
) {
  return [...items].sort((a, b) => {
    if (sort === "latest") {
      return b.publishedAt.localeCompare(a.publishedAt);
    }
    return b.views - a.views;
  });
}

export {
  featuredCarousel,
  archiveCarousels,
  archiveSorts,
  sortArchive,
};

export type { ArchiveSort };
