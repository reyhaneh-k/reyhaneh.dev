import { Outlet } from "@tanstack/react-router";

import BottomNavBar from "./components/bottomNavBar/BottomNavBar";
import TopNavbar from "./components/topNavBar/TopNavbar";

const RootLayout = () => {
  return (
    <section className="relative h-full w-full">
      <TopNavbar />
      <Outlet />
      <footer className="fixed inset-x-0 bottom-0 h-fit md:hidden">
        <BottomNavBar />
      </footer>
    </section>
  );
};
export { RootLayout };
