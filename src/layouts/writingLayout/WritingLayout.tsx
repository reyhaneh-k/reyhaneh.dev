import { Link, useLocation } from "@tanstack/react-router";
import {
  motion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";

import { BreadCrumb } from "@/components/ui/breadCrumb/BreadCrumb";
import {
  TabsList,
  TabsRoot,
  TabsTrigger,
} from "@/components/ui/tabs/Tabs";
import { useBoundingClientRect } from "@/hooks/useBoundingClientRect/useBoundingClientRect";
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
  const targetRef = useRef<HTMLElement>(null);

  const [rect] = useBoundingClientRect(targetRef);

  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: rect
      ? [`0px ${rect.top}px`, `100% ${rect.top}px`]
      : [`0px 0px`, `100% 0px`],
  });
  const opacity = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 0]
  );

  return (
    <section
      className={cn(
        "h-full w-full space-y-8 md:space-y-12",
        "p-4 md:p-6 lg:p-8"
      )}
    >
      <motion.header
        ref={targetRef}
        className={cn(
          "flex flex-col gap-10 md:flex-row md:items-end md:justify-between md:gap-16",
          "border-border border-b pb-10"
        )}
        style={{ opacity }}
      >
        <div className="mt-6 flex max-w-3xl flex-col gap-4 md:gap-6 lg:mt-10">
          <BreadCrumb className="mb-2 md:mb-4" />
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
          <TabsList
            aria-label="Writing formats"
            className={cn("xs:gap-4 gap-0")}
          >
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
      </motion.header>

      {children}
    </section>
  );
}

export default WritingLayout;
