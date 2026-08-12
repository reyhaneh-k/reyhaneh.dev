import { VirtualizedGrid } from "@/components/shared/virtualizedGrid/VirtualizedGrid";

import { CarouselStack } from "./components/carouselStack/CarouselStack";
import { CarouselStackProps } from "./components/carouselStack/index.types";
import { FeaturedCarousel } from "./components/featuredCarousel/FeaturedCarousel";
import {
  carouselMockData,
  carouselListData,
  carouselTexts,
  virtualSizes,
} from "./index.consts";

function Carousles() {
  const featured = carouselMockData[0];

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">
          {carouselTexts.title}
        </h2>
        <p className="text-ink-muted">
          {carouselTexts.description}
        </p>
      </div>

      <FeaturedCarousel {...featured} />

      <div className="flex items-center gap-2">
        <h6 className="text-ink-muted text-sm uppercase">
          Archive
        </h6>
        <span className="border-t-ink-muted/80 h-0 grow rounded-full border-t" />
      </div>
      <VirtualizedGrid<CarouselStackProps>
        items={carouselListData}
        cellWidth={virtualSizes.CARD_WIDTH}
        gap={virtualSizes.GAP}
        cellHeight={(virtualSizes.CARD_WIDTH * 4) / 3}
        getItemKey={(item) => item.id}
        renderItem={(item) => <CarouselStack {...item} />}
        className="space-y-2"
      />
    </div>
  );
}

export default Carousles;
