interface FeaturedThemeColors {
  background: string;
  title: string;
  body: string;
}

interface FeaturedThemeWorkerRequest {
  id: number;
  url: string;
}

interface FeaturedThemeWorkerResponse {
  id: number;
  theme: FeaturedThemeColors | null;
  error?: string;
}

export type {
  FeaturedThemeColors,
  FeaturedThemeWorkerRequest,
  FeaturedThemeWorkerResponse,
};
