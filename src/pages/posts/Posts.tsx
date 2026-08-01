import { ChevronDownIcon } from "lucide-react";

import {
  AccordionItem,
  AccordionTrigger,
  AccordionRoot,
  AccordionContent,
  AccordionHeader,
} from "@/components/ui/accordion/Accordion";

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
      <AccordionRoot type="multiple">
        {postMockData.map((item) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionHeader>
              <h2 className="text-2xl font-bold">
                {item.title}
              </h2>
            </AccordionHeader>
            <AccordionContent>
              <p className="text-ink-muted mb-8">
                {item.description}
              </p>
            </AccordionContent>{" "}
            <div className="flex w-full items-center justify-between">
              <h6 className="text-ink-muted mr-auto text-sm">
                {item.date}
              </h6>
              <span className="text-ink-muted text-sm">
                {item.views} views
              </span>
              <AccordionTrigger className="ml-auto">
                <ChevronDownIcon className="size-4" />
              </AccordionTrigger>
            </div>
          </AccordionItem>
        ))}
      </AccordionRoot>
    </div>
  );
}

export default Posts;
