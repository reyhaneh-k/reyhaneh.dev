import { motion } from "motion/react";

import { useTheme } from "@/hooks/useTheme/useTheme";
import { THEME } from "@/stores/theme/index.const";
import { cn } from "@/utils/classname";

import { THEME_SWITCH_ICONS } from "./index.consts";

const ThemeSwitch = ({
  className,
}: {
  className?: string;
}) => {
  const [theme, setTheme] = useTheme();

  return (
    <div
      aria-label="Select color theme"
      role="radiogroup"
      className={cn(
        "border-border shadow-shadow flex w-fit rounded-full border p-1 shadow-sm md:flex-row md:gap-1",
        "bg-surface flex-col-reverse md:bg-transparent",
        className
      )}
    >
      {Object.entries(THEME_SWITCH_ICONS).map(
        ([key, value]) => {
          const th = key as THEME;
          const Icon = value;
          const isActive = th === theme;
          return (
            <button
              key={th}
              aria-checked={th === theme}
              role="radio"
              className={cn(
                "text-foreground relative z-20 aspect-square size-5.5 cursor-pointer rounded-full transition-colors duration-100 ease-linear"
              )}
              onClick={() => {
                setTheme(th);
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="theme-switch-active"
                  className={cn(
                    "bg-accent absolute inset-0 z-0 rounded-full",
                    "shadow-shadow inset-shadow-sm"
                  )}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    bounce: 0.2,
                  }}
                />
              )}
              <Icon
                className={cn(
                  "active:text-accent absolute inset-0 z-10 m-auto size-3.75",
                  th === theme && "text-on-accent"
                )}
              />
            </button>
          );
        }
      )}
    </div>
  );
};

export { ThemeSwitch };
