import { Link } from "@tanstack/react-router";

import { BreadCrumb } from "@/components/ui/breadCrumb/BreadCrumb";
import { cn } from "@/utils/classname";

import {
  LayoutLinks,
  writingLayoutConsts,
} from "./index.consts";

function WritingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <article
      className={cn(
        "flex flex-col gap-4 md:gap-8",
        "h-full w-full",
        "p-4 md:p-6 lg:p-8"
      )}
    >
      <BreadCrumb className="mb-4 md:mb-8" />

      <span className="text-accent text-sm uppercase">
        Writing · {writingLayoutConsts.totalPosts} pieces
      </span>
      <h1 className="text-4xl font-bold md:text-6xl lg:text-8xl">
        {writingLayoutConsts.title.part1},
        <br />
        {writingLayoutConsts.title.part2}
      </h1>
      <p className="text-ink-muted text-sm">
        {writingLayoutConsts.description}
      </p>
      <div className="flex items-center gap-2">
        {LayoutLinks.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className="text-muted-foreground hover:text-primary text-sm"
          >
            {link.label}
          </Link>
        ))}
      </div>
      {children}
    </article>
  );
}

export default WritingLayout;
