import { Outlet } from "@tanstack/react-router";
import { ChevronUp } from "lucide-react";
import { motion } from "motion/react";

import { SCROLL_STATUS } from "@/hooks/useScroll/index.type";
import { useScroll } from "@/hooks/useScroll/useScroll";
import { cn } from "@/utils/classname";

import BottomNavBar from "./components/bottomNavBar/BottomNavBar";
import TopNavbar from "./components/topNavBar/TopNavbar";

const RootLayout = () => {
  const { scrollStatus, isAtTop } = useScroll();
  const shouldHideNavbar =
    scrollStatus === SCROLL_STATUS.DOWN;
  return (
    <section
      className={cn(
        "relative h-full w-full",
        "md:h-screen"
      )}
    >
      <TopNavbar
        hidden={shouldHideNavbar}
        className="fixed"
      />
      <button
        aria-label="show navbar"
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
        aria-hidden={shouldHideNavbar}
        className={cn(
          "fixed top-0 left-1/2 -translate-x-1/2",
          "bg-surface rounded-b-xl p-2 px-3",
          "border-border flex items-center gap-3 border-r border-b border-l",
          "hidden cursor-pointer md:block",
          "transition-transform duration-300 ease-in-out",
          shouldHideNavbar
            ? "translate-y-0"
            : "-translate-y-full"
        )}
      >
        <ChevronUp className="text-accent size-5 animate-bounce" />
      </button>

      <motion.div
        animate={{
          paddingTop: isAtTop ? "80px" : "0px",
        }}
        transition={{ duration: 0.2 }}
      >
        <Outlet />
      </motion.div>
      <footer className="fixed inset-x-0 bottom-0 md:hidden">
        <BottomNavBar />
      </footer>
    </section>
  );
};
export { RootLayout };
