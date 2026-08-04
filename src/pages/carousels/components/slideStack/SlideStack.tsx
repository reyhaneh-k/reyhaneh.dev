import { motion } from "motion/react";

import { cn } from "@/utils/classname";

function SlideStack({
  src,
  title,
  index,
}: {
  src: string;
  title: string;
  index: number;
}) {
  return (
    <motion.div
      className={cn(
        "absolute top-0 right-6 bottom-6 left-0 overflow-hidden rounded-2xl",
        "border-2 border-white"
      )}
      variants={{
        rest: { rotate: index * 4 },
        hover: { rotate: 0 },
      }}
      style={{
        zIndex: 2 - index,
        backgroundImage: `url(${src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundClip: "padding-box",
      }}
      transition={{
        duration: 0.2,
        ease: "easeInOut",
        delay: index * 0.04,
      }}
    >
      <div className="absolute inset-0 -z-10 backdrop-blur-sm" />
      {index === 0 && (
        <img
          src={src}
          alt={title}
          loading="lazy"
          className="z-1 h-full w-full object-contain"
        />
      )}
    </motion.div>
  );
}

export default SlideStack;
