import { Tabs } from "radix-ui";

type TabsRootProps = React.ComponentProps<typeof Tabs.Root>;
type TabsListProps = React.ComponentProps<typeof Tabs.List>;
type TabsTriggerProps = React.ComponentProps<
  typeof Tabs.Trigger
>;
type TabsContentProps = React.ComponentProps<
  typeof Tabs.Content
>;

function TabsRoot({ children, ...props }: TabsRootProps) {
  return <Tabs.Root {...props}>{children}</Tabs.Root>;
}

function TabsList({ children, ...props }: TabsListProps) {
  return <Tabs.List {...props}>{children}</Tabs.List>;
}

function TabsTrigger({
  children,
  ...props
}: TabsTriggerProps) {
  return <Tabs.Trigger {...props}>{children}</Tabs.Trigger>;
}

function TabsContent({
  children,
  ...props
}: TabsContentProps) {
  return <Tabs.Content {...props}>{children}</Tabs.Content>;
}

export { TabsRoot, TabsList, TabsTrigger, TabsContent };
