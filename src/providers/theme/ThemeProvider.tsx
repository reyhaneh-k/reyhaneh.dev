import {
  createContext,
  useCallback,
  useLayoutEffect,
  useRef,
  useSyncExternalStore,
} from "react";

import { Theme } from "@/stores/theme/index.const";
import {
  subscribeToThemeChanges,
  getThemeSnapshot,
  updateTheme,
  initializeTheme,
} from "@/stores/theme/themeStore";

export const ThemeContext = createContext<{
  theme: Theme | null;
  setTheme: (theme: Theme) => void;
}>({
  theme: null,
  setTheme: () => {
    return;
  },
});
const ThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const cleanupRef = useRef<(() => void) | undefined>(
    undefined
  );
  const theme = useSyncExternalStore(
    subscribeToThemeChanges,
    getThemeSnapshot
  );
  const setTheme = useCallback((theme: Theme) => {
    cleanupRef.current?.();
    const cl = updateTheme(theme);
    cleanupRef.current = cl;
  }, []);
  useLayoutEffect(() => {
    cleanupRef.current = initializeTheme();
    return () => cleanupRef.current?.();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider };
