import {
  createRootRoute,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { Theme } from "@/stores/theme/index.const";
import {
  initializeTheme,
  useTheme,
} from "@/stores/theme/themeStore";

const RootLayout = () => {
  initializeTheme();
  const { theme, setTheme } = useTheme();

  return (
    <>
      <div className="flex items-center gap-2 border-b border-border p-2 ">
        <Link
          to="/"
          className="text-foreground hover:text-accent [&.active]:font-bold"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="text-foreground hover:text-accent [&.active]:font-bold "
        >
          About
        </Link>
        <select
          value={theme ?? undefined}
          onChange={(e) => {
            setTheme(e.target.value as Theme);
          }}
          className="ml-auto rounded-md border border-border px-2 py-1 text-sm text-muted hover:border-accent-2 hover:text-foreground"
        >
          <option value={Theme.LIGHT}>Light</option>
          <option value={Theme.DARK}>Dark</option>
          <option value={Theme.AUTO}>Auto</option>
        </select>
      </div>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
};

export const Route = createRootRoute({
  component: RootLayout,
});
