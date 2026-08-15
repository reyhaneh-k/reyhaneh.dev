import { Link, useMatches } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { cn } from "@/utils/classname";
import { getCrumbsFromMatches } from "@/utils/path";

function SingleHeader({
  className,
}: {
  className?: string;
}) {
  const parent = useMatches({
    select: (matches) =>
      getCrumbsFromMatches(matches).at(-2),
  });

  if (!parent) return null;

  return (
    <header className={cn(className)}>
      <Link
        to={parent.path}
        className="text-ink-muted hover:text-ink inline-flex items-center gap-2 text-sm transition-colors"
      >
        <ArrowLeft className="size-4" />
        Back to {parent.title}
      </Link>
    </header>
  );
}

export { SingleHeader };
