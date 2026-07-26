import { MoonIcon, ArrowUpDown, Sun } from "lucide-react";

import { THEME } from "@/stores/theme/index.const";
export const THEME_SWITCH_ICONS = {
  [THEME.LIGHT]: Sun,
  [THEME.AUTO]: ArrowUpDown,
  [THEME.DARK]: MoonIcon,
};
