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
        "flex flex-col gap-4",
        "h-full w-full",
        "p-4 md:p-6 lg:p-8"
      )}
    >
      <BreadCrumb />
      <div className="flex items-center gap-2">
        {" "}
        {LayoutLinks.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className="text-muted-foreground hover:text-primary text-sm"
          >
            {link.label}
          </Link>
        ))}{" "}
      </div>
      <span className="text-muted-foreground text-sm">
        Writing · {writingLayoutConsts.totalPosts} pieces
      </span>
      <h1 className="text-2xl font-bold">
        {writingLayoutConsts.title}
      </h1>
      <p className="text-muted-foreground text-sm">
        {writingLayoutConsts.description}
      </p>
      {children}
    </article>
  );
}

export default WritingLayout;
