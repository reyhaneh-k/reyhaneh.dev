import { useVirtualizer } from "@tanstack/react-virtual";
import { Fragment, useLayoutEffect } from "react";

import {
  getColumnCount,
  getDefaultScrollElement,
} from "../../index.helpers";

import type { VirtualizedGridBodyProps } from "./index.type";

function VirtualizedGridBody<TItem>({
  items,
  gap,
  overscan,
  gridWidth,
  scrollMargin,
  cellWidth,
  cellHeight,
  getScrollElement,
  getItemKey,
  renderItem,
}: VirtualizedGridBodyProps<TItem>) {
  const columnCount = getColumnCount(
    gridWidth,
    cellWidth,
    gap
  );

  const rowCount = Math.ceil(items.length / columnCount);

  const resolveScrollElement =
    getScrollElement ?? getDefaultScrollElement;

  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: resolveScrollElement,
    scrollMargin,
    estimateSize: () => cellHeight,
    gap,
    overscan,
    getItemKey: (index) => {
      const itemIndex = index * columnCount;
      const item = items[itemIndex];
      return item ? getItemKey(item, itemIndex) : index;
    },
  });

  useLayoutEffect(() => {
    rowVirtualizer.measure();
  }, [columnCount, rowVirtualizer, scrollMargin]);

  const totalHeight = rowVirtualizer.getTotalSize();

  return (
    <div
      style={{
        height: `${totalHeight}px`,
        position: "relative",
      }}
    >
      {rowVirtualizer
        .getVirtualItems()
        .map((virtualRow) => {
          const startIndex = virtualRow.index * columnCount;

          return (
            <div
              key={virtualRow.key}
              data-index={virtualRow.index}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${virtualRow.start - scrollMargin}px)`,
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
                  columnGap: gap,
                  justifyItems: "center",
                }}
              >
                {items
                  .slice(
                    startIndex,
                    startIndex + columnCount
                  )
                  .map((item, columnIndex) => (
                    <Fragment
                      key={getItemKey(
                        item,
                        startIndex + columnIndex
                      )}
                    >
                      {renderItem(
                        item,
                        startIndex + columnIndex
                      )}
                    </Fragment>
                  ))}
              </div>
            </div>
          );
        })}
    </div>
  );
}

export { VirtualizedGridBody };
