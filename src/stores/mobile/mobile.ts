import { useSyncExternalStore } from "react";
const MEDIA_QUERY = "(max-width: 768px)";
const listeners = new Set<() => void>();
const emit = () => {
  for (const listener of listeners) listener();
};
let mediaQuery: MediaQueryList | undefined = undefined;

export const subscribeToMobileChanges = (
  onStoreChange: () => void
): (() => void) => {
  listeners.add(onStoreChange);
  if (listeners.size === 1) {
    mediaQuery = window.matchMedia(MEDIA_QUERY);
    mediaQuery.addEventListener("change", emit);
  }
  listeners.add(onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
    if (listeners.size === 0) {
      mediaQuery?.removeEventListener("change", emit);
      mediaQuery = undefined;
    }
  };
};

export const getMobileSnapshot = (): boolean => {
  return window.matchMedia(MEDIA_QUERY).matches;
};

export const useIsMobile = () => {
  const isMobile = useSyncExternalStore(
    subscribeToMobileChanges,
    getMobileSnapshot
  );
  return isMobile;
};
