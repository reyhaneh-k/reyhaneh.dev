import { motion, useInView } from "motion/react";
import { useRef } from "react";

import { cn } from "@/utils/classname";
import {
  isTouchDevice,
  supportsHover,
} from "@/utils/device";

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
  const isInView = useInView(ref, { amount: 0.8 });
  return (
    <motion.div
      ref={ref}
      className={cn(
        "relative aspect-3/4 w-full max-w-72 cursor-pointer overflow-hidden",
        className
      )}
      initial="rest"
      whileHover="hover"
      animate={
        isInView && isTouchDevice() && !supportsHover()
          ? "hover"
          : "rest"
      }
      variants={{
        rest: {},
        hover: {},
      }}
    >
      <link
        rel="preload"
        href={data[0]}
        as="image"
        fetchPriority="high"
      />
      {data.slice(0, 3).map((item, index) => (
        <motion.div
          key={`${item}-${index}`}

          className={cn(
            "absolute top-0 left-0 h-[calc(100%-24px)] w-[calc(100%-24px)] overflow-hidden rounded-2xl",
            "border-2 border-white",
            "bg-cover bg-clip-padding bg-center bg-no-repeat"
          )}
          variants={{
            rest: {
              rotate: index * 4,
              x: index,
              y: index * 2,
              width: "calc(100% - 24px)",
              height: "calc(100% - 24px)",
              borderWidth: 2,
              transition: {
                width: { duration: 0.2, ease: "easeInOut" },
                height: {
                  duration: 0.2,
                  ease: "easeInOut",
                },
                rotate: {
                  duration: 0.2,
                  ease: "easeInOut",
                  delay: 0.2,
                },
                x: {
                  duration: 0.2,
                  ease: "easeInOut",
                  delay: 0.2,
                },
                y: {
                  duration: 0.2,
                  ease: "easeInOut",
                  delay: 0.2,
                },
              },
            },
            hover: {
              rotate: 0,
              x: 0,
              y: 0,
              width: "100%",
              height: "100%",
              borderWidth: 0,
              transition: {
                rotate: {
                  duration: 0.2,
                  ease: "easeInOut",
                  delay: index * 0.04,
                },
                x: {
                  duration: 0.2,
                  ease: "easeInOut",
                  delay: index * 0.04,
                },
                y: {
                  duration: 0.2,
                  ease: "easeInOut",
                  delay: index * 0.04,
                },
                borderWidth: {
                  duration: 0.2,
                  delay: index * 0.04,
                },
                width: {
                  duration: 0.2,
                  ease: "easeInOut",
                  delay: 0.2 + index * 0.04,
                },
                height: {
                  duration: 0.2,
                  ease: "easeInOut",
                  delay: 0.2 + index * 0.04,
                },
              },
            },
          }}
          style={{
            zIndex: 2 - index,
            backgroundImage: `url(${item})`,
          }}
        >
          <div className="absolute inset-0 -z-10 backdrop-blur-sm" />
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
        variants={{
          rest: {
            opacity: 0,
            transition: {
              duration: 0.2,
              delay: 0,
              ease: "easeOut",
            },
          },
          hover: {
            opacity: 1,
            transition: {
              duration: 0.2,
              delay: 0.2 + 0.04,
              ease: "easeOut",
            },
          },
        }}
      >
        <span className="text-accent absolute top-4 right-4 text-xs font-medium tracking-wider uppercase">
          {slideCount} slides
        </span>
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
