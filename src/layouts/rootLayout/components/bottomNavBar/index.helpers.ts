import { animate, type MotionValue } from "motion/react";

import { SPRING } from "./index.consts";

/** Must match `maskSize` width (`5rem` ≈ 80px at default root font size). */
const MASK_WIDTH_PX = 80;

const syncMaskFromBall = (
  listItemId: string,
  ol: HTMLElement | null,
  maskX: MotionValue<number>
) => {
  if (!listItemId || !ol) return;

  const item = ol.querySelector<HTMLElement>(
    `[id="${CSS.escape(listItemId)}"]`
  );
  if (!item) return;
  const itemBox = item.getBoundingClientRect();
  const olBox = ol.getBoundingClientRect();
  const centerX =
    itemBox.left + itemBox.width / 2 - olBox.left;
  animate(maskX, centerX - MASK_WIDTH_PX / 2, SPRING);
};

export { MASK_WIDTH_PX, SPRING, syncMaskFromBall };
