import { Link } from "@tanstack/react-router";

import { BreadCrumb } from "@/components/ui/breadCrumb/BreadCrumb";
import {
  TabsList,
  TabsRoot,
  TabsTrigger,
} from "@/components/ui/tabs/Tabs";
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
    <section
      className={cn(
        "h-full w-full space-y-4",
        "p-4 md:p-6 lg:p-8"
      )}
    >
      <BreadCrumb className="mb-4 md:mb-8" />
      <header
        className={cn(
          "flex flex-col justify-between gap-4 md:flex-row md:gap-4",
          "h-full w-full"
        )}
      >
        <div
          className={cn(
            "flex flex-col gap-4 md:gap-8",
            "h-full w-full"
          )}
        >
          <span className="text-accent text-sm uppercase">
            Writing · {writingLayoutConsts.totalPosts}{" "}
            pieces
          </span>
          <h1 className="text-4xl font-bold md:text-6xl lg:text-8xl">
            {writingLayoutConsts.title.part1},
            <br />
            {writingLayoutConsts.title.part2}
          </h1>
          <p className="text-ink-muted text-sm">
            {writingLayoutConsts.description}
          </p>
        </div>

        <TabsRoot className="self-start md:self-center">
          <TabsList className="flex flex-row gap-4 text-right md:flex-col">
            {LayoutLinks.map((link) => (
              <TabsTrigger
                aria-label={link.label}
                className="text-right"
                key={link.href}
                value={link.href}
              >
                <Link
                  aria-label={`Navigate to ${link.label}`}
                  to={link.href}
                >
                  {link.label}
                </Link>
              </TabsTrigger>
            ))}
          </TabsList>
        </TabsRoot>
      </header>
      {children}
    </section>
  );
}

export default WritingLayout;
