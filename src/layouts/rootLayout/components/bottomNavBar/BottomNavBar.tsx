import { Link } from "@tanstack/react-router";

import { cn } from "@/utils/classname";

import { NAV_LINKS } from "./index.consts";
import { type BottomNavBarProps } from "./index.type";
const BottomNavBar = ({ className }: BottomNavBarProps) => {
  return (
    <nav className={cn("w-full", className)}>
      <ol
        className={cn(
          "flex w-full gap-6 self-center px-8 py-3 text-center",
          "items-center justify-center",
          "mx-auto w-full rounded-t-2xl border text-sm",
          "bg-surface border-border"
        )}
      >
        {NAV_LINKS.map((link) => {
          const Icon = link.icon;
          return (
            <li
              key={link.to}
              className={cn(
                "relative",
                "after:bg-accent after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full",
                "after:scale-x-0 after:transition-transform after:duration-100 after:ease-linear after:content-['']",
                "hover:after:scale-x-100"
              )}
            >
              <Link
                to={link.to}
                className="flex items-center gap-2"
              >
                <Icon className="xs:size-4 size-4" />
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BottomNavBar;
