import type { Transition } from "motion/react";

const STACK_INSET = 30;
const STACK_DURATION = 0.3;
const STACK_STAGGER = 0.04;
const STACK_VISIBLE_COUNT = 3;
const STACK_EASE = [0.22, 1.2, 0.36, 1] as const;

const stackTween = {
  duration: STACK_DURATION,
  ease: STACK_EASE,
} satisfies Transition;

const stackRestTween = {
  duration: 0.22,
  ease: [0.4, 0, 0.2, 1] as const,
} satisfies Transition;

function stackAlignDelay(index: number) {
  return index * STACK_STAGGER;
}

function stackSizeDelay(index: number) {
  return STACK_DURATION / 2 + index * STACK_STAGGER;
}

const overlayHoverDelay =
  STACK_DURATION / 2 +
  STACK_STAGGER * (STACK_VISIBLE_COUNT - 1);

export {
  STACK_INSET,
  STACK_DURATION,
  STACK_VISIBLE_COUNT,
  stackTween,
  stackRestTween,
  stackAlignDelay,
  stackSizeDelay,
  overlayHoverDelay,
};
