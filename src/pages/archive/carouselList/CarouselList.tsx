import { FeaturedCarousel } from "./components/featured/Featured";
import { CarouselStack } from "./components/stack/Stack";
import {
  carouselMockData,
  carouselListData,
  carouselTexts,
  virtualSizes,
} from "./index.consts";

function CarouselList() {
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
      <div
        className="grid justify-items-center"
        style={{
          gridTemplateColumns: `repeat(auto-fill, minmax(${virtualSizes.CARD_WIDTH}px, 1fr))`,
          gap: virtualSizes.GAP,
        }}
      >
        {carouselListData.map((item) => (
          <CarouselStack key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}

export default CarouselList;
