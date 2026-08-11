import { getSwatchesSync } from "colorthief";

import type { FeaturedTheme } from "./index.types";

function extractFeaturedTheme(
  img: HTMLImageElement
): FeaturedTheme | null {
  const swatches = getSwatchesSync(img);
  const background =
    swatches.DarkMuted?.color ??
    swatches.Muted?.color ??
    swatches.DarkVibrant?.color;

  if (!background) return null;

  const title =
    swatches.Vibrant?.color ??
    swatches.LightVibrant?.color ??
    background.contrast.foreground;

  const body =
    swatches.LightMuted?.color ??
    swatches.Muted?.bodyTextColor ??
    background.contrast.foreground;

  return {
    background: background.hex(),
    title: title.hex(),
    body: body.hex(),
  };
}

export { extractFeaturedTheme };
