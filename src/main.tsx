import { captureException } from "@sentry/react";
import {
  RouterProvider,
  createRouter,
} from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { initSentry } from "./providers/sentry/index.helpers";
import { SentryProvider } from "./providers/sentry/SentryProvider";
import { routeTree } from "./routeTree.gen";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
// Initialize Sentry
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
        <RouterProvider router={router} />
      </SentryProvider>
    </StrictMode>
  );
}
