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
        "border-border flex rounded-full border p-0.75 shadow-sm md:w-fit md:flex-row md:gap-1",
        "w-10 flex-col",
        className
      )}
    >
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
                "text-foreground aspect-square size-5.5 rounded-full transition-colors duration-100 ease-linear",
                th === theme && "bg-accent text-on-accent",
                ""
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
