type WritingKind = "article" | "post" | "carousel";

interface WritingBodyBlock {
  type:
    "paragraph" | "heading" | "quote" | "code" | "image";
  text: string;
}

interface ArticleRecord {
  id: string;
  kind: "article";
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  listed: boolean;
  featured?: boolean;
  layout?: "featured" | "tall" | "wide";
  cover: string;
  inlineImage?: string;
  caption?: string;
  body: WritingBodyBlock[];
}

interface PostRecord {
  id: string;
  kind: "post";
  title: string;
  excerpt: string;
  date: string;
  views: number;
  readTime: string;
  listed: boolean;
  draft?: boolean;
  category?: string;
  cover?: string;
  caption?: string;
  snippet?: string;
  body: WritingBodyBlock[];
}

interface CarouselRecord {
  id: string;
  kind: "carousel";
  title: string;
  description: string;
  publishedAt: string;
  views: number;
  slideCount: number;
  tags: string[];
  listed: boolean;
  featured?: boolean;
  cover: string;
  images: string[];
  headline?: string;
  notes?: string;
  slideTitles?: string[];
}

export type {
  WritingKind,
  WritingBodyBlock,
  ArticleRecord,
  PostRecord,
  CarouselRecord,
};
