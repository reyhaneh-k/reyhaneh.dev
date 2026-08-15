import articleEditorialWeb from "@/assets/images/writing/article-editorial-web.jpg";
import articleFluidType from "@/assets/images/writing/article-fluid-type.jpg";
import articleGhostDrafts from "@/assets/images/writing/article-ghost-drafts.jpg";
import articleSilenceHero from "@/assets/images/writing/article-silence-hero.jpg";
import articleSilenceInline from "@/assets/images/writing/article-silence-inline.jpg";
import articleStructuringChaos from "@/assets/images/writing/article-structuring-chaos.jpg";
import articleTonalLayering from "@/assets/images/writing/article-tonal-layering.jpg";
import articleWeightOfWords from "@/assets/images/writing/article-weight-of-words.jpg";
import carouselFeatured from "@/assets/images/writing/carousel-featured.jpg";
import carouselFluidType from "@/assets/images/writing/carousel-fluid-type.jpg";
import carouselMicro from "@/assets/images/writing/carousel-micro.jpg";
import carouselSlide1 from "@/assets/images/writing/carousel-slide-1.jpg";
import carouselSlide2 from "@/assets/images/writing/carousel-slide-2.jpg";
import carouselSlide3 from "@/assets/images/writing/carousel-slide-3.jpg";
import carouselSlide4 from "@/assets/images/writing/carousel-slide-4.jpg";
import carouselSlideChart from "@/assets/images/writing/carousel-slide-chart.jpg";
import carouselSlideIntro from "@/assets/images/writing/carousel-slide-intro.jpg";
import carouselSlideOptimistic from "@/assets/images/writing/carousel-slide-optimistic.jpg";
import carouselSlideQuote from "@/assets/images/writing/carousel-slide-quote.jpg";
import carouselSlideWaiting from "@/assets/images/writing/carousel-slide-waiting.jpg";
import carouselTokens from "@/assets/images/writing/carousel-tokens.jpg";
import feedInterfaceCraft from "@/assets/images/writing/feed-interface-craft.jpg";
import postRelatedWhitespace from "@/assets/images/writing/post-related-whitespace.jpg";
import postSerendipityHero from "@/assets/images/writing/post-serendipity-hero.jpg";

import type {
  ArticleRecord,
  CarouselRecord,
  PostRecord,
} from "./index.types";

const perceivedSlides = [
  carouselSlideIntro,
  carouselSlideWaiting,
  carouselSlideOptimistic,
  carouselSlideChart,
  carouselSlideQuote,
  carouselSlide1,
  carouselSlide2,
  carouselSlide3,
  carouselSlide4,
  carouselFeatured,
  carouselFluidType,
  carouselMicro,
];

const articles: ArticleRecord[] = [
  {
    id: "the-editorial-web",
    kind: "article",
    title: "The Editorial Web",
    excerpt:
      "Why the future of premium digital experiences looks less like an app and more like a high-end print magazine. Examining the shift from transactional interfaces to curated, breathing reading environments.",
    category: "Design Theory",
    date: "2024-10-20",
    readTime: "8 min read",
    listed: true,
    featured: true,
    layout: "featured",
    cover: articleEditorialWeb,
    inlineImage: articleSilenceInline,
    caption: "The tactile quality of spacing.",
    body: [
      {
        type: "paragraph",
        text: "In the relentless stream of notifications, pop-ups, and infinite scrolls, silence has become a luxury commodity. When we design digital spaces, we often focus intensely on what we are putting onto the canvas—the features, the content, the calls to action. But true elegance often lies in what we deliberately leave out.",
      },
      {
        type: "paragraph",
        text: "Whitespace, or negative space, isn't just an empty area waiting to be filled. It is an active element of design. It provides breathing room for the user's mind, creating a pacing that allows information to be digested rather than merely consumed.",
      },
      {
        type: "quote",
        text: "The pause is as important as the note. In digital architecture, the empty space is where the user forms their understanding.",
      },
      {
        type: "paragraph",
        text: "Consider the difference between a cluttered news aggregate and a premium editorial publication. The latter uses generous margins, deliberate typography scaling, and significant gaps between sections to guide the eye. It says to the reader: take your time. This is worth your focused attention.",
      },
      {
        type: "paragraph",
        text: "Implementing this architecture of silence requires discipline. It means fighting the urge to fill every pixel with perceived value. It means establishing a grid system and adhering to it, allowing elements to align harmoniously while retaining their independence.",
      },
    ],
  },
  {
    id: "tonal-layering",
    kind: "article",
    title: "Tonal Layering",
    excerpt:
      "Moving away from stark drop shadows towards a softer, more sophisticated approach to depth in interface design.",
    category: "UI Engineering",
    date: "2024-10-08",
    readTime: "6 min read",
    listed: true,
    layout: "tall",
    cover: articleTonalLayering,
    body: [
      {
        type: "paragraph",
        text: "Hard drop shadows were a convenient lie: they made cards float, so we kept stacking them until every surface competed for altitude. Tonal layering asks for less theater and more atmosphere—adjacent values, quiet borders, and light that feels like paper instead of plastic.",
      },
      {
        type: "paragraph",
        text: "The trick is to separate elevation from contrast. A raised panel can share a hue with its parent and still read as distinct if the mix is careful. Tokens help: surface against canvas, line at a low opacity, accent reserved for meaning rather than depth.",
      },
    ],
  },
  {
    id: "ghost-drafts",
    kind: "article",
    title: "Ghost Drafts & Dead Ideas",
    excerpt:
      "The value of keeping your discarded concepts visible. How iterating in public, even with failed experiments, builds a stronger design intuition over time.",
    category: "Process",
    date: "2024-09-22",
    readTime: "7 min read",
    listed: true,
    layout: "wide",
    cover: articleGhostDrafts,
    body: [
      {
        type: "paragraph",
        text: "Most archives hide the work that did not ship. That is a loss. Dead ideas still teach: they show the fork you did not take, the type size that felt precious, the interaction that was clever and wrong.",
      },
      {
        type: "paragraph",
        text: "Keeping ghost drafts nearby is not nostalgia. It is a way to stay honest about taste. When a new problem appears, you can steal from your own failures instead of starting from a blank canvas that pretends you have never been here before.",
      },
    ],
  },
  {
    id: "fluid-type-hierarchies",
    kind: "article",
    title: "Fluid Type Hierarchies",
    excerpt:
      "Building robust, scalable typography systems that maintain editorial integrity across all viewports without breaking the development model.",
    category: "Typography",
    date: "2024-09-10",
    readTime: "5 min read",
    listed: true,
    layout: "wide",
    cover: articleFluidType,
    body: [
      {
        type: "paragraph",
        text: "Print hierarchies survive because the page is finite. Screens lie about that. Fluid type is the compromise: clamp the display size, lock the body to a readable measure, and let the ratio between them breathe instead of snapping at breakpoints.",
      },
      {
        type: "paragraph",
        text: "The development model stays simple when the scale is a token, not a special case. One display family, one body family, and a handful of steps that still feel editorial when the viewport is a phone in a bright kitchen.",
      },
    ],
  },
  {
    id: "architecture-of-silence",
    kind: "article",
    title:
      "The Architecture of Silence: Finding Space in Modern Interfaces",
    excerpt:
      "Whitespace is not leftover canvas. It is the pacing that lets an interface be understood instead of merely used.",
    category: "Design Theory",
    date: "2023-10-24",
    readTime: "8 min read",
    listed: false,
    cover: articleSilenceHero,
    inlineImage: articleSilenceInline,
    caption: "The tactile quality of spacing.",
    body: [
      {
        type: "paragraph",
        text: "In the relentless stream of notifications, pop-ups, and infinite scrolls, silence has become a luxury commodity. When we design digital spaces, we often focus intensely on what we are putting onto the canvas—the features, the content, the calls to action. But true elegance often lies in what we deliberately leave out.",
      },
      {
        type: "paragraph",
        text: "Whitespace, or negative space, isn't just an empty area waiting to be filled. It is an active element of design. It provides breathing room for the user's mind, creating a pacing that allows information to be digested rather than merely consumed.",
      },
      {
        type: "quote",
        text: "The pause is as important as the note. In digital architecture, the empty space is where the user forms their understanding.",
      },
      {
        type: "paragraph",
        text: "Consider the difference between a cluttered news aggregate and a premium editorial publication. The latter uses generous margins, deliberate typography scaling, and significant gaps between sections to guide the eye. It says to the reader: take your time. This is worth your focused attention.",
      },
      {
        type: "paragraph",
        text: "Implementing this architecture of silence requires discipline. It means fighting the urge to fill every pixel with perceived value. It means establishing a grid system and adhering to it, allowing elements to align harmoniously while retaining their independence.",
      },
    ],
  },
  {
    id: "refining-interface-craft",
    kind: "article",
    title: "Refining Interface Craft",
    excerpt:
      "The subtle details that elevate a good UI to a great one. Exploring micro-interactions, atmospheric shadows, and typographic rhythm in modern web applications.",
    category: "Design Theory",
    date: "2024-10-22",
    readTime: "6 min read",
    listed: false,
    cover: feedInterfaceCraft,
    body: [
      {
        type: "paragraph",
        text: "Craft in an interface is rarely a new feature. It is the shadow that does not shout, the hover that explains hierarchy, the type that holds a measure when the viewport shrinks.",
      },
      {
        type: "paragraph",
        text: "Micro-interactions are useful when they narrate state. Atmospheric shadows are useful when they sit in the same family as the canvas. Typographic rhythm is useful when headings and body share a pulse instead of competing for volume.",
      },
    ],
  },
  {
    id: "the-return-of-skeuomorphism",
    kind: "article",
    title: "The Return of Skeuomorphism?",
    excerpt:
      "We are seeing a trend towards more tactile interfaces. Buttons that look clickable, soft bevels, and atmospheric depth. Is flat design finally dead, or just evolving?",
    category: "Design Theory",
    date: "2024-10-12",
    readTime: "5 min read",
    listed: false,
    cover: articleTonalLayering,
    body: [
      {
        type: "paragraph",
        text: "Flat design taught us restraint. The pendulum is moving again—not toward leather stitching, but toward materials that admit light: soft bevels, paper grain, buttons that look like they can be pressed.",
      },
      {
        type: "paragraph",
        text: "The question is not whether skeuomorphism is back. It is whether tactility can stay honest. A bevel that explains affordance is welcome. A texture that only performs nostalgia is noise.",
      },
    ],
  },
  {
    id: "the-weight-of-words",
    kind: "article",
    title: "The Weight of Words in UI",
    excerpt:
      "How label length, line height, and a single verb can carry more hierarchy than another shade of gray.",
    category: "Typography",
    date: "2024-08-18",
    readTime: "5 min read",
    listed: false,
    cover: articleWeightOfWords,
    body: [
      {
        type: "paragraph",
        text: "Interface copy is a layout tool. A short verb can do the work of an icon. A long noun can collapse a card. Weight is not only font-weight—it is how much language you ask the eye to hold.",
      },
    ],
  },
  {
    id: "structuring-chaos",
    kind: "article",
    title: "Structuring Chaos: Design Systems",
    excerpt:
      "How primitive tokens and a calm layering model keep a multi-surface system from inventing a new gray every week.",
    category: "Systems",
    date: "2024-07-02",
    readTime: "12 min read",
    listed: false,
    cover: articleStructuringChaos,
    body: [
      {
        type: "paragraph",
        text: "A design system is not a sticker sheet. It is a way to say no with a token. Primitive color, type, and space come first; components borrow; products compose. Chaos shows up when a new surface invents its own language instead of extending the one you already paid for.",
      },
    ],
  },
];

const posts: PostRecord[] = [
  {
    id: "empty-spaces",
    kind: "post",
    title: "On the aesthetics of empty spaces",
    excerpt:
      "There's a peculiar comfort in spaces that are intentionally left blank. In editorial design, we call it whitespace, but really, it's breathing room for the mind.",
    date: "2024-10-24",
    views: 1204,
    readTime: "3 min read",
    listed: true,
    category: "Design Theory",
    cover: postSerendipityHero,
    caption:
      "Fig 1. Structural abstraction emphasizing organic pathways.",
    body: [
      {
        type: "paragraph",
        text: "There's a peculiar comfort in spaces that are intentionally left blank. In editorial design, we call it whitespace, but really, it's breathing room for the mind. It's the visual equivalent of a pause in a conversation.",
      },
      {
        type: "image",
        text: "Fig 1. Structural abstraction emphasizing organic pathways.",
      },
      {
        type: "paragraph",
        text: "When everything is screaming for attention, quietness becomes a luxury. I find myself increasingly drawn to layouts that dare to do less. To let a single image or a solitary paragraph hold court in a sea of emptiness.",
      },
      {
        type: "paragraph",
        text: "It demands confidence to not fill every pixel. It says: what is here is important enough to stand alone.",
      },
    ],
  },
  {
    id: "tools-shape-the-craft",
    kind: "post",
    title: "Tools shape the craft",
    excerpt:
      "A brief note on how the software we use inevitably dictates the style of work we produce.",
    date: "2024-10-18",
    views: 842,
    readTime: "2 min read",
    listed: true,
    body: [
      {
        type: "paragraph",
        text: "A brief note on how the software we use inevitably dictates the style of work we produce. Figma wants auto-layout. CSS wants the cascade. A terminal wants brevity. None of that is neutral, and pretending otherwise is how every file starts to look like the default file.",
      },
    ],
  },
  {
    id: "typographic-hierarchy",
    kind: "post",
    title: "Typographic hierarchy in digital spaces",
    excerpt:
      "Translating print principles to responsive screens without losing the soul of the layout.",
    date: "2024-10-12",
    views: 960,
    readTime: "2 min read",
    listed: true,
    cover: postRelatedWhitespace,
    body: [
      {
        type: "paragraph",
        text: "Translating print principles to responsive screens without losing the soul of the layout means protecting measure, contrast, and a display face that can still shout when the viewport is small.",
      },
    ],
  },
  {
    id: "color-theory",
    kind: "post",
    title: "Color theory for interfaces",
    excerpt:
      "A draft on mixing accent, tertiary, and ink so a theme survives both a bright kitchen and a dim train.",
    date: "2024-10-05",
    views: 120,
    readTime: "2 min read",
    listed: true,
    draft: true,
    body: [
      {
        type: "paragraph",
        text: "Accent is for meaning. Tertiary is for play. Ink is for reading. If those three jobs collapse into one coral wash, the interface stops having a temperature and starts having a mood swing.",
      },
    ],
  },
  {
    id: "css-subgrid",
    kind: "post",
    title: "CSS subgrid finally clicked",
    excerpt:
      "Finally cracked that weird layout bug with CSS subgrid. It's incredibly powerful but definitely requires a mental model shift from traditional flexbox approaches.",
    date: "2024-10-24",
    views: 410,
    readTime: "2 min read",
    listed: false,
    body: [
      {
        type: "paragraph",
        text: "Finally cracked that weird layout bug with CSS subgrid. It's incredibly powerful but definitely requires a mental model shift from traditional flexbox approaches. Writing up a quick tutorial on this soon.",
      },
    ],
  },
  {
    id: "use-atmosphere",
    kind: "post",
    title: "Drafting useAtmosphere",
    excerpt:
      "Drafting a new hook for dynamic shadow casting based on scroll position. The math is getting tricky.",
    date: "2024-10-21",
    views: 288,
    readTime: "2 min read",
    listed: false,
    snippet: `function useAtmosphere() {
  const [depth, setDepth] = useState(0);

  useEffect(() => {
    // Calculate light diffusion
  }, []);

  return depth;
}`,
    body: [
      {
        type: "paragraph",
        text: "Drafting a new hook for dynamic shadow casting based on scroll position. The math is getting tricky.",
      },
    ],
  },
  {
    id: "architecture-of-serendipity",
    kind: "post",
    title: "The Architecture of Serendipity in UI",
    excerpt:
      "We often design for efficiency. What happens when we intentionally introduce friction designed to create moments of unexpected discovery?",
    date: "2024-05-12",
    views: 1204,
    readTime: "3 min read",
    listed: false,
    category: "Design Theory",
    cover: postSerendipityHero,
    caption:
      "Fig 1. Structural abstraction emphasizing organic pathways.",
    body: [
      {
        type: "paragraph",
        text: "We often design for efficiency, optimizing funnels to move users from point A to point B as quickly as possible. But what happens when we intentionally introduce friction designed to create moments of unexpected discovery?",
      },
      {
        type: "heading",
        text: "Designing for the Wanderer",
      },
      {
        type: "paragraph",
        text: 'The concept of a "wanderer" in digital space is increasingly rare. Modern interfaces are characterized by aggressive search bars and algorithmic feeds that predict what we want before we know we want it. The serendipitous joy of browsing a physical library or a record store—where proximity to unrelated ideas sparks new connections—is largely absent in highly optimized digital environments.',
      },
      {
        type: "image",
        text: "Fig 1. Structural abstraction emphasizing organic pathways.",
      },
      {
        type: "paragraph",
        text: "To architect serendipity, we must rethink the structure of navigation itself. Instead of rigid hierarchies (Home > Category > Item), we can introduce lateral connections. Think of it as mapping related concepts rather than merely categorizing items.",
      },
      {
        type: "quote",
        text: "Efficiency is the enemy of discovery. A perfectly optimized path leaves no room for beautiful accidents.",
      },
      {
        type: "paragraph",
        text: "Small interventions, like Related Concepts rather than just Related Products, or associative tagging interfaces that reveal unexpected intersections between disciplines, can transform a transactional UI into an exploratory one. The goal is to reward the user for stepping off the primary path.",
      },
    ],
  },
];

const carousels: CarouselRecord[] = [
  {
    id: "perceived-performance",
    kind: "carousel",
    title: "The Psychology of Perceived Performance",
    description:
      "Why 100ms feels like a second, and how to design interfaces that trick the human brain into feeling faster than the network allows.",
    publishedAt: "2024-10-01",
    views: 2400,
    slideCount: 12,
    tags: ["UX Design", "Engineering", "Performance"],
    listed: true,
    featured: true,
    cover: carouselFeatured,
    images: perceivedSlides,
    headline: "Perceived Performance",
    notes:
      "Performance is not just a metric measured in milliseconds; it is an emotional response from the user. When we talk about perceived performance, we are discussing how fast an application feels, regardless of the actual network payload or render time. By implementing optimistic UI updates, we can provide immediate visual feedback for user actions, bridging the gap between intention and execution while the server processes the request in the background.",
    slideTitles: [
      "Introduction to Perceived Performance",
      "The Psychology of Waiting",
      "Optimistic UI Patterns",
      "Actual vs Perceived Time",
      "Speed is a Feature",
      "Skeleton Screens",
      "Frame Timing",
      "Optimistic Updates",
      "Progressive Disclosure",
      "Latency Hiding",
      "Trust and Feedback",
      "Designing the Wait",
    ],
  },
  {
    id: "fluid-typography",
    kind: "carousel",
    title: "Mastering Fluid Typography with CSS Clamp",
    description:
      "A visual guide to scaling text harmoniously across viewport sizes without relying on rigid media breakpoints.",
    publishedAt: "2024-09-14",
    views: 1100,
    slideCount: 8,
    tags: ["Typography", "CSS"],
    listed: true,
    cover: carouselFluidType,
    images: [
      carouselFluidType,
      articleFluidType,
      carouselSlideQuote,
      carouselSlide2,
      carouselSlide3,
      carouselSlide4,
      carouselSlideIntro,
      carouselSlideChart,
    ],
  },
  {
    id: "micro-interactions",
    kind: "carousel",
    title: "The ROI of Delightful Micro-interactions",
    description:
      "How small, thoughtful animations can significantly impact user retention and perceived product quality.",
    publishedAt: "2024-08-28",
    views: 1560,
    slideCount: 15,
    tags: ["Motion", "UX"],
    listed: true,
    cover: carouselMicro,
    images: [
      carouselMicro,
      carouselSlideOptimistic,
      carouselSlideWaiting,
      carouselSlide1,
      carouselSlideChart,
      articleEditorialWeb,
    ],
  },
  {
    id: "composing-tokens",
    kind: "carousel",
    title: "Composing Tokens for Scale",
    description:
      "Structuring a design system's primitive layers to handle multi-brand, multi-platform demands without breaking.",
    publishedAt: "2024-08-04",
    views: 980,
    slideCount: 10,
    tags: ["Systems", "Architecture"],
    listed: true,
    cover: carouselTokens,
    images: [
      carouselSlideChart,
      carouselSlideQuote,
      articleTonalLayering,
      carouselSlideIntro,
      articleStructuringChaos,
    ],
  },
  {
    id: "css-grid-vs-flexbox",
    kind: "carousel",
    title: "CSS Grid vs Flexbox: A Visual Guide",
    description:
      "Swipe through the core differences and know exactly when to reach for which layout module.",
    publishedAt: "2024-10-16",
    views: 720,
    slideCount: 9,
    tags: ["CSS", "Layout"],
    listed: false,
    cover: carouselSlide1,
    images: [
      carouselSlide1,
      carouselSlide2,
      carouselSlide3,
      carouselSlide4,
    ],
  },
];

const writingCopy = {
  all: {
    title: ["Thinking,", "out loud."],
    description:
      "A curated stream of consciousness covering frontend craft, design systems, and the messy reality of building interfaces.",
  },
  posts: {
    title: ["Short takes,", "straight from the feed."],
    description:
      "A collection of thoughts, observations, and brief notes. Less structured than an article, more permanent than a tweet.",
  },
  articles: {
    title: ["Long-form Essays"],
    description:
      "These articles represent the more thoroughly researched and heavily debated pieces from the archive, intended to be read slowly.",
  },
  carousels: {
    title: ["Carousels"],
    description:
      "A curated collection of multi-slide narratives exploring modern web patterns, typography, and performance. Swipe through the archive.",
  },
} as const;

const listedPosts = posts.filter((post) => post.listed);
const listedArticles = articles.filter(
  (article) => article.listed
);
const listedCarousels = carousels.filter(
  (carousel) => carousel.listed
);
const featuredCarousel =
  carousels.find((carousel) => carousel.featured) ??
  carousels[0];
const archiveCarousels = listedCarousels.filter(
  (carousel) => !carousel.featured
);

function getArticleById(id: string) {
  return articles.find((article) => article.id === id);
}

function getPostById(id: string) {
  return posts.find((post) => post.id === id);
}

function getCarouselById(id: string) {
  return carousels.find((carousel) => carousel.id === id);
}

function relatedArticles(id: string, count = 2) {
  return articles
    .filter((article) => article.id !== id)
    .slice(0, count);
}

function relatedPosts(id: string, count = 2) {
  return posts
    .filter((post) => post.id !== id)
    .slice(0, count);
}

export {
  articles,
  posts,
  carousels,
  writingCopy,
  listedPosts,
  listedArticles,
  listedCarousels,
  featuredCarousel,
  archiveCarousels,
  getArticleById,
  getPostById,
  getCarouselById,
  relatedArticles,
  relatedPosts,
};
