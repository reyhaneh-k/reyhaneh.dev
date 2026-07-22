import { Link } from "@tanstack/react-router";

import { cn } from "@/utils/classname";

import NAV_LINKS from "./index.consts";

const Navbar = () => {
  return (
    <nav>
      <ol
        className={cn(
          "mx-auto flex w-fit items-center justify-center gap-4 px-8 py-4 text-center",
          "rounded-full",
          "text-12 font-sans",
          "bg-coral-300"
        )}
      >
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <Link to={link.href}>{link.label}</Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Navbar;
