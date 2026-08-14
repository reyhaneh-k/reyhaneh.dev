import { cn } from "@/utils/classname";

import type { WritingKind } from "../../index.types";

const kindClassName: Record<WritingKind, string> = {
  article: "bg-tertiary text-ink",
  post: "bg-accent text-on-accent",
  carousel: "bg-ink text-canvas",
};

function KindChip({
  kind,
  className,
  children,
}: {
  kind: WritingKind;
  className?: string;
  children?: string;
}) {
  return (
    <span
      className={cn(
        "inline-block rounded-full px-3 py-1 text-xs font-medium tracking-wide",
        kindClassName[kind],
        className
      )}
    >
      {children ?? kind}
    </span>
  );
}

export { KindChip };
