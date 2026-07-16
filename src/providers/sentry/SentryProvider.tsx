import { ErrorBoundary, Profiler } from "@sentry/react";
import { ReactNode } from "react";
function SentryProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ErrorBoundary>
      <Profiler name="SentryProvider" updateProps={{}}>
        {children}
      </Profiler>
    </ErrorBoundary>
  );
}

export { SentryProvider };
