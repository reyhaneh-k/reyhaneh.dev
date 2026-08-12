import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

import { cn } from "@/utils/classname";

import { extractFeaturedTheme } from "./index.helpers";
import type {
  FeaturedCarouselProps,
  FeaturedTheme,
} from "./index.types";

function FeaturedCarousel({
  id,
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
    <motion.section
      variants={{
        hover: {},
        rest: {},
      }}
      initial="rest"
      whileHover="hover"
      className={cn(
        "border-line flex gap-4 overflow-hidden rounded-lg border max-sm:h-auto sm:h-96",
        "shadow-xl max-sm:flex-col",
        className
      )}
      style={{
        backgroundColor: theme?.background,
      }}
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
        className="h-full min-w-0 object-cover object-center max-sm:h-auto max-sm:w-full max-sm:border-b-2 sm:w-1/3 sm:border-e-2"
        style={{
          borderColor: theme?.title,
        }}
        loading="eager"
        fetchPriority="high"
        decoding="sync"
      />
      <div
        className={cn(
          "flex flex-col justify-between gap-4 sm:basis-2/3",
          "p-4",
          "md:h-3/4 md:gap-10 md:self-center"
        )}
      >
        <div className="flex flex-col gap-4 sm:min-h-0 sm:flex-1 md:gap-6">
          <h3
            className="line-clamp-2 shrink-0 text-xl font-bold"
            style={{
              color: theme?.title,
            }}
          >
            {title}
          </h3>
          <div className="sm:@container-size sm:min-h-0 sm:flex-1">
            <p
              className="text-sm leading-5 max-sm:line-clamp-6 sm:line-clamp-[calc(100cqh/1.25rem)]"
              style={{
                color: theme?.body,
              }}
            >
              {description}
            </p>
          </div>
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
          <Link
            className="ml-auto flex text-[1.2em]"
            to="/writing/carousels/$carousel_id"
            style={{
              color: theme?.title,
            }}
            params={{ carousel_id: id }}
          >
            <motion.span
              className="flex items-center gap-2"
              variants={{
                hover: {
                  opacity: 1,
                },
                rest: {
                  opacity: 0,
                },
              }}
            >
              View
              <ArrowRight className="size-[1em]" />
            </motion.span>
          </Link>
        </div>
      </div>
    </motion.section>
  );
}

export { FeaturedCarousel };
