import { Link } from "@tanstack/react-router";
import { ArrowRight, Layers } from "lucide-react";

import { KindChip } from "@/pages/writing/components/kindChip/KindChip";
import { cn } from "@/utils/classname";

import type { FeaturedCarouselProps } from "./index.types";

function Featured({
  id,
  title,
  description,
  images,
  cover,
  tags,
  slideCount,
  className,
}: FeaturedCarouselProps) {
  const coverUrl = cover ?? images[0];

  return (
    <Link
      to="/writing/carousels/$carousel_id"
      params={{ carousel_id: id }}
      className={cn("group block", className)}
    >
      <div
        className={cn(
          "bg-surface rounded-2xl p-1",
          "shadow-[0_32px_64px_-12px_rgb(40_49_61/0.06)]",
          "transition-transform duration-300 ease-out group-hover:-translate-y-1"
        )}
      >
        <div
          className={cn(
            "bg-ink relative flex overflow-hidden rounded-2xl",
            "flex-col md:h-[500px] md:flex-row"
          )}
        >
          <div className="relative p-[5%] md:h-full md:w-2/3">
            <div className="relative h-56 md:h-full">
              <div
                aria-hidden
                className={cn(
                  "pointer-events-none absolute inset-0 z-10 rounded-2xl",
                  "via-ink/30 to-ink bg-linear-to-b from-transparent",
                  "md:via-ink/50 md:to-ink md:bg-linear-to-r md:from-transparent"
                )}
              />
              <img
                src={coverUrl}
                alt={title}
                className="h-full w-full rounded-2xl object-cover"
                loading="eager"
                fetchPriority="high"
              />
              <span
                className={cn(
                  "absolute top-4 left-4 z-20",
                  "bg-surface/90 text-ink inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium backdrop-blur-sm"
                )}
              >
                <Layers className="size-3.5" />
                {slideCount} Slides
              </span>
            </div>
          </div>

          <div
            className={cn(
              "relative z-20 flex flex-col justify-center",
              "p-8 md:w-1/3 md:p-12"
            )}
          >
            <ArrowRight
              className={cn(
                "text-canvas absolute top-8 right-8 size-8",
                "transition-transform duration-300 group-hover:translate-x-1"
              )}
            />
            <KindChip kind="article" className="mb-6 w-max">
              Featured
            </KindChip>
            <h2 className="font-display text-canvas mb-4 text-3xl leading-tight font-bold tracking-tight md:text-4xl lg:text-5xl">
              {title}
            </h2>
            <p className="text-canvas/70 mb-8 text-base leading-relaxed md:text-lg">
              {description}
            </p>
            <div className="text-canvas/50 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium tracking-wide">
              {tags.slice(0, 2).map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export { Featured as FeaturedCarousel };
