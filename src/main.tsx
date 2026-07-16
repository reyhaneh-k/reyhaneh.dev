import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "@/App.tsx";

import { SentryProvider } from "./providers/sentry/SentryProvider";
const root = document.getElementById("root");
if (!root) {
  throw new Error("Root element not found");
}
createRoot(root).render(
  <StrictMode>
    <SentryProvider>
      <App />
    </SentryProvider>
  </StrictMode>
);
