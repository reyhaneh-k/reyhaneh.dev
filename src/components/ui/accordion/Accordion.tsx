import { Accordion as RadixAccordion } from "radix-ui";

import { cn } from "@/utils/classname";

type AccordionRootProps = React.ComponentProps<
  typeof RadixAccordion.Root
>;
type AccordionItemProps = React.ComponentProps<
  typeof RadixAccordion.Item
>;
type AccordionTriggerProps = React.ComponentProps<
  typeof RadixAccordion.Trigger
>;
type AccordionContentProps = React.ComponentProps<
  typeof RadixAccordion.Content
>;
type AccordionHeaderProps = React.ComponentProps<
  typeof RadixAccordion.Header
>;
function AccordionRoot({
  className,
  children,
  ...props
}: AccordionRootProps) {
  return (
    <RadixAccordion.Root
      className={cn("space-y-4", className)}
      {...props}
    >
      {children}
    </RadixAccordion.Root>
  );
}

function AccordionItem({
  className,
  children,
  ...props
}: AccordionItemProps) {
  return (
    <RadixAccordion.Item
      className={cn(
        "border-border rounded-3xl border p-4",
        className
      )}
      style={{
        backgroundColor:
          "color-mix(in srgb, var(--color-accent) 20%, var(--color-surface) 40%)",
      }}
      {...props}
    >
      {children}
    </RadixAccordion.Item>
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionTriggerProps) {
  return (
    <RadixAccordion.Trigger
      className={cn(className)}
      {...props}
    >
      {children}
    </RadixAccordion.Trigger>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionContentProps) {
  return (
    <RadixAccordion.Content
      className={cn(className)}
      {...props}
    >
      {children}
    </RadixAccordion.Content>
  );
}

function AccordionHeader({
  className,
  children,
  ...props
}: AccordionHeaderProps) {
  return (
    <RadixAccordion.Header
      className={cn(className)}
      {...props}
    >
      {children}
    </RadixAccordion.Header>
  );
}

export {
  AccordionRoot,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  AccordionHeader,
};
