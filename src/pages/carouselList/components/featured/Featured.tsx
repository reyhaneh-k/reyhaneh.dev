import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/utils/classname";
import { isTouchDevice } from "@/utils/device";

import { scheduleThemeExtraction } from "./index.helpers";
import type {
  FeaturedCarouselProps,
  FeaturedTheme,
} from "./index.types";

function Featured({
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
  const ref = useRef<HTMLElement>(null);
  const coverUrl = images[0];

  useEffect(() => {
    if (!coverUrl) return;

    let cancelled = false;
    scheduleThemeExtraction(coverUrl, (next) => {
      if (!cancelled) setTheme(next);
    });

    return () => {
      cancelled = true;
    };
  }, [coverUrl]);

  return (
    <motion.section
      ref={ref}
      variants={{
        hover: {},
        rest: {},
      }}
      initial="rest"
      whileHover="hover"
      animate={isTouchDevice() ? "hover" : "rest"}
      className={cn(
        "border-line flex overflow-hidden rounded-lg border max-sm:h-auto sm:h-96",
        "shadow-shadow-sm shadow-xl max-sm:flex-col",
        "transition-colors duration-300 ease-in-out",
        className
      )}
      style={{
        backgroundColor:
          theme?.background ?? "var(--canvas)",
      }}
    >
      <div className="relative min-w-0 max-sm:w-full sm:h-full sm:w-1/3">
        <img
          src={coverUrl}
          alt={title}
          className="h-full w-full min-w-0 object-cover object-center"
          loading="eager"
          fetchPriority="high"
          decoding="sync"
        />
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute",
            "inset-y-0 right-0 w-16",
            "max-sm:inset-x-0 max-sm:top-auto max-sm:bottom-0 max-sm:h-16 max-sm:w-full",
            "backdrop-blur-md",
            "mask-[linear-gradient(to_right,transparent,black)]",
            "max-sm:mask-[linear-gradient(to_bottom,transparent,black)]"
          )}
        />
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute",
            "inset-y-0 right-0 w-28",
            "max-sm:inset-x-0 max-sm:top-auto max-sm:bottom-0 max-sm:h-20 max-sm:w-full",
            "hidden sm:block"
          )}
          style={{
            backgroundImage: `linear-gradient(to right, transparent, ${theme?.background ?? "transparent"})`,
          }}
        />
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-0 h-20 sm:hidden"
          )}
          style={{
            backgroundImage: `linear-gradient(to bottom, transparent, ${theme?.background ?? "transparent"})`,
          }}
        />
      </div>
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
              className="cursor-default text-sm leading-5 max-sm:line-clamp-6 sm:line-clamp-[calc(100cqh/1.25rem)]"
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
            className="ml-auto flex text-sm"
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
              <motion.span
                className="inline-flex"
                variants={{
                  hover: {
                    x: [0, 4, 0],
                    transition: {
                      repeat: Infinity,
                      duration: 0.6,
                      ease: "easeInOut",
                    },
                  },
                  rest: { x: 0 },
                }}
              >
                <ArrowRight className="size-[1em]" />
              </motion.span>
            </motion.span>
          </Link>
        </div>
      </div>
    </motion.section>
  );
}

export { Featured as FeaturedCarousel };
