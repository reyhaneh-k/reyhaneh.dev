import { Link } from "@tanstack/react-router";
import { ArrowLeft, ChevronRightIcon } from "lucide-react";

import { cn } from "@/utils/classname";

import { CrumbProps } from "../index.type";

export const Crumb = ({
  title,
  path,
  index = 0,
  isStandAlone = false,
}: CrumbProps) => {
  return (
    <Link
      to={path}
      className="text-ink-subtle flex items-center gap-2 text-sm transition-colors"
    >
      {isStandAlone && <ArrowLeft className="size-3" />}
      <span
        className={cn(
          "align-middle",
          "hover:text-accent active:text-accent truncate",
          index === 0 && "text-accent"
        )}
      >
        {title}
      </span>
      {!isStandAlone && index > 0 && (
        <ChevronRightIcon className="size-3" />
      )}
    </Link>
  );
};
