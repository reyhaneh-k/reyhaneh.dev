import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";

import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
} from "@/components/ui/accordion/Accordion";
import { cn } from "@/utils/classname";

import { KindChip } from "../writing/components/kindChip/KindChip";
import { listedPosts } from "../writing/index.consts";
import { formatWritingDate } from "../writing/index.helpers";

function PostList() {
  return (
    <AccordionRoot
      type="single"
      collapsible
      defaultValue="empty-spaces"
      className="space-y-6"
    >
      {listedPosts.map((item) => (
        <AccordionItem
          key={item.id}
          value={item.id}
          className="bg-surface border-line group rounded-2xl border p-6 md:p-8"
        >
          <AccordionHeader>
            <AccordionTrigger className="group flex w-full items-start justify-between gap-6 text-left">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  {item.draft ? (
                    <KindChip kind="article">
                      Draft
                    </KindChip>
                  ) : null}
                  <span className="group-hover:text-accent text-lg font-semibold md:text-2xl">
                    {item.title}
                  </span>
                </div>
                <p className="text-ink-muted mt-2 line-clamp-1 text-sm group-data-[state=open]:hidden">
                  {item.excerpt}
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-2">
                <span
                  className={cn(
                    "text-ink-muted text-xs",
                    "group-data-[state=open]:bg-canvas group-data-[state=open]:rounded-full group-data-[state=open]:px-3 group-data-[state=open]:py-1"
                  )}
                >
                  {formatWritingDate(item.date)}
                </span>
                <ChevronDown className="text-ink-subtle group-hover:text-accent size-5 transition-transform duration-300 group-data-[state=open]:rotate-180" />
              </div>
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            <div className="text-ink-muted space-y-4 py-4 text-sm leading-relaxed md:text-base">
              {item.body
                .filter(
                  (block) => block.type === "paragraph"
                )
                .map((block) => (
                  <p key={block.text}>{block.text}</p>
                ))}
              <Link
                to="/writing/posts/$post_id"
                params={{ post_id: item.id }}
                className="text-accent inline-block pt-2 text-sm font-medium"
              >
                Open post
              </Link>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </AccordionRoot>
  );
}

export default PostList;
