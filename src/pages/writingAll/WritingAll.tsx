import { ArrowRight } from "lucide-react";

import feedInterfaceCraft from "@/assets/images/writing/feed-interface-craft.jpg";

import { KindChip } from "../writing/components/kindChip/KindChip";

import { FeedCard } from "./components/feedCard/FeedCard";

function WritingAll() {
  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-12">
      <FeedCard
        kind="article"
        to="/writing/articles/$article_id"
        params={{ article_id: "refining-interface-craft" }}
        className="justify-between p-[5%] md:col-span-8"
      >
        <div className="mb-8">
          <h2 className="group-hover:text-accent mb-4 text-2xl font-bold tracking-tight md:text-4xl">
            Refining Interface Craft
          </h2>
          <p className="text-ink-muted text-base leading-relaxed md:text-lg">
            The subtle details that elevate a good UI to a
            great one. Exploring micro-interactions,
            atmospheric shadows, and typographic rhythm in
            modern web applications.
          </p>
        </div>
        <div className="bg-ink h-64 overflow-hidden rounded-2xl p-2">
          <img
            src={feedInterfaceCraft}
            alt="Refining Interface Craft"
            className="h-full w-full rounded-lg object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
          />
        </div>
      </FeedCard>

      <FeedCard
        kind="post"
        to="/writing/posts/$post_id"
        params={{ post_id: "css-subgrid" }}
        className="p-8 md:col-span-4"
      >
        <p className="mb-6 flex-grow text-base leading-relaxed md:text-lg">
          Finally cracked that weird layout bug with CSS
          subgrid. It is incredibly powerful but definitely
          requires a mental model shift from traditional
          flexbox approaches. Writing up a quick tutorial on
          this soon.
        </p>
        <span className="text-ink-muted text-xs tracking-wide">
          2 hours ago
        </span>
      </FeedCard>

      <FeedCard
        kind="carousel"
        to="/writing/carousels/$carousel_id"
        params={{ carousel_id: "css-grid-vs-flexbox" }}
        tone="muted"
        showChip={false}
        className="relative overflow-hidden p-[3%] md:col-span-12"
      >
        <div className="relative z-10 flex flex-col items-center gap-8 md:flex-row">
          <div className="flex-1">
            <KindChip
              kind="carousel"
              className="mb-4 capitalize"
            >
              Carousel
            </KindChip>
            <h2 className="mb-2 text-xl font-bold md:text-2xl">
              CSS Grid vs Flexbox: A Visual Guide
            </h2>
            <p className="text-ink-muted mb-6 text-sm leading-relaxed md:text-base">
              Swipe through the core differences and know
              exactly when to reach for which layout module.
            </p>
            <span className="text-accent inline-flex items-center gap-1 text-sm font-medium">
              View thread
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
          <div className="flex w-full gap-4 overflow-hidden md:w-1/2">
            <div className="border-line bg-surface aspect-square w-1/2 -rotate-3 rounded-2xl border p-4">
              <div className="border-line text-ink-muted flex h-full items-center justify-center rounded-xl border-2 border-dashed text-xs tracking-widest uppercase">
                Grid
              </div>
            </div>
            <div className="border-line bg-surface mt-4 aspect-square w-1/2 rotate-3 rounded-2xl border p-4">
              <div className="flex h-full gap-2">
                <div className="bg-tertiary flex-1 rounded-md" />
                <div className="bg-tertiary flex-1 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </FeedCard>

      <FeedCard
        kind="article"
        to="/writing/articles/$article_id"
        params={{
          article_id: "the-return-of-skeuomorphism",
        }}
        className="p-8 md:col-span-6"
      >
        <h3 className="mb-3 text-xl font-bold">
          The Return of Skeuomorphism?
        </h3>
        <p className="text-ink-muted mb-6 flex-grow text-sm leading-relaxed">
          We are seeing a trend towards more tactile
          interfaces. Buttons that look clickable, soft
          bevels, and atmospheric depth. Is flat design
          finally dead, or just evolving?
        </p>
        <span className="text-ink-muted mt-auto text-xs tracking-wide">
          Oct 12, 2024
        </span>
      </FeedCard>

      <FeedCard
        kind="post"
        to="/writing/posts/$post_id"
        params={{ post_id: "use-atmosphere" }}
        tone="ink"
        className="p-8 md:col-span-6"
      >
        <pre className="bg-canvas/10 mb-6 flex-grow overflow-x-auto rounded-xl p-6 font-mono text-sm leading-relaxed">
          <code>{`function useAtmosphere() {
  const [depth, setDepth] = useState(0);

  useEffect(() => {
    // Calculate light diffusion
  }, []);

  return depth;
}`}</code>
        </pre>
        <p className="text-canvas/80 text-sm leading-relaxed">
          Drafting a new hook for dynamic shadow casting
          based on scroll position. The math is getting
          tricky.
        </p>
      </FeedCard>
    </section>
  );
}

export default WritingAll;
