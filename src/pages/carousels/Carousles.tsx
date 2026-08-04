import { VirtualizedGrid } from "@/components/shared/virtualizedGrid/VirtualizedGrid";

import { CarouselStack } from "./components/carouselStack/CarouselStack";
import { CarouselStackProps } from "./components/carouselStack/index.types";
import {
  carouselListData,
  carouselTexts,
  virtualSizes,
} from "./index.consts";

function Carousles() {
  return (
    <VirtualizedGrid<CarouselStackProps>
      items={carouselListData}
      cellWidth={virtualSizes.CARD_WIDTH}
      gap={virtualSizes.GAP}
      cellHeight={(virtualSizes.CARD_WIDTH * 4) / 3}
      getItemKey={(item) => item.id}
      renderItem={(item) => <CarouselStack {...item} />}
      className="space-y-2"
    >
      <h2 className="text-2xl font-bold">
        {carouselTexts.title}
      </h2>
      <p className="text-ink-muted mb-8">
        {carouselTexts.description}
      </p>
    </VirtualizedGrid>
  );
}

export default Carousles;
