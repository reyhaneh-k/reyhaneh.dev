import { Link } from "@tanstack/react-router";

import { KindChip } from "@/pages/writing/components/kindChip/KindChip";
import { cn } from "@/utils/classname";

import type {
  FeedCardProps,
  FeedCardTone,
} from "./index.types";

const toneClassName: Record<FeedCardTone, string> = {
  surface: "bg-surface border-line border",
  muted: "bg-canvas-muted border-line border",
  ink: "bg-ink text-canvas",
};

function FeedCard({
  kind,
  tone = "surface",
  className,
  chipClassName,
  showChip = true,
  children,
  ...linkProps
}: FeedCardProps) {
  return (
    <Link
      {...linkProps}
      className={cn(
        "group flex flex-col rounded-2xl",
        "transition-transform duration-300 hover:-translate-y-1",
        toneClassName[tone],
        className
      )}
    >
      {showChip ? (
        <KindChip
          kind={kind}
          className={cn(
            "mb-6 self-start capitalize",
            chipClassName
          )}
        >
          {kind}
        </KindChip>
      ) : null}
      {children}
    </Link>
  );
}

export { FeedCard };
