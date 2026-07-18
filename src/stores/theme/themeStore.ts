import {
  useEffect,
  useRef,
  useSyncExternalStore,
} from "react";

import { CUSTOM_EVENTS } from "@/consts/events";
import { STORAGE_KEYS } from "@/consts/storage";

import { Theme } from "./index.const";

//TODO: add window safegurads, add try-catch, sentry captures
const updateTheme = (theme: Theme) => {
  let cleanup = null;
  localStorage.setItem(STORAGE_KEYS.THEME, theme);
  if (theme === Theme.AUTO) {
    cleanup = getSystemTheme();
  } else {
    document.documentElement.dataset.theme = theme;
  }
  notifyThemeChanged();
  return cleanup;
};

const getSystemTheme = () => {
  const mediaQuery = window.matchMedia(
    "(prefers-color-scheme: dark)"
  );
  const handleChange = (
    e: MediaQueryListEvent | MediaQueryList
  ) => {
    if (e.matches) {
      document.documentElement.dataset.theme = Theme.DARK;
    } else {
      document.documentElement.dataset.theme = Theme.LIGHT;
    }
  };
  mediaQuery.addEventListener("change", handleChange);
  handleChange(mediaQuery);

  return () => {
    mediaQuery.removeEventListener("change", handleChange);
  };
};

const initializeTheme = () => {
  const theme = getThemeSnapshot();
  if (!theme) {
    localStorage.setItem(STORAGE_KEYS.THEME, Theme.AUTO);
    notifyThemeChanged();
  }
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
  return localStorage.getItem(
    STORAGE_KEYS.THEME
  ) as Theme | null;
};
const useTheme: () => {
  theme: Theme | null;
  setTheme: (theme: Theme) => void;
} = () => {
  const cleanupRef = useRef<(() => void) | null>(null);

  const theme = useSyncExternalStore(
    subscribeToThemeChanges,
    getThemeSnapshot
  );
  const setTheme = (theme: Theme) => {
    const cl = updateTheme(theme);
    cleanupRef.current = cl;
  };

  useEffect(() => {
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, []);
  return { theme, setTheme };
};

export { useTheme, initializeTheme };
