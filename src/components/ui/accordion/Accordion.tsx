import { motion } from "motion/react";
import { Accordion as RadixAccordion } from "radix-ui";
import { forwardRef, type ReactNode } from "react";

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
interface AccordionContentMotionProps {
  className?: string;
  children: ReactNode;
  "data-state"?: "open" | "closed";
}

const AccordionContentMotion = forwardRef<
  HTMLDivElement,
  AccordionContentMotionProps
>(
  (
    {
      className,
      children,
      "data-state": state = "closed",
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        {...props}
        initial={{ height: 0 }}
        animate={{ height: state === "open" ? "auto" : 0 }}
        transition={{
          type: "tween",
          duration: 0.3,
          ease: "easeInOut",
        }}
        className={cn("overflow-hidden", className)}
      >
        {children}
      </motion.div>
    );
  }
);
AccordionContentMotion.displayName =
  "AccordionContentMotion";

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
      {...props}
      className={cn(
        "bg-surface border-line space-y-2 rounded-2xl border p-4",
        className
      )}
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
      forceMount
      asChild
      {...props}
      className="border-line border-b"
    >
      <AccordionContentMotion className={className}>
        {children}
      </AccordionContentMotion>
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
