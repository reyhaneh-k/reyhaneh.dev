import {
  createRootRoute,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { RootLayout as RootLayoutComponent } from "@/layouts/rootLayout/RootLayout";

const RootLayout = () => {
  return (
    <>
      <RootLayoutComponent>
        <Outlet />
      </RootLayoutComponent>
      <TanStackRouterDevtools />
    </>
  );
};

export const Route = createRootRoute({
  component: RootLayout,
});
