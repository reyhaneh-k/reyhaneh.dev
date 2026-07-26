import { Link, useLocation } from "@tanstack/react-router";
import { motion } from "motion/react";

import { ThemeSwitch } from "@/components/ui/themeSwitch/ThemeSwitch";
import { SCROLL_STATUS } from "@/hooks/useScroll/index.type";
import { cn } from "@/utils/classname";

import {
  NAV_LINKS,
  ROOT_LINK,
  SPRING,
} from "./index.consts";
import { type TopNavBarProps } from "./index.type";

const TopNavbar = ({
  className,
  compact,
  scrollStatus,
}: TopNavBarProps) => {
  const { pathname } = useLocation();
  return (
    <motion.nav
      layoutRoot
      className={cn(
        "fixed mx-0 md:mx-auto",
        "h-fit bg-transparent md:w-fit md:rounded-full",
        "[--offset-custom:calc(0px*4)] md:[--offset-custom:calc(2px*4)] lg:[--offset-custom:calc(4px*4)]",
        "[--offset-compact:calc(0px*4)] md:[--offset-compact:calc(1px*4)] lg:[--offset-compact:calc(2px*4)]",
        className
      )}
      initial={{
        inset: compact
          ? "var(--offset-compact)"
          : "var(--offset-custom)",
      }}
      animate={{
        inset: compact
          ? "var(--offset-compact)"
          : "var(--offset-custom)",
      }}
      transition={SPRING}
    >
      <motion.ol
        className={cn(
          "relative flex gap-6 text-center md:gap-4 lg:gap-6",
          "md:bg-surface/30 bg-transparent",
          "md:backdrop-blur-lg md:backdrop-saturate-50",
          "items-start justify-between md:items-baseline md:justify-center",
          "w-full text-sm md:mx-auto md:w-fit md:rounded-full",
          "md:border-border border-transparent md:border",
          "[--padding-custom:calc(3px*4)] md:[--padding-custom:calc(28px*4)] lg:[--padding-custom:calc(40px*4)]",
          "[--padding-compact:calc(3px*4)] md:[--padding-compact:calc(28px*4)] lg:[--padding-compact:calc(32px*4)]",
          "[--scale-compact:1] md:[--scale-compact:0.95] lg:[--scale-compact:1]",
          "pt-4 pb-10 md:py-4"
        )}
        initial={{
          scale: compact ? "var(--scale-compact)" : 1,
          paddingInline: compact
            ? "var(--padding-compact)"
            : "var(--padding-custom)",
        }}
        animate={{
          scale: compact ? "var(--scale-compact)" : 1,
          paddingInline: compact
            ? "var(--padding-compact)"
            : "var(--padding-custom)",
        }}
        transition={SPRING}
      >
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 -z-1",
            "bg-canvas/50 backdrop-blur-sm backdrop-saturate-50",
            "mask-b-from-50% mask-b-to-100%",
            "block md:hidden"
          )}
        />
        {NAV_LINKS.slice(0, 3).map((link) => (
          <li
            key={link.to}
            className={cn(
              "relative",
              "after:bg-accent after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full",
              "after:scale-x-0 after:transition-transform after:duration-100 after:ease-linear after:content-['']",
              "hover:after:scale-x-100 active:after:scale-x-100",
              "hidden transition-colors md:inline",
              pathname === link.to && "text-accent"
            )}
          >
            <Link to={link.to}>{link.label}</Link>
          </li>
        ))}
        <li
          className={cn(
            "font-display text-xl font-bold md:mx-3",
            "transition-transform duration-100 ease-linear md:hover:-translate-y-0.5",
            "hover:scale-105 active:scale-105"
          )}
        >
          <Link
            to={ROOT_LINK.to}
            className={cn("flex items-center gap-2")}
          >
            <span>
              <span>{ROOT_LINK.label[0]}</span>
              <span className="text-accent">
                {ROOT_LINK.label[1]}
              </span>
            </span>
          </Link>
        </li>
        {NAV_LINKS.slice(3).map((link) => (
          <li
            key={link.to}
            className={cn(
              "relative",
              "after:bg-accent after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full",
              "after:scale-x-0 after:transition-transform after:duration-100 after:ease-linear after:content-['']",
              "hover:after:scale-x-100 active:after:scale-x-100",
              "hidden transition-colors md:inline",
              pathname === link.to && "text-accent"
            )}
          >
            <Link to={link.to}>{link.label}</Link>
          </li>
        ))}
        <motion.li
          className={cn(
            "absolute right-3 md:top-1/2 md:right-4 md:-translate-y-1/2",
            "[--x-translate:150%] md:[--x-translate:0%]"
          )}
          initial={{
            x: "0%",
          }}
          animate={{
            x:
              scrollStatus === SCROLL_STATUS.DOWN
                ? "var(--x-translate)"
                : "0%",
          }}
          transition={SPRING}
        >
          <ThemeSwitch />
        </motion.li>
      </motion.ol>
    </motion.nav>
  );
};

export default TopNavbar;
