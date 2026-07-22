import { Outlet } from "@tanstack/react-router";

import Navbar from "./components/navbar/Navbar";

const RootLayout = () => {
  return (
    <section className="h-full w-full p-5">
      <Navbar />
      <Outlet />
    </section>
  );
};
export { RootLayout };
