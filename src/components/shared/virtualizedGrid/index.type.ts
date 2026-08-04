interface VirtualizedGridProps<TItem> {
  items: TItem[];
  cellWidth: number;
  gap: number;
  cellHeight: number;
  overscan?: number;
  className?: string;
  getScrollElement?: () => Element | null;
  getItemKey: (
    item: TItem,
    index: number
  ) => string | number;
  renderItem: (
    item: TItem,
    index: number
  ) => React.ReactNode;
  children?: React.ReactNode;
}

export type { VirtualizedGridProps };
