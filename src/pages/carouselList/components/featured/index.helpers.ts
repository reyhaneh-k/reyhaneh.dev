import FeaturedThemeWorker from "@/workers/featuredTheme/featuredTheme.worker?worker";
import type {
  FeaturedThemeWorkerRequest,
  FeaturedThemeWorkerResponse,
} from "@/workers/featuredTheme/index.types";

import type { FeaturedTheme } from "./index.types";

export const themeCache = new Map<string, FeaturedTheme>();
const inflight = new Map<
  string,
  Promise<FeaturedTheme | null>
>();

let worker: Worker | null = null;
let nextRequestId = 0;

function getThemeWorker() {
  worker ??= new FeaturedThemeWorker();
  return worker;
}

function extractFeaturedTheme(
  url: string
): Promise<FeaturedTheme | null> {
  const cached = themeCache.get(url);
  if (cached) return Promise.resolve(cached);

  const pending = inflight.get(url);
  if (pending) return pending;

  const id = nextRequestId++;
  const themeWorker = getThemeWorker();

  const request = new Promise<FeaturedTheme | null>(
    (resolve) => {
      const onMessage = (
        event: MessageEvent<FeaturedThemeWorkerResponse>
      ) => {
        if (event.data.id !== id) return;
        themeWorker.removeEventListener(
          "message",
          onMessage
        );
        resolve(event.data.theme);
      };

      themeWorker.addEventListener("message", onMessage);

      const payload: FeaturedThemeWorkerRequest = {
        id,
        url,
      };
      themeWorker.postMessage(payload);
    }
  ).then((theme) => {
    if (theme) themeCache.set(url, theme);
    return theme;
  });

  inflight.set(url, request);
  return request.finally(() => {
    inflight.delete(url);
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
