import type { Variants } from "motion/react";

import {
  STACK_INSET,
  overlayHoverDelay,
  stackAlignDelay,
  stackRestTween,
  stackSizeDelay,
  stackTween,
} from "./index.consts";

function getSlideVariants(index: number): Variants {
  const align = {
    ...stackTween,
    delay: stackAlignDelay(index),
  };
  const size = {
    ...stackTween,
    delay: stackSizeDelay(index),
  };

  return {
    rest: {
      rotate: index * 4,
      x: index,
      y: index * 2,
      width: `calc(100% - ${STACK_INSET}px)`,
      height: `calc(100% - 0px)`,
      transition: stackRestTween,
    },
    hover: {
      rotate: 0,
      x: 0,
      y: 0,
      width: "100%",
      height: "100%",
      transition: {
        rotate: align,
        x: align,
        y: align,
        width: size,
        height: size,
      },
    },
  };
}

const overlayVariants: Variants = {
  rest: {
    opacity: 0,
    transition: stackRestTween,
  },
  hover: {
    opacity: 1,
    transition: { ...stackTween, delay: overlayHoverDelay },
  },
};

export { getSlideVariants, overlayVariants };
