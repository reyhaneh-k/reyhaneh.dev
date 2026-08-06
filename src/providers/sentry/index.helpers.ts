import {
  browserTracingIntegration,
  feedbackIntegration,
  init,
  replayIntegration,
  tanstackRouterBrowserTracingIntegration,
} from "@sentry/react";

import { config } from "@/consts/config";

function initSentry(router: unknown) {
  init({
    enabled: config.mode === "production",
    dsn: import.meta.env.VITE_SENTRY_DSN,
    dataCollection: {
      // To disable sending user data and HTTP bodies, uncomment the lines below. For more info visit:
      // https://docs.sentry.io/platforms/javascript/guides/react/configuration/options/#dataCollection
      // userInfo: false,
      // httpBodies: [],
    },
    integrations: [
      // If you're using react router, use the integration for your react router version instead.
      // Learn more at
      // https://docs.sentry.io/platforms/javascript/guides/react/configuration/integrations/react-router/
      browserTracingIntegration(),
      replayIntegration(),
      feedbackIntegration({
        // Additional SDK configuration goes in here, for example:
        colorScheme: "system",
      }),
      tanstackRouterBrowserTracingIntegration(router),
    ],
    // Enable logs to be sent to Sentry
    enableLogs: true,
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for tracing.
    // Learn more at
    // https://docs.sentry.io/platforms/javascript/configuration/options/#traces-sample-rate
    tracesSampleRate: 1.0,
    // Set `tracePropagationTargets` to control for which URLs trace propagation should be enabled
    tracePropagationTargets: [
      /^\//,
      /^https:\/\/yourserver\.io\/api/,
    ],
    // Capture Replay for 10% of all sessions,
    // plus for 100% of sessions with an error
    // Learn more at
    // https://docs.sentry.io/platforms/javascript/session-replay/configuration/#general-integration-configuration
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });
}

export { initSentry };
