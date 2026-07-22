import { useContext } from "react";

import { ThemeContext } from "@/providers/theme/ThemeProvider";

const useTheme = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  return [theme, setTheme] as const;
};

export { useTheme };
