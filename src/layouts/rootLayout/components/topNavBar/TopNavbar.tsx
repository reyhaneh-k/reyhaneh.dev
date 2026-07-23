import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";

import { ThemeSwitch } from "@/components/ui/themeSwitch/ThemeSwitch";
import { SCROLL_STATUS } from "@/hooks/useScroll/index.type";
import { cn } from "@/utils/classname";

import { NAV_LINKS, ROOT_LINK } from "./index.consts";
import { type TopNavBarProps } from "./index.type";

const TopNavbar = ({
  className,
  compact,
  scrollStatus,
}: TopNavBarProps) => {
  return (
    <motion.nav
      className={cn(
        "w-full",
        "[--padding-custom:calc(4px*4)] md:[--padding-custom:calc(2px*4)] lg:[--padding-custom:calc(4px*4)]",
        "[--padding-compact:calc(4px*4)] md:[--padding-compact:calc(1px*4)] lg:[--padding-compact:calc(2px*4)]",
        className
      )}
      initial={false}
      animate={{
        padding: compact
          ? "var(--padding-compact)"
          : "var(--padding-custom)",
      }}
      transition={{
        type: "spring",
        stiffness: 120,
      }}
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 -inset-y-4 -z-1",
          "bg-canvas/30 backdrop-blur-lg",
          "mask-b-from-50% mask-b-to-100%",
          "block md:hidden"
        )}
      />
      <motion.ol
        className={cn(
          "relative flex gap-6 text-center md:gap-4 lg:gap-6",
          "md:bg-surface/30 bg-transparent",
          "md:backdrop-blur-lg md:backdrop-saturate-50",
          "items-start justify-between md:items-baseline md:justify-center",
          "w-full text-sm md:mx-auto md:w-fit md:rounded-full",
          "md:border-border border-transparent md:border",
          "md:py-4",
          "[--padding-custom:0px] md:[--padding-custom:calc(28px*4)] lg:[--padding-custom:calc(40px*4)]",
          "[--padding-compact:0px] md:[--padding-compact:calc(28px*4)] lg:[--padding-compact:calc(32px*4)]"
        )}
        animate={{
          paddingInline: compact
            ? "var(--padding-compact)"
            : "var(--padding-custom)",
        }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 20,
          mass: 0.8,
        }}
      >
        {NAV_LINKS.slice(0, 3).map((link) => (
          <li
            key={link.to}
            className={cn(
              "relative",
              "after:bg-accent after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full",
              "after:scale-x-0 after:transition-transform after:duration-100 after:ease-linear after:content-['']",
              "hover:after:scale-x-100",
              "hidden md:inline"
            )}
          >
            <Link to={link.to}>{link.label}</Link>
          </li>
        ))}
        <li
          className={cn(
            "font-display text-xl font-bold md:mx-3",
            "transition-transform duration-100 ease-linear hover:-translate-y-0.5 hover:scale-105"
          )}
        >
          <Link to={ROOT_LINK.to}>
            <span>{ROOT_LINK.label[0]}</span>
            <span className="text-accent">
              {ROOT_LINK.label[1]}
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
              "hover:after:scale-x-100",
              "hidden md:inline"
            )}
          >
            <Link to={link.to}>{link.label}</Link>
          </li>
        ))}

        <motion.div
          className={cn(
            "absolute right-0 md:top-1/2 md:right-4 md:-translate-y-1/2",
            "[--x-translate:150%] md:[--x-translate:0%]"
          )}
          animate={{
            x:
              scrollStatus === SCROLL_STATUS.DOWN
                ? "var(--x-translate)"
                : "0%",
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            bounce: 0.25,
          }}
        >
          <ThemeSwitch />
        </motion.div>
      </motion.ol>
    </motion.nav>
  );
};

export default TopNavbar;
