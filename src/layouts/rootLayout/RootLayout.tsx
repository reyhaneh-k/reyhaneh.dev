import { Outlet } from "@tanstack/react-router";

import { useScroll } from "@/hooks/useScroll/useScroll";
import { cn } from "@/utils/classname";

import BottomNavBar from "./components/bottomNavBar/BottomNavBar";
import TopNavbar from "./components/topNavBar/TopNavbar";

const RootLayout = () => {
  const { scrollStatus, isAtTop } = useScroll();
  const compact = !isAtTop;

  return (
    <section
      className={cn(
        "relative h-full w-full",
        "md:h-screen",
        "pt-16 md:pt-20 lg:pt-24"
      )}
    >
      <TopNavbar
        compact={compact}
        scrollStatus={scrollStatus}
        className="fixed top-0 z-3"
      />

      <Outlet />
      <BottomNavBar className="fixed inset-x-0 bottom-0 md:hidden" />
    </section>
  );
};
export { RootLayout };
