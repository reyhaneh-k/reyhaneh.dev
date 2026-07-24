import { CUSTOM_EVENTS } from "@/consts/events";
import { STORAGE_KEYS } from "@/consts/storage";
import { STORAGE_TYPES, webStorage } from "@/utils/storage";

import { THEME } from "./index.const";
const setThemeStorage = (theme: THEME) => {
  webStorage.setStorageItem(
    STORAGE_KEYS.THEME,
    theme,
    STORAGE_TYPES.LOCAL
  );
};
const getThemeStorage = () => {
  return webStorage.getStorageItem(
    STORAGE_KEYS.THEME,
    STORAGE_TYPES.LOCAL
  );
};
export const updateTheme = (theme: THEME) => {
  setThemeStorage(theme);
  const cleanup = setDataAndMeta(theme);
  notifyThemeChanged();
  return cleanup;
};

const setDataAndMeta = (theme: THEME) => {
  const handleChange = (
    e: MediaQueryListEvent | MediaQueryList
  ) => {
    if (e.matches) {
      document.documentElement.dataset.theme = THEME.DARK;
      setMetaTag();
    } else {
      document.documentElement.dataset.theme = THEME.LIGHT;
      setMetaTag();
    }
  };
  const mediaQuery = window.matchMedia(
    "(prefers-color-scheme: dark)"
  );
  switch (theme) {
    case THEME.AUTO:
      handleChange(mediaQuery);
      mediaQuery.addEventListener("change", handleChange);
      return () => {
        mediaQuery.removeEventListener(
          "change",
          handleChange
        );
      };
    case THEME.DARK:
      document.documentElement.dataset.theme = THEME.DARK;
      setMetaTag();
      break;
    case THEME.LIGHT:
      document.documentElement.dataset.theme = THEME.LIGHT;
      setMetaTag();
      break;
  }
};

export const initializeTheme = () => {
  const theme = getThemeSnapshot();
  if (!theme) {
    setThemeStorage(THEME.AUTO);
    const cl = setDataAndMeta(THEME.AUTO);
    notifyThemeChanged();
    return cl;
  }
  return setDataAndMeta(theme);
};
const notifyThemeChanged = (): void => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new Event(CUSTOM_EVENTS.THEME_CHANGED)
  );
};

export const subscribeToThemeChanges = (
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

export const getThemeSnapshot = (): THEME | null => {
  return getThemeStorage() as THEME | null;
};

const setMetaTag = () => {
  const themeColorMetaTag = document.querySelector(
    'meta[name="theme-color"]'
  );
  const backgroundColor = getComputedStyle(
    document.documentElement
  ).getPropertyValue("background-color");
  if (themeColorMetaTag) {
    themeColorMetaTag.setAttribute(
      "content",
      backgroundColor
    );
  } else {
    const metaTag = document.createElement("meta");
    metaTag.setAttribute("name", "theme-color");
    metaTag.setAttribute("content", backgroundColor);
    document.head.appendChild(metaTag);
  }
};
