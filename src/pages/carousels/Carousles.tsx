import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/utils/classname";

import { CarouselStack } from "./components/carouselStack/CarouselStack";
import {
  carouselMockData,
  carouselTexts,
  virtualSizes,
} from "./index.consts";

function Carousles() {
  const parentRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (parentRef.current === null) return;

    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });

    observer.observe(parentRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const columnCount = Math.max(
    1,
    Math.floor(
      (width + virtualSizes.GAP) /
        (virtualSizes.MIN_CARD_WIDTH + virtualSizes.GAP)
    )
  );

  const rowCount = Math.ceil(
    carouselMockData.length / columnCount
  );
  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => virtualSizes.ROW_HEIGHT,
    overscan: 1,
  });

  return (
    <div
      ref={parentRef}
      className="h-screen w-full scrollbar-none space-y-2 overflow-auto"
    >
      <h2 className="text-2xl font-bold">
        {carouselTexts.title}
      </h2>
      <p className="text-ink-muted mb-8">
        {carouselTexts.description}
      </p>

      <div
        // className={cn(
        //   "grid w-full gap-x-10 gap-y-10",
        //   "justify-items-center",
        //   "grid-cols-[repeat(auto-fit,minmax(300px,1fr))]"
        // )}
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          position: "relative",
        }}
      >
        {/* {carouselMockData.map((item) => (
          <CarouselStack key={item.id} {...item} />
        ))} */}
        {rowVirtualizer
          .getVirtualItems()
          .map((virtualRow) => {
            const startIndex =
              virtualRow.index * columnCount;
            const rowItems = carouselMockData.slice(
              startIndex,
              startIndex + columnCount
            );

            return (
              <div
                key={virtualRow.key}
                className={cn(
                  "absolute left-0 w-full",
                  "grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))]",
                  "justify-items-center gap-10"
                )}
                style={{
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                {rowItems.map((item) => (
                  <CarouselStack key={item.id} {...item} />
                ))}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Carousles;
