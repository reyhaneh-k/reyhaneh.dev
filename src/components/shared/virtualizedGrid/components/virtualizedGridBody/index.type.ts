interface VirtualizedGridBodyProps<TItem> {
  items: TItem[];
  gridWidth: number;
  scrollMargin: number;
  cellWidth: number;
  gap: number;
  cellHeight: number;
  overscan: number;
  getScrollElement?: () => Element | null;
  getItemKey: (
    item: TItem,
    index: number
  ) => string | number;
  renderItem: (
    item: TItem,
    index: number
  ) => React.ReactNode;
}

export type { VirtualizedGridBodyProps };
