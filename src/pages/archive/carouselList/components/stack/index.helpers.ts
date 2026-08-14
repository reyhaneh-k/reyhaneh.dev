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
      top: 0,
      left: 0,
      right: STACK_INSET,
      bottom: 0,
      transition: stackRestTween,
    },
    hover: {
      rotate: 0,
      x: 0,
      y: 0,
      top: 2,
      left: 2,
      right: 2,
      bottom: 2,
      transition: {
        rotate: align,
        x: align,
        y: align,
        top: size,
        left: size,
        right: size,
        bottom: size,
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
