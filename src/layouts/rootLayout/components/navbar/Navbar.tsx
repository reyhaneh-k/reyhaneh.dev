import { Link } from "@tanstack/react-router";

import { ThemeSwitch } from "@/components/ui/themeSwitch/ThemeSwitch";
import { cn } from "@/utils/classname";

import { NAV_LINKS, ROOT_LINK } from "./index.consts";
const Navbar = () => {
  return (
    <nav>
      <ol
        className={cn(
          "self-cente relative flex w-fit items-center justify-center gap-5 py-3 text-center lg:gap-6",
          "border-border bg-surface mx-auto rounded-full border",
          "sm:px-8 md:px-28 lg:px-32",
          "text-sm"
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
              "md:vible hidden"
            )}
          >
            <Link to={link.href}>{link.label}</Link>
          </li>
        ))}
        <li
          className={cn(
            "font-display mx-3 text-xl font-bold",
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
              "hover:after:scale-x-100"
            )}
          >
            <Link to={link.href}>{link.label}</Link>
          </li>
        ))}
        <ThemeSwitch className="absolute right-4 my-auto" />
      </ol>
    </nav>
  );
};

export default Navbar;
