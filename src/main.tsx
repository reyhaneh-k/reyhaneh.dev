import "@/styles/index.css"; // Vite => CSS Code Splitting => preload / prefetch
import { captureException } from "@sentry/react";
import {
  RouterProvider,
  createRouter,
} from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { initSentry } from "./providers/sentry/index.helpers";
import { SentryProvider } from "./providers/sentry/SentryProvider";
import { ThemeProvider } from "./providers/theme/ThemeProvider";
import { routeTree } from "./routeTree.gen";

const router = createRouter({ routeTree });
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
initSentry(router);

const rootElement = document.getElementById("root");
if (!rootElement) {
  captureException(new Error("Root element not found"));
  throw new Error("Root element not found");
}
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <SentryProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </SentryProvider>
    </StrictMode>
  );
}
