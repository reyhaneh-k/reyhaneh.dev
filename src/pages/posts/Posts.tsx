import { ChevronDown } from "lucide-react";

import {
  AccordionItem,
  AccordionTrigger,
  AccordionRoot,
  AccordionContent,
  AccordionHeader,
} from "@/components/ui/accordion/Accordion";
import { cn } from "@/utils/classname";

import { postTexts, postMockData } from "./index.consts";

function Posts() {
  return (
    <div className="@container space-y-2">
      <h2 className="text-2xl font-bold">
        {postTexts.title}
      </h2>
      <p className="text-ink-muted mb-8">
        {postTexts.description}
      </p>
      <AccordionRoot type="single" collapsible>
        {postMockData.map((item) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionHeader
              asChild
              className="flex items-center gap-2"
            >
              <>
                <h2 className="grow text-2xl font-bold">
                  {item.title}
                </h2>
                <span className="text-ink-muted text-xs">
                  {new Intl.NumberFormat("en", {
                    notation: "compact",
                    maximumFractionDigits: 1,
                  }).format(item.views)}{" "}
                  views
                </span>
              </>
            </AccordionHeader>
            <AccordionContent>
              <p className="text-ink-muted mb-4">
                {item.description}
              </p>
            </AccordionContent>
            <div className="flex gap-4 pt-4">
              <span className="text-ink-muted font-display mr-auto grow text-xs">
                {new Date(item.date).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </span>

              <AccordionTrigger className="group ml-auto inline-flex items-center gap-2">
                <span
                  className={cn(
                    "group-data-[state=closed]:after:content-['Read_More'] group-data-[state=open]:after:content-['Read_Less']",
                    "text-accent text-sm transition-all duration-300"
                  )}
                />
                <ChevronDown
                  color="currentColor"
                  className="text-accent size-4 transition-transform duration-300 group-data-[state=open]:rotate-180"
                />
              </AccordionTrigger>
            </div>
          </AccordionItem>
        ))}
      </AccordionRoot>
    </div>
  );
}

export default Posts;
