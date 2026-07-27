import { motion } from "motion/react";

import { cn } from "@/utils/classname";

import { CarouselStackProps } from "./index.types";

function CarouselStack({
  title,
  data,
  className,
}: CarouselStackProps) {
  return (
    <motion.div
      className={cn(
        "relative aspect-3/4 w-72 overflow-hidden",
        className
      )}
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      {data.slice(0, 3).map((item, index) => (
        <motion.div
          key={item}
          className={cn(
            "absolute top-0 right-6 bottom-0 left-0 overflow-hidden rounded-2xl",
            index > 0 && "border-border border",
            index === 0 &&
              "after:from-accent after:via-accent after:pointer-events-none after:absolute after:inset-0 after:bg-linear-to-b after:from-0% after:via-10% after:to-transparent after:to-20% after:content-['']"
          )}
          variants={{
            rest: { rotate: 0 },
            hover: { rotate: index * 4 },
          }}
          style={{ zIndex: 2 - index }}
          transition={{
            duration: 0.2,
            ease: "easeInOut",
            delay: index * 0.1,
          }}
        >
          <img
            src={item}
            aria-hidden={index > 0}
            alt={title}
            className="h-full w-full object-cover"
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

export { CarouselStack };
