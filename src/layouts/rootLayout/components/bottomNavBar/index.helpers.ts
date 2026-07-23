import { type MaskMetrics } from "./index.type";

/** Must match default ball (`size-12` = 48px) when the ball is not yet measured. */
const FALLBACK_BALL_PX = 48;
const BALL_TO_MASK_WIDTH_RATIO = 1.7;

const getMaskMetrics = (
  listItemId: string,
  ol: HTMLElement | null
): MaskMetrics | null => {
  if (!listItemId || !ol) return null;

  const item = ol.querySelector<HTMLElement>(
    `[id="${CSS.escape(listItemId)}"]`
  );
  if (!item) return null;

  const itemBox = item.getBoundingClientRect();
  const olBox = ol.getBoundingClientRect();
  const ball = item.querySelector<HTMLElement>(
    "[data-nav-ball]"
  );
  const ballW = ball?.offsetWidth ?? FALLBACK_BALL_PX;
  const w = ballW * BALL_TO_MASK_WIDTH_RATIO;
  const h = w * (48 / 80); // keep -- matches svg
  const centerX =
    itemBox.left + itemBox.width / 2 - olBox.left;

  return { x: centerX - w / 2, w, h };
};

export { getMaskMetrics };
