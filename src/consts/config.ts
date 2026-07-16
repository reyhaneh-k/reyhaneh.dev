type Mode = "development" | "production";

interface Config {
  projectName: string;
  appTitle: string;
  mode: Mode;
  sentryDsn: string;
}

export const config: Config = {
  projectName: "reyhanehdotdev",
  appTitle: "Reyhaneh Dot Dev",
  mode: import.meta.env.MODE as Mode,
  sentryDsn: import.meta.env.VITE_SENTRY_DSN,
} as const;
