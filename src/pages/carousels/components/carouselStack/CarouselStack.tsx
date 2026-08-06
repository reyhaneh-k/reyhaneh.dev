import { motion } from "motion/react";

import { cn } from "@/utils/classname";

import SlideStack from "../slideStack/SlideStack";

import { CarouselStackProps } from "./index.types";

function CarouselStack({
  title,
  description,
  data,
  className,
  index: listIndex,
}: CarouselStackProps) {
  const slideCount = data.length;

  return (
    <motion.div
      className={cn(
        "relative aspect-3/4 w-full max-w-72 cursor-pointer overflow-hidden",
        className
      )}
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={{
        rest: {
          scale: 1,
          transition: {
            ease: "easeInOut",
            duration: 0.1,
          },
        },
        hover: {
          scale: 1.05,
          transition: {
            ease: "easeInOut",
            duration: 0.1,
          },
        },
      }}
    >
      {data.slice(0, 3).map((item, index) => (
        <SlideStack
          key={`${item}-${index}`}
          src={item}
          title={title}
          index={index}
          loading={
            listIndex && listIndex > 0 ? "lazy" : "eager"
          }
        />
      ))}

      <motion.div
        aria-hidden
        className={cn(
          "absolute top-0 right-6 bottom-6 left-0 z-10 overflow-hidden rounded-2xl p-4",
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
          rest: { opacity: 0 },
          hover: { opacity: 1 },
        }}
        transition={{
          duration: 0.22,
          ease: "easeOut",
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
