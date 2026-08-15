import { Link, useLocation } from "@tanstack/react-router";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";

import {
  TabsList,
  TabsRoot,
  TabsTrigger,
} from "@/components/ui/tabs/Tabs";
import { useBoundingClientRect } from "@/hooks/useBoundingClientRect/useBoundingClientRect";
import { LayoutLinks } from "@/layouts/writingLayout/index.consts";
import { getActiveTab } from "@/layouts/writingLayout/index.helpers";
import { useIsMobile } from "@/stores/mobile/mobile";
import { cn } from "@/utils/classname";

type TabValue = (typeof LayoutLinks)[number]["href"];

function ArchiveHeader({
  className,
}: {
  className?: string;
}) {
  const { pathname } = useLocation();
  const activeTab = getActiveTab(pathname);
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
    <motion.header
      ref={targetRef}
      className={cn(
        className,
        !isMobile && "border-border border-b"
      )}
      style={{ opacity }}
    >
      <div className="flex h-full flex-col flex-nowrap items-start justify-between md:flex-row md:gap-16">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeTab.label}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{
              duration: 0.22,
              ease: "easeOut",
            }}
            className="flex flex-col justify-between gap-4 md:gap-6"
          >
            <h1
              className={cn(
                "line-clamp-2 font-bold tracking-tight",
                "text-4xl md:text-5xl"
              )}
            >
              {activeTab.title.map((line, index) => (
                <span key={line}>
                  {line}
                  {index < activeTab.title.length - 1 ? (
                    <br />
                  ) : null}
                </span>
              ))}
            </h1>
            <p className="text-ink-muted line-clamp-5 max-w-md text-sm leading-relaxed md:text-base">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.22,
                  ease: "easeOut",
                }}
              >
                {activeTab.description}
              </motion.span>
            </p>
          </motion.div>
        </AnimatePresence>
        <TabsRoot<TabValue>
          value={activeTab.href}
          orientation={isMobile ? "horizontal" : "vertical"}
        >
          <TabsList
            aria-label="Writing formats"
            className={cn("xs:gap-4 gap-0")}
          >
            {LayoutLinks.map((link) => (
              <Link
                to={link.href}
                className="inline"
                key={link.href}
              >
                <TabsTrigger<TabValue> value={link.href}>
                  <span>
                    {link.label}
                    <span className="text-accent/50 ms-1 align-super text-[0.7rem] font-medium">
                      {link.badge}
                    </span>
                  </span>
                </TabsTrigger>
              </Link>
            ))}
          </TabsList>
        </TabsRoot>
      </div>
    </motion.header>
  );
}

export { ArchiveHeader };
