import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";

import { ThemeSwitch } from "@/components/ui/themeSwitch/ThemeSwitch";
import { cn } from "@/utils/classname";

import { NAV_LINKS, ROOT_LINK } from "./index.consts";
import { type TopNavBarProps } from "./index.type";

const TopNavbar = ({
  className,
  hidden,
}: TopNavBarProps) => {
  return (
    <motion.nav
      className={cn(
        "w-full",
        "p-2 pb-10 md:mb-2 md:p-5",
        "[--top-offset:0%] md:[--top-offset:-100%]",
        className
      )}
      animate={{
        y: hidden ? "var(--top-offset)" : "0%",
      }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 15,
        mass: 0.8,
        // omit bounce, or bounce: 0
      }}
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 -z-1 h-full md:hidden",
          "bg-canvas/50 backdrop-blur-md",
          "mask-b-from-50% mask-b-to-100%"
        )}
      />
      <ol
        className={cn(
          "relative flex w-fit gap-5 text-center md:gap-4 md:py-3 lg:gap-6",
          "items-start justify-between md:items-baseline md:justify-center",
          "w-full text-sm md:mx-auto md:rounded-full",
          "sm:px-0 md:px-28 lg:px-32",
          "md:bg-surface bg-transparent",
          "md:border-border border-transparent md:border"
        )}
      >
        {NAV_LINKS.slice(0, 3).map((link) => (
          <li
            key={link.href}
            className={cn(
              "relative",
              "after:bg-accent after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full",
              "after:scale-x-0 after:transition-transform after:duration-100 after:ease-linear after:content-['']",
              "hover:after:scale-x-100",
              "hidden md:inline"
            )}
          >
            <Link to={link.href}>{link.label}</Link>
          </li>
        ))}
        <li
          className={cn(
            "font-display text-xl font-bold md:mx-3",
            "transition-transform duration-100 ease-linear hover:-translate-y-0.5 hover:scale-105"
          )}
        >
          <Link to="/">
            <span>{ROOT_LINK.label[0]}</span>
            <span className="text-accent">
              {ROOT_LINK.label[1]}
            </span>
          </Link>
        </li>
        {NAV_LINKS.slice(3).map((link) => (
          <li
            key={link.href}
            className={cn(
              "relative",
              "after:bg-accent after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full",
              "after:scale-x-0 after:transition-transform after:duration-100 after:ease-linear after:content-['']",
              "hover:after:scale-x-100",
              "hidden md:inline"
            )}
          >
            <Link to={link.href}>{link.label}</Link>
          </li>
        ))}

        <motion.div
          className={cn(
            "absolute right-0 my-auto md:right-4",
            "[--x-translate:150%] md:[--x-translate:0%]"
          )}
          animate={{
            x: hidden ? "var(--x-translate)" : "0%",
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
      </ol>
    </motion.nav>
  );
};

export default TopNavbar;
