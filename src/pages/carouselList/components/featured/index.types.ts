interface FeaturedTheme {
  background: string;
  title: string;
  body: string;
}

interface FeaturedCarouselProps {
  id: string;
  title: string;
  description: string;
  images: string[];
  cover?: string;
  tags: string[];
  slideCount: number;
  className?: string;
}

export type { FeaturedTheme, FeaturedCarouselProps };
