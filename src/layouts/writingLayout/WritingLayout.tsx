import { Link, useLocation } from "@tanstack/react-router";

import { BreadCrumb } from "@/components/ui/breadCrumb/BreadCrumb";
import {
  TabsList,
  TabsRoot,
  TabsTrigger,
} from "@/components/ui/tabs/Tabs";
import { useIsMobile } from "@/stores/mobile/mobile";
import { cn } from "@/utils/classname";

import {
  LayoutLinks,
  writingLayoutConsts,
} from "./index.consts";

type TabValue = (typeof LayoutLinks)[number]["href"];

function WritingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { pathname } = useLocation();
  const activeValue = LayoutLinks.find(
    (link) => link.href === pathname
  );
  const isMobile = useIsMobile();

  return (
    <section
      className={cn(
        "h-full w-full space-y-8 md:space-y-12",
        "p-4 md:p-6 lg:p-8"
      )}
    >
      <BreadCrumb className="mb-2 md:mb-4" />

      <header
        className={cn(
          "flex flex-col gap-10 md:flex-row md:items-end md:justify-between md:gap-16"
        )}
      >
        <div className="mt-6 flex max-w-3xl flex-col gap-4 md:gap-6 lg:mt-10">
          <h1 className="text-4xl leading-[0.95] font-bold tracking-tight md:text-6xl lg:text-8xl">
            {writingLayoutConsts.title.part1},
            <br />
            {writingLayoutConsts.title.part2}
          </h1>
          <p className="text-ink-muted max-w-md text-sm leading-relaxed md:text-base">
            {writingLayoutConsts.description}
          </p>
        </div>

        <TabsRoot<TabValue>
          value={activeValue?.href}
          orientation={isMobile ? "horizontal" : "vertical"}
        >
          <TabsList aria-label="Writing formats">
            {LayoutLinks.map((link) => (
              <TabsTrigger<TabValue>
                key={link.href}
                value={link.href}
              >
                <Link to={link.href} className="inline">
                  {link.label}
                  <span className="text-accent/50 ms-1 align-super text-[0.7rem] font-medium">
                    {link.badge}
                  </span>
                </Link>
              </TabsTrigger>
            ))}
          </TabsList>
        </TabsRoot>
      </header>

      <div className="min-h-0 flex-1">{children}</div>
    </section>
  );
}

export default WritingLayout;
