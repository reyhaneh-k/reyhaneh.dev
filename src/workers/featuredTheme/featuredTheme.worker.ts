import { getSwatches } from "colorthief";

import type {
  FeaturedThemeWorkerRequest,
  FeaturedThemeWorkerResponse,
} from "./index.types";

const MAX_SAMPLE_SIDE = 128;

async function loadBitmapFromUrl(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch image: ${response.status}`
    );
  }
  const blob = await response.blob();
  return createImageBitmap(blob);
}

function bitmapToOffscreenCanvas(bitmap: ImageBitmap) {
  const scale = Math.min(
    1,
    MAX_SAMPLE_SIDE / Math.max(bitmap.width, bitmap.height)
  );
  const width = Math.max(
    1,
    Math.round(bitmap.width * scale)
  );
  const height = Math.max(
    1,
    Math.round(bitmap.height * scale)
  );
  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error(
      "Could not get 2D context from OffscreenCanvas"
    );
  }
  ctx.drawImage(bitmap, 0, 0, width, height);
  return canvas;
}

self.onmessage = async (
  event: MessageEvent<FeaturedThemeWorkerRequest>
) => {
  const { id, url } = event.data;
  let bitmap: ImageBitmap | undefined;

  try {
    bitmap = await loadBitmapFromUrl(url);
    const canvas = bitmapToOffscreenCanvas(bitmap);
    const swatches = await getSwatches(canvas);

    const background =
      swatches.DarkMuted?.color ??
      swatches.Muted?.color ??
      swatches.DarkVibrant?.color;

    if (!background) {
      const response: FeaturedThemeWorkerResponse = {
        id,
        theme: null,
      };
      self.postMessage(response);
      return;
    }

    const title =
      swatches.Vibrant?.color ??
      swatches.LightVibrant?.color ??
      background.contrast.foreground;

    const body =
      swatches.LightMuted?.color ??
      swatches.Muted?.bodyTextColor ??
      background.contrast.foreground;

    const response: FeaturedThemeWorkerResponse = {
      id,
      theme: {
        background: background.hex(),
        title: title.hex(),
        body: body.hex(),
      },
    };
    self.postMessage(response);
  } catch (error) {
    const response: FeaturedThemeWorkerResponse = {
      id,
      theme: null,
      error:
        error instanceof Error
          ? error.message
          : "Theme extraction failed",
    };
    self.postMessage(response);
  } finally {
    bitmap?.close();
  }
};
