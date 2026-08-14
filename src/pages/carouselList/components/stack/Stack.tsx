import { Link } from "@tanstack/react-router";
import { ArrowRight, Layers } from "lucide-react";

import { cn } from "@/utils/classname";

import type { StackProps } from "./index.types";

function Stack({
  id,
  title,
  description,
  cover,
  slideCount,
  tags,
  className,
}: StackProps) {
  return (
    <Link
      to="/writing/carousels/$carousel_id"
      params={{ carousel_id: id }}
      className={cn("group block", className)}
    >
      <div
        className={cn(
          "border-line/50 bg-surface relative z-10 rounded-2xl border p-4",
          "transition-transform duration-300 ease-out group-hover:-translate-y-1",
          "before:bg-surface-muted after:bg-canvas before:border-line after:border-line",
          "before:absolute before:inset-0 after:absolute after:inset-0",
          "before:-z-10 before:rounded-2xl after:-z-10 after:rounded-2xl",
          "before:border after:border",
          "before:origin-center after:origin-center",
          "before:scale-[0.98] after:scale-[0.98]",
          "before:-rotate-3 after:rotate-3",
          "before:transition-transform before:duration-300",
          "after:transition-transform after:duration-300",
          "group-hover:before:-translate-y-1 group-hover:before:scale-[0.96] group-hover:before:-rotate-5",
          "group-hover:after:-translate-y-1 group-hover:after:scale-[0.96] group-hover:after:rotate-5"
        )}
      >
        <div className="bg-canvas relative mb-6 aspect-4/3 overflow-hidden rounded-2xl p-[5%]">
          <img
            src={cover}
            alt={title}
            className="h-full w-full rounded-xl object-cover"
          />
          <span
            className={cn(
              "absolute top-4 left-4 z-20",
              "bg-surface/90 text-ink inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium backdrop-blur-sm"
            )}
          >
            <Layers className="size-3.5" />
            {slideCount} Slides
          </span>
          <span
            className={cn(
              "absolute top-4 right-4 z-20",
              "bg-ink/50 text-canvas rounded-full p-2 backdrop-blur-md",
              "opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            )}
          >
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </div>
        <h3 className="mb-2 line-clamp-2 text-xl font-semibold">
          {title}
        </h3>
        <p className="text-ink-muted mb-4 line-clamp-2 text-sm leading-relaxed md:text-base">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-canvas text-ink-muted rounded-md px-2 py-1 text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export { Stack as CarouselStack };
