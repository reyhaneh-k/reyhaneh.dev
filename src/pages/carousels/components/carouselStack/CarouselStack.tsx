import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { delay, motion, useInView } from "motion/react";
import { useRef } from "react";

import { cn } from "@/utils/classname";
import { isTouchDevice } from "@/utils/device";

import { STACK_VISIBLE_COUNT } from "./index.consts";
import {
  getSlideVariants,
  overlayVariants,
} from "./index.helpers";
import { CarouselStackProps } from "./index.types";

function CarouselStack({
  title,
  description,
  images: data,
  className,
  index: listIndex,
}: CarouselStackProps) {
  const slideCount = data.length;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 1 });
  return (
    <motion.div
      ref={ref}
      className={cn(
        "relative aspect-3/4 w-full max-w-72 overflow-hidden rounded-2xl",
        className
      )}
      initial="rest"
      whileHover="hover"

      animate={
        isInView && isTouchDevice() ? "hover" : "rest"
      }
    >
      <link
        rel="preload"
        href={data[0]}
        as="image"
        fetchPriority="high"
      />
      {data
        .slice(0, STACK_VISIBLE_COUNT)
        .map((item, index) => (
          <motion.div
            key={`${item}-${index}`}
            className={cn(
              "absolute top-0 left-0 overflow-hidden rounded-2xl border-2",
              "border[color-mix(in oklab, var(--line) 40%, white 60%)]",
              "bg-cover bg-center bg-no-repeat"
            )}
            variants={getSlideVariants(index)}
            style={{
              zIndex: STACK_VISIBLE_COUNT - 1 - index,
              backgroundImage: `url(${item})`,
            }}
          >
            <div className="absolute inset-0 -z-10 rounded-2xl backdrop-blur-sm" />
            {index === 0 && (
              <img
                loading={
                  listIndex && listIndex > 0
                    ? "lazy"
                    : "eager"
                }
                src={item}
                alt={title}
                className="z-1 h-full w-full object-contain"
              />
            )}
          </motion.div>
        ))}

      <motion.div
        aria-hidden
        className={cn(
          "absolute inset-0 z-10 overflow-hidden rounded-2xl p-4",
          "backdrop-blur-md backdrop-saturate-150"
        )}
        style={{
          backgroundImage: `
            radial-gradient(90% 120% at 20% 0%, color-mix(in srgb, var(--accent) 32%, transparent), transparent 60%),
            radial-gradient(70% 90% at 80% 100%, color-mix(in srgb, var(--tertiary) 20%, transparent), transparent 60%),
            linear-gradient(color-mix(in srgb, var(--surface) 55%, transparent), color-mix(in srgb, var(--surface) 55%, transparent))
          `,
        }}
        variants={overlayVariants}
      >
        <Link
          to="/writing/carousels/$carousel_id"
          params={{
            carousel_id: data[0],
          }}
        >
          <span className="text-accent absolute top-4 left-4 text-xs font-medium tracking-wider uppercase">
            {slideCount} slides
          </span>
          <motion.span
            className="text-accent absolute top-4 right-4 inline-flex text-xs"
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
            <ArrowRight className="size-4" />
          </motion.span>
        </Link>
        <div className="absolute inset-x-4 bottom-4 flex flex-col gap-1.5">
          <h3 className="font-display text-ink line-clamp-2 text-lg leading-tight font-semibold">
            {title}
          </h3>
          <p className="text-ink-muted line-clamp-2 text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export { CarouselStack };
