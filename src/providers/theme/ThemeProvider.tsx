import {
  createContext,
  useCallback,
  useLayoutEffect,
  useRef,
  useSyncExternalStore,
} from "react";

import { THEME } from "@/stores/theme/index.const";
import {
  subscribeToThemeChanges,
  getThemeSnapshot,
  updateTheme,
  initializeTheme,
} from "@/stores/theme/themeStore";

export const ThemeContext = createContext<{
  theme: THEME;
  setTheme: (theme: THEME) => void;
}>({
  theme: THEME.AUTO,
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
  const theme = useSyncExternalStore<THEME | null>(
    subscribeToThemeChanges,
    getThemeSnapshot
  );
  const setTheme = useCallback((theme: THEME) => {
    cleanupRef.current?.();
    const cl = updateTheme(theme);
    cleanupRef.current = cl;
  }, []);
  useLayoutEffect(() => {
    cleanupRef.current = initializeTheme();
    return () => cleanupRef.current?.();
  }, []);

  return (
    <ThemeContext
      value={{ theme: theme ?? THEME.AUTO, setTheme }}
    >
      {children}
    </ThemeContext>
  );
};

export { ThemeProvider };
