interface FeaturedTheme {
  background: string;
  title: string;
  body: string;
}

interface FeaturedCarouselProps {
  title: string;
  description: string;
  images: string[];
  views: number;
  publishedAt: string;
  className?: string;
}

export type { FeaturedTheme, FeaturedCarouselProps };
