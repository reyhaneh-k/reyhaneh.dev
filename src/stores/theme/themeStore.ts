import {
  useEffect,
  useRef,
  useSyncExternalStore,
} from "react";

import { CUSTOM_EVENTS } from "@/consts/events";
import { STORAGE_KEYS } from "@/consts/storage";
import { STORAGE_TYPES, webStorage } from "@/utils/storage";

import { Theme } from "./index.const";

//TODO: add window safegurads, add try-catch, sentry captures
const updateTheme = (theme: Theme) => {
  webStorage.setStorageItem(
    STORAGE_KEYS.THEME,
    theme,
    STORAGE_TYPES.LOCAL
  );
  const cleanup = setDataAttribute(theme);
  notifyThemeChanged();
  return cleanup;
};

const setDataAttribute = (theme: Theme) => {
  const handleChange = (
    e: MediaQueryListEvent | MediaQueryList
  ) => {
    if (e.matches) {
      document.documentElement.dataset.theme = Theme.DARK;
    } else {
      document.documentElement.dataset.theme = Theme.LIGHT;
    }
  };
  const mediaQuery = window.matchMedia(
    "(prefers-color-scheme: dark)"
  );
  switch (theme) {
    case Theme.AUTO:
      handleChange(mediaQuery);
      mediaQuery.addEventListener("change", handleChange);
      return () => {
        mediaQuery.removeEventListener(
          "change",
          handleChange
        );
      };
    case Theme.DARK:
      document.documentElement.dataset.theme = Theme.DARK;
      break;
    case Theme.LIGHT:
      document.documentElement.dataset.theme = Theme.LIGHT;
      break;
  }
};

const initializeTheme = () => {
  const theme = getThemeSnapshot();
  if (!theme) {
    webStorage.setStorageItem(
      STORAGE_KEYS.THEME,
      Theme.AUTO,
      STORAGE_TYPES.LOCAL
    );
    notifyThemeChanged();
    return setDataAttribute(Theme.AUTO);
  }
  return setDataAttribute(theme);
};
const notifyThemeChanged = (): void => {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new Event(CUSTOM_EVENTS.THEME_CHANGED)
  );
};

const subscribeToThemeChanges = (
  onStoreChange: () => void
): (() => void) => {
  window.addEventListener(
    CUSTOM_EVENTS.THEME_CHANGED,
    onStoreChange
  );
  return () => {
    window.removeEventListener(
      CUSTOM_EVENTS.THEME_CHANGED,
      onStoreChange
    );
  };
};

const getThemeSnapshot = (): Theme | null => {
  return webStorage.getStorageItem(
    STORAGE_KEYS.THEME,
    STORAGE_TYPES.LOCAL
  ) as Theme | null;
};
const useTheme: () => {
  theme: Theme | null;
  setTheme: (theme: Theme) => void;
} = () => {
  const cleanupRef = useRef<(() => void) | undefined>(
    undefined
  );

  const theme = useSyncExternalStore(
    subscribeToThemeChanges,
    getThemeSnapshot
  );
  const setTheme = (theme: Theme) => {
    cleanupRef.current?.();
    const cl = updateTheme(theme);
    cleanupRef.current = cl;
  };

  useEffect(() => {
    cleanupRef.current = initializeTheme();
    return () => cleanupRef.current?.();
  }, []);
  return { theme, setTheme };
};

export { useTheme };
