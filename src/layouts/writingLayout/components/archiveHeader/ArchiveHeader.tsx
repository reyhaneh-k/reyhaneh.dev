import { Link } from "@tanstack/react-router";
import {
  AnimatePresence,
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

import { LayoutLinks } from "../../index.consts";
import { useActiveWritingTab } from "../../index.helpers";

type TabValue = (typeof LayoutLinks)[number]["href"];

function ArchiveHeader() {
  const activeTab = useActiveWritingTab();
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
        "mt-6 flex h-64 flex-col gap-4 md:gap-6 lg:mt-10 lg:h-72",
        !isMobile && "border-border border-b"
      )}
      style={{ opacity }}
    >
      <BreadCrumb />
      <div className="flex flex-col items-start gap-10 md:flex-row md:justify-between md:gap-16">
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
            className="flex flex-col gap-4 md:gap-6"
          >
            <h1
              className={cn(
                "leading-[0.95] font-bold tracking-tight",
                activeTab.title.length > 1
                  ? "text-4xl md:text-6xl lg:text-7xl"
                  : "text-4xl md:text-6xl lg:text-8xl"
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
            <p className="text-ink-muted max-w-md text-sm leading-relaxed md:text-base">
              {activeTab.description}
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
