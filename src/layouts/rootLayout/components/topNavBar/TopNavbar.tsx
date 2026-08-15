import { Link, useLocation } from "@tanstack/react-router";
import { motion } from "motion/react";

import { ThemeSwitch } from "@/components/ui/themeSwitch/ThemeSwitch";
import { SCROLL_STATUS } from "@/hooks/useScroll/index.type";
import { cn } from "@/utils/classname";
import { isSameOrNestedPath } from "@/utils/path";

import {
  NAV_LINKS,
  ROOT_LINK,
  SPRING,
} from "./index.consts";
import { type TopNavBarProps } from "./index.type";

function navLinkClassName(isActive: boolean) {
  return cn(
    "relative",
    "after:bg-accent after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full",
    "after:scale-x-0 after:transition-transform after:duration-100 after:ease-linear after:content-['']",
    "hover:after:scale-x-100 active:after:scale-x-100",
    "transition-colors",
    isActive && "text-accent"
  );
}

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
        "fixed z-100 mx-0 md:mx-auto",
        "h-fit bg-transparent md:w-fit md:rounded-full",
        "[--offset-custom:calc(0px*4)] md:[--offset-custom:calc(3px*4)] lg:[--offset-custom:calc(4px*4)]",
        "[--offset-compact:calc(0px*4)] md:[--offset-compact:calc(2px*4)] lg:[--offset-compact:calc(3px*4)]",
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
      <motion.div
        className={cn(
          "relative grid items-center text-center",
          "grid-cols-1 md:grid-cols-[repeat(3,minmax(0,1fr))_auto_repeat(3,minmax(0,1fr))]",
          "gap-x-4 md:gap-x-6",
          "md:bg-surface/30 bg-transparent",
          "md:backdrop-blur-lg md:backdrop-saturate-50",
          "w-full text-sm md:mx-auto md:w-fit md:rounded-full",
          "md:border-border border-transparent md:border",
          "[--padding-custom:calc(3px*4)] md:[--padding-custom:calc(32px*4)] lg:[--padding-custom:calc(40px*4)]",
          "[--padding-compact:calc(3px*4)] md:[--padding-compact:calc(30px*4)] lg:[--padding-compact:calc(32px*4)]",
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
        <section
          aria-label="Primary"
          className="col-span-3 hidden grid-cols-subgrid items-center justify-items-end md:grid"
        >
          <ol className="contents">
            {NAV_LINKS.slice(0, 3).map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={navLinkClassName(
                    isSameOrNestedPath(pathname, link.to)
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ol>
        </section>
        <div
          className={cn(
            "font-display col-span-full justify-self-start text-xl leading-normal font-bold md:col-span-1 md:justify-self-center md:px-3",
            "transition-transform duration-100 ease-linear md:hover:-translate-y-0.5",
            "hover:scale-105 active:scale-105"
          )}
        >
          <Link
            to={ROOT_LINK.to}
            className="flex items-center gap-2"
          >
            <span>
              <span>{ROOT_LINK.label[0]}</span>
              <span className="text-accent">
                {ROOT_LINK.label[1]}
              </span>
            </span>
          </Link>
        </div>
        <section
          aria-label="Secondary"
          className="col-span-3 hidden grid-cols-subgrid items-center justify-items-center md:grid"
        >
          <ol className="contents">
            {NAV_LINKS.slice(3).map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={navLinkClassName(
                    pathname === link.to
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ol>
        </section>
        <motion.div
          className={cn(
            "absolute max-md:top-3 max-md:right-3 md:top-1/2 md:right-4 md:-translate-y-1/2",
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
        </motion.div>
      </motion.div>
    </motion.nav>
  );
};

export default TopNavbar;
