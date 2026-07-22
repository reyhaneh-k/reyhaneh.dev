import {
  MoonIcon,
  SunMedium,
  ArrowUpDown,
} from "lucide-react";

import { THEME } from "@/stores/theme/index.const";
export const THEME_SWITCH_ICONS = {
  [THEME.DARK]: MoonIcon,
  [THEME.AUTO]: ArrowUpDown,
  [THEME.LIGHT]: SunMedium,
};
