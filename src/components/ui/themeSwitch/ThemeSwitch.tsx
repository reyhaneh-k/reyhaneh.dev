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
      aria-label="Color theme"
      role="radiogroup"
      className={cn(
        "border-border shadow-shadow flex rounded-full border p-1 shadow-sm md:w-fit md:flex-row md:gap-1",
        "relative w-10 flex-col",
        className
      )}
    >
      <motion.div
        layout
        className={cn(
          "bg-accent absolute my-auto size-5.5 rounded-full",
          theme === THEME.LIGHT && "right-1",
          theme === THEME.DARK && "left-1",
          theme === THEME.AUTO &&
            "right-1/2 translate-x-1/2"
        )}
        transition={{
          type: "spring",
          visualDuration: 0.2,
          bounce: 0.2,
        }}
      />
      {Object.entries(THEME_SWITCH_ICONS).map(
        ([key, value]) => {
          const th = key as THEME;
          const Icon = value;
          return (
            <button
              key={th}
              aria-checked={th === theme}
              role="radio"
              className={cn(
                "text-foreground z-1 aspect-square size-5.5 cursor-pointer rounded-full transition-colors duration-100 ease-linear",
                th === theme && "text-on-accent"
              )}
              onClick={() => {
                setTheme(th);
              }}
            >
              <Icon className="m-auto size-3.75" />
            </button>
          );
        }
      )}
    </div>
  );
};

export { ThemeSwitch };
