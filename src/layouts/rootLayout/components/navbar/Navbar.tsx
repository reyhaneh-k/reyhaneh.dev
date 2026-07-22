import { Link } from "@tanstack/react-router";

import { cn } from "@/utils/classname";

import { NAV_LINKS, ROOT_LINK } from "./index.consts";

const Navbar = () => {
  return (
    <nav>
      <ol
        className={cn(
          "mx-auto flex w-fit items-center justify-center gap-6 px-32 py-4 text-center",
          "border-border rounded-full border bg-white",
          "text-sm"
        )}
      >
        {NAV_LINKS.slice(0, 3).map((link) => (
          <li key={link.href}>
            <Link to={link.href}>{link.label}</Link>
          </li>
        ))}
        <li className="font-display mx-3 text-xl font-bold">
          <Link to="/">
            <span>{ROOT_LINK.label[0]}</span>
            <span className="text-coral-500">
              {ROOT_LINK.label[1]}
            </span>
          </Link>
        </li>
        {NAV_LINKS.slice(3).map((link) => (
          <li key={link.href}>
            <Link to={link.href}>{link.label}</Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Navbar;
