import { Link, useMatches } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { getCrumbsFromMatches } from "@/components/ui/breadCrumb/index.helpers";

function DetailBack() {
  const parent = useMatches({
    select: (matches) =>
      getCrumbsFromMatches(matches).at(-2),
  });

  if (!parent) return null;

  return (
    <header className="mt-6 lg:mt-10">
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

export { DetailBack };
