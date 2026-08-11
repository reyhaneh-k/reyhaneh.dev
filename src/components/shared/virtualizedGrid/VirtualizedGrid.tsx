import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { cn } from "@/utils/classname";

import { VirtualizedGridBody } from "./components/virtualizedGridBody/VirtualizedGridBody";
import {
  getColumnCount,
  getDefaultScrollElement,
  getListScrollOffset,
} from "./index.helpers";
import type { VirtualizedGridProps } from "./index.type";

function VirtualizedGrid<TItem>({
  items,
  gap,
  cellWidth,
  cellHeight,
  overscan = 2,
  className,
  getScrollElement: getScrollElementProp,
  getItemKey,
  renderItem,
}: VirtualizedGridProps<TItem>) {
  const listAnchorRef = useRef<HTMLDivElement>(null);
  const [gridWidth, setGridWidth] = useState<number | null>(
    null
  );
  const [scrollMargin, setScrollMargin] = useState<
    number | null
  >(null);

  const getScrollElement = useCallback(() => {
    return (
      getScrollElementProp?.() ?? getDefaultScrollElement()
    );
  }, [getScrollElementProp]);

  useLayoutEffect(() => {
    const listEl = listAnchorRef.current;
    const scrollEl = getScrollElement();
    if (!listEl) return;

    const updateMeasurements = () => {
      const rect = listEl.getBoundingClientRect();

      setGridWidth(rect.width);
      setScrollMargin(
        getListScrollOffset(listEl, scrollEl)
      );
    };

    updateMeasurements();

    let resizeRafId = 0;
    const scheduleUpdateMeasurements = () => {
      cancelAnimationFrame(resizeRafId);
      resizeRafId = requestAnimationFrame(() => {
        requestAnimationFrame(updateMeasurements);
      });
    };

    const observer = new ResizeObserver(
      scheduleUpdateMeasurements
    );
    observer.observe(listEl);
    if (scrollEl !== document.documentElement) {
      observer.observe(scrollEl);
    }

    window.addEventListener(
      "resize",
      scheduleUpdateMeasurements
    );

    return () => {
      cancelAnimationFrame(resizeRafId);
      observer.disconnect();
      window.removeEventListener(
        "resize",
        scheduleUpdateMeasurements
      );
    };
  }, [getScrollElement]);

  const isReady =
    scrollMargin !== null && gridWidth !== null;

  return (
    <div
      ref={listAnchorRef}
      className={cn("w-full", className)}
    >
      {isReady && (
        <VirtualizedGridBody
          key={`${getColumnCount(gridWidth, cellWidth, gap)}-${Math.round(scrollMargin)}`}
          items={items}
          gridWidth={gridWidth}
          scrollMargin={scrollMargin}
          cellWidth={cellWidth}
          gap={gap}
          cellHeight={cellHeight}
          overscan={overscan}
          getScrollElement={getScrollElement}
          getItemKey={getItemKey}
          renderItem={renderItem}
        />
      )}
    </div>
  );
}

export { VirtualizedGrid };
