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
        "bg-surface relative flex-col-reverse md:bg-transparent",
        className
      )}
    >
      <motion.div
        layout
        className={cn(
          "bg-accent absolute my-auto size-5.5 rounded-full",
          theme === THEME.LIGHT && "top-1 md:right-1",
          theme === THEME.DARK && "bottom-1 md:left-1",
          theme === THEME.AUTO &&
            "bottom-1/2 translate-y-1/2 md:right-1/2 md:translate-x-1/2"
        )}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
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
