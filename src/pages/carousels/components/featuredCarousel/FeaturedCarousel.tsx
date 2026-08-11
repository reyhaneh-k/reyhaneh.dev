import { useState, type CSSProperties } from "react";

import { cn } from "@/utils/classname";

import { extractFeaturedTheme } from "./index.helpers";
import type {
  FeaturedCarouselProps,
  FeaturedTheme,
} from "./index.types";

function FeaturedCarousel({
  title,
  description,
  images,
  views,
  publishedAt,
  className,
}: FeaturedCarouselProps) {
  const [theme, setTheme] = useState<FeaturedTheme | null>(
    null
  );

  return (
    <section
      className={cn(
        "border-line flex h-80 gap-4 overflow-hidden rounded-lg border",
        "bg-clip-padding max-sm:bg-cover max-sm:bg-center max-sm:bg-no-repeat",
        "max-sm:[background-image:var(--featured-cover)]",
        className
      )}
      style={
        {
          backgroundColor: theme?.background,
          "--featured-cover": `url(${images[0]})`,
        } as CSSProperties
      }
    >
      <img
        onLoad={(e) => {
          const next = extractFeaturedTheme(
            e.currentTarget
          );
          if (next) setTheme(next);
        }}
        src={images[0]}
        alt={title}
        className="block basis-1 object-contain object-left max-sm:hidden"
        loading="eager"
        fetchPriority="high"
        decoding="sync"
      />
      <div
        className={cn(
          "flex grow basis-2 flex-col justify-between gap-3",
          "px-2 py-3 max-sm:p-4 max-sm:backdrop-blur-md",
          "@container"
        )}
      >
        <div className="space-y-4">
          <h3
            className="line-clamp-2 text-lg font-bold"
            style={{
              color: theme?.title,
            }}
          >
            {title}
          </h3>
          <p
            className={cn(
              "line-clamp-6 text-sm",
              "@max-sm:line-clamp-2"
            )}
            style={{
              color: theme?.body,
            }}
          >
            {description}
          </p>
        </div>
        <div
          className="font-display text-ink-muted flex flex-wrap items-center gap-x-2 gap-y-1 text-xs tracking-wide"
          style={{
            color: theme?.body,
          }}
        >
          <time dateTime={publishedAt}>
            {new Date(publishedAt).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            )}
          </time>
          <span aria-hidden>·</span>
          <span>
            {new Intl.NumberFormat("en", {
              notation: "compact",
              maximumFractionDigits: 1,
            }).format(views)}{" "}
            views
          </span>
          <span aria-hidden>·</span>
          <span>{images.length} slides</span>
        </div>
      </div>
    </section>
  );
}

export { FeaturedCarousel };
