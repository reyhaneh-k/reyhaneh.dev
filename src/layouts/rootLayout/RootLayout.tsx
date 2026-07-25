import { Outlet } from "@tanstack/react-router";
import { motion, useScroll } from "motion/react";

import { useScrollIndications } from "@/hooks/useScroll/useScroll";
import { cn } from "@/utils/classname";

import BottomNavBar from "./components/bottomNavBar/BottomNavBar";
import TopNavbar from "./components/topNavBar/TopNavbar";

const RootLayout = () => {
  const { scrollStatus, isAtTop } = useScrollIndications();
  const { scrollYProgress } = useScroll();
  const compact = !isAtTop;
  return (
    <section
      className={cn(
        "relative h-full w-full",
        "pt-16 md:pt-20 lg:pt-24",
        "bg-atmosphere"
      )}
    >
      <motion.div
        aria-hidden
        className="bg-accent fixed inset-x-0 top-0 z-40 h-1 w-full"
        style={{ scaleX: scrollYProgress, originX: 0 }}
      />
      <TopNavbar
        compact={compact}
        scrollStatus={scrollStatus}
        className="fixed z-3"
      />

      <Outlet />
      <BottomNavBar className="fixed inset-x-0 bottom-0 z-3 md:hidden" />
    </section>
  );
};
export { RootLayout };
