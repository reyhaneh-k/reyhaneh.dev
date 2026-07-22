import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";

import { ThemeSwitch } from "@/components/ui/themeSwitch/ThemeSwitch";
import { useScroll } from "@/hooks/useScroll/useScroll";
import { cn } from "@/utils/classname";

import { NAV_LINKS, ROOT_LINK } from "./index.consts";
const TopNavbar = () => {
  const { hasScrolled } = useScroll();
  return (
    <nav
      className={cn(
        "fixed top-0 w-full md:static",
        "p-2 pb-3 md:p-5"
      )}
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 -z-10 h-full md:hidden",
          "bg-canvas/50 backdrop-blur-md",
          "mask-[linear-gradient(to_bottom,black_0%,black_45%,transparent_100%)]",
          "[-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_45%,transparent_100%)]"
        )}
      />
      <motion.ol
        data-should-hide={hasScrolled}
        className={cn(
          "group",
          "relative flex w-fit gap-5 text-center md:gap-4 md:py-3 lg:gap-6",
          "items-start justify-between md:items-center md:justify-center",
          "w-full text-sm md:mx-auto md:rounded-full",
          "sm:px-0 md:px-28 lg:px-32",
          "md:bg-surface bg-transparent",
          "md:border-border border-transparent md:border",
          "md:data-[should-hide=true]:translate-y-[-200%]"
        )}
        layout
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          bounce: 0.25,
        }}
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

        <ThemeSwitch
          className={cn(
            "absolute right-0 my-auto transition-transform duration-100 ease-in-out md:right-4",
            "group-data-[should-hide=true]:translate-x-[200%]"
          )}
        />
      </motion.ol>
    </nav>
  );
};

export default TopNavbar;
