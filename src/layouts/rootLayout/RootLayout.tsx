import { Outlet } from "@tanstack/react-router";

import { SCROLL_STATUS } from "@/hooks/useScroll/index.type";
import { useScroll } from "@/hooks/useScroll/useScroll";

import BottomNavBar from "./components/bottomNavBar/BottomNavBar";
import TopNavbar from "./components/topNavBar/TopNavbar";

const RootLayout = () => {
  const { scrollStatus } = useScroll();

  return (
    <section className="relative h-full w-full">
      <TopNavbar
        hidden={scrollStatus === SCROLL_STATUS.DOWN}
        className="fixed"
      />
      <div
      // data-push-down={scrollStatus !== SCROLL_STATUS.DOWN}
      // className="data-[push-down=true]:pt-40"
      >
        <Outlet />
      </div>
      <footer className="fixed inset-x-0 bottom-0 h-fit md:hidden">
        <BottomNavBar />
      </footer>
    </section>
  );
};
export { RootLayout };
