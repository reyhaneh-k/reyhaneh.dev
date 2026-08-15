import { motion } from "motion/react";
import { Tabs as RadixTabs } from "radix-ui";
import { createContext, useContext, useState } from "react";

import { cn } from "@/utils/classname";
import { Override } from "@/utils/types";
type BaseValueType = string | undefined;
type TabsRootProps<T> = Override<
  React.ComponentProps<typeof RadixTabs.Root>,
  {
    value?: T;
    defaultValue?: T;
    onValueChange?: (value: T) => void;
  }
>;
type TabsListProps = React.ComponentProps<
  typeof RadixTabs.List
>;
type TabsTriggerProps<T> = Override<
  React.ComponentProps<typeof RadixTabs.Trigger>,
  {
    value: T;
  }
>;
type TabsContentProps = React.ComponentProps<
  typeof RadixTabs.Content
>;

const TabsValueContext =
  createContext<BaseValueType>(undefined);

const INDICATOR_SPRING = {
  type: "spring" as const,
  stiffness: 380,
  damping: 32,
  mass: 0.7,
};

function TabsRoot<T extends BaseValueType>({
  className,
  children,
  value,
  defaultValue,
  onValueChange,
  orientation,
  ...props
}: TabsRootProps<T>) {
  const [uncontrolled, setUncontrolled] = useState<
    T | undefined
  >(defaultValue);
  const current = value ?? uncontrolled;
  const Context = TabsValueContext;
  return (
    <Context.Provider value={current}>
      <RadixTabs.Root
        className={cn("shrink-0", className)}
        value={value}
        defaultValue={defaultValue}
        onValueChange={(next) => {
          setUncontrolled(next as T);
          onValueChange?.(next as T);
        }}
        orientation={orientation ?? "horizontal"}
        {...props}
      >
        {children}
      </RadixTabs.Root>
    </Context.Provider>
  );
}

function TabsList({
  className,
  children,
  ...props
}: TabsListProps) {
  return (
    <RadixTabs.List
      className={cn(
        "group",
        "relative flex outline-none",
        "flex-row gap-1 sm:gap-4",
        "data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-end data-[orientation=vertical]:gap-1",
        "border-line/60 border-b data-[orientation=vertical]:border-r data-[orientation=vertical]:border-b-0",
        "pb-px data-[orientation=vertical]:pr-px data-[orientation=vertical]:pb-0",
        className
      )}
      {...props}
    >
      {children}
    </RadixTabs.List>
  );
}

function TabsTrigger<T extends string>({
  className,
  children,
  value,
  ...props
}: TabsTriggerProps<T>) {
  const current = useContext(TabsValueContext);
  const active = current === value;

  return (
    <RadixTabs.Trigger
      className={cn(
        "relative flex items-baseline gap-2.5",
        "px-1 py-2.5 group-data-[orientation=vertical]:px-4 group-data-[orientation=vertical]:py-2",
        "font-display transition-colors duration-200",
        "cursor-pointer outline-none",
        "focus-visible:ring-accent/40 focus-visible:ring-offset-canvas focus-visible:ring-2 focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-40",

        active
          ? "text-ink"
          : "text-ink-subtle hover:text-ink-muted",
        className
      )}
      value={value}
      {...props}
    >
      {children}

      {active && (
        <motion.span
          layoutId="tabs-filter-indicator"
          aria-hidden
          className={cn(
            "bg-accent absolute rounded-full",
            "group-data-[orientation=horizontal]:right-2 group-data-[orientation=horizontal]:-bottom-0.75 group-data-[orientation=horizontal]:left-0 group-data-[orientation=horizontal]:h-0.75",
            "group-data-[orientation=vertical]:inset-y-1 group-data-[orientation=vertical]:right-[-2.5px] group-data-[orientation=vertical]:w-0.75"
          )}
          transition={INDICATOR_SPRING}
        />
      )}
    </RadixTabs.Trigger>
  );
}

function TabsContent({
  className,
  children,
  ...props
}: TabsContentProps) {
  return (
    <RadixTabs.Content
      className={cn(
        "focus-visible:ring-accent/40 outline-none focus-visible:ring-2",
        className
      )}
      {...props}
    >
      {children}
    </RadixTabs.Content>
  );
}

export { TabsRoot, TabsList, TabsTrigger, TabsContent };
