import FeaturedThemeWorker from "@/workers/featuredTheme/featuredTheme.worker?worker";
import type {
  FeaturedThemeWorkerRequest,
  FeaturedThemeWorkerResponse,
} from "@/workers/featuredTheme/index.types";

import type { FeaturedTheme } from "./index.types";

let worker: Worker | null = null;
let nextRequestId = 0;

function getThemeWorker() {
  worker ??= new FeaturedThemeWorker();
  return worker;
}

function extractFeaturedTheme(
  url: string
): Promise<FeaturedTheme | null> {
  const id = nextRequestId++;
  const themeWorker = getThemeWorker();

  return new Promise<FeaturedTheme | null>((resolve) => {
    const onMessage = (
      event: MessageEvent<FeaturedThemeWorkerResponse>
    ) => {
      if (event.data.id !== id) return;
      themeWorker.removeEventListener("message", onMessage);
      resolve(event.data.theme);
    };

    themeWorker.addEventListener("message", onMessage);

    const request: FeaturedThemeWorkerRequest = { id, url };
    themeWorker.postMessage(request);
  });
}

function scheduleThemeExtraction(
  url: string,
  onTheme: (theme: FeaturedTheme) => void
) {
  const run = () => {
    void extractFeaturedTheme(url).then((next) => {
      if (next) onTheme(next);
    });
  };

  if (typeof requestIdleCallback === "function") {
    requestIdleCallback(run, { timeout: 1000 });
    return;
  }

  window.setTimeout(run, 0);
}

export { extractFeaturedTheme, scheduleThemeExtraction };
