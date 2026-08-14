import { getRouteApi } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  LayoutGrid,
} from "lucide-react";
import { useState } from "react";

import { cn } from "@/utils/classname";

import { formatWritingDate } from "../writing/index.helpers";

const routeApi = getRouteApi(
  "/_app/writing/carousels/$carousel_id"
);

function CarouselDetail() {
  const carousel = routeApi.useLoaderData();
  const [index, setIndex] = useState(0);
  const slides = carousel.images;
  const total = slides.length;
  const current = slides[index] ?? slides[0];
  const titles = carousel.slideTitles ?? [];
  const slideTitle = titles[index] ?? `Slide ${index + 1}`;
  const headline = carousel.headline ?? carousel.title;
  const notes = carousel.notes ?? carousel.description;

  function go(delta: number) {
    setIndex((slideIndex) => {
      return (slideIndex + delta + total) % total;
    });
  }

  return (
    <div className="flex flex-col gap-10 md:gap-12">
      <header className="border-line flex flex-col justify-between gap-6 border-b pb-8 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <p className="text-ink-muted mb-4 text-xs font-bold tracking-[0.1em] uppercase">
            {carousel.tags[0] ?? "Carousel"} • {total}{" "}
            slides
          </p>
          <h1 className="mb-4 text-4xl leading-[0.95] font-extrabold tracking-tight md:text-6xl lg:text-7xl">
            {headline}
          </h1>
          <p className="text-ink-muted text-base leading-relaxed md:text-lg">
            {carousel.description}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <div className="bg-tertiary text-ink flex size-10 items-center justify-center rounded-full text-sm font-bold">
            R
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold tracking-widest uppercase">
              Reyhaneh
            </span>
            <time
              dateTime={carousel.publishedAt}
              className="text-ink-muted text-[10px] font-bold tracking-wide uppercase"
            >
              {formatWritingDate(carousel.publishedAt)}
            </time>
          </div>
        </div>
      </header>

      <section className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        <div className="flex flex-col gap-6 lg:col-span-9">
          <div className="border-line group relative aspect-video overflow-hidden rounded-2xl border">
            <img
              src={current}
              alt={`${headline} slide ${index + 1}`}
              className="h-full w-full object-cover"
            />
            <div className="bg-ink/10 pointer-events-none absolute inset-0 flex items-center justify-between px-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <button
                type="button"
                aria-label="Previous slide"
                onClick={() => {
                  go(-1);
                }}
                className="bg-surface border-line hover:bg-accent hover:text-on-accent pointer-events-auto flex size-12 items-center justify-center rounded-2xl border"
              >
                <ArrowLeft className="size-5" />
              </button>
              <button
                type="button"
                aria-label="Next slide"
                onClick={() => {
                  go(1);
                }}
                className="bg-accent text-on-accent pointer-events-auto flex size-12 items-center justify-center rounded-2xl"
              >
                <ArrowRight className="size-5" />
              </button>
            </div>
            <div className="bg-canvas-muted absolute inset-x-0 bottom-0 h-1">
              <div
                className="bg-accent h-full"
                style={{
                  width: `${((index + 1) / total) * 100}%`,
                }}
              />
            </div>
          </div>

          <div className="border-line flex items-center justify-between gap-4 border-b py-4">
            <div className="flex min-w-0 items-center gap-4">
              <span className="text-xl font-semibold md:text-2xl">
                {index + 1} / {total}
              </span>
              <h2 className="truncate text-base font-medium md:text-lg">
                {slideTitle}
              </h2>
            </div>
          </div>

          <div className="flex justify-between gap-4 md:hidden">
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => {
                go(-1);
              }}
              className="bg-surface border-line flex size-10 items-center justify-center rounded-full border"
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => {
                go(1);
              }}
              className="bg-accent text-on-accent flex size-10 items-center justify-center rounded-full"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-semibold">
              Slide notes
            </h3>
            <p className="text-ink-muted leading-relaxed">
              {notes}
            </p>
          </div>
        </div>

        <aside className="border-line bg-surface hidden flex-col overflow-hidden rounded-2xl border lg:sticky lg:top-24 lg:col-span-3 lg:flex lg:max-h-[calc(100vh-8rem)]">
          <div className="bg-canvas border-line flex items-center justify-between border-b p-4">
            <span className="text-xs font-bold tracking-widest uppercase">
              Thumbnails
            </span>
            <LayoutGrid className="text-ink-muted size-4" />
          </div>
          <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
            {slides.map((slide, slideIndex) => (
              <button
                key={`${slide}-${slideIndex}`}
                type="button"
                onClick={() => {
                  setIndex(slideIndex);
                }}
                className={cn(
                  "relative aspect-video overflow-hidden rounded-xl border text-left",
                  slideIndex === index
                    ? "border-accent border-2"
                    : "border-line opacity-70 hover:opacity-100"
                )}
              >
                <img
                  src={slide}
                  alt={`Slide ${slideIndex + 1}`}
                  className="h-full w-full object-cover"
                />
                <span
                  className={cn(
                    "absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold",
                    slideIndex === index
                      ? "bg-ink text-canvas"
                      : "bg-surface border-line border"
                  )}
                >
                  {slideIndex + 1}
                </span>
              </button>
            ))}
          </div>
        </aside>

        <div className="no-scrollbar overflow-x-auto lg:hidden">
          <div className="flex w-max gap-3">
            {slides.map((slide, slideIndex) => (
              <button
                key={`mobile-${slide}-${slideIndex}`}
                type="button"
                onClick={() => {
                  setIndex(slideIndex);
                }}
                className={cn(
                  "aspect-video w-28 shrink-0 overflow-hidden rounded-xl border",
                  slideIndex === index
                    ? "border-accent border-2"
                    : "border-line opacity-70"
                )}
              >
                <img
                  src={slide}
                  alt={`Slide ${slideIndex + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default CarouselDetail;
