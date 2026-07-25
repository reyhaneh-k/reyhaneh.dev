import {
  createRootRoute,
  Outlet,
} from "@tanstack/react-router";

const RootLayout = () => {
  return (
    <>
      {/* <TanStackRouterDevtools /> */}
      <Outlet />
    </>
  );
};

export const Route = createRootRoute({
  component: RootLayout,
  staticData: {
    breadcrumb: "",
  },
});
