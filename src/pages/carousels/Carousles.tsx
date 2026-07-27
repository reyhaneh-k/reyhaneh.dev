import { cn } from "@/utils/classname";

import { CarouselStack } from "./components/carouselStack/CarouselStack";
import {
  carouselMockData,
  carouselTexts,
} from "./index.consts";

function Carousles() {
  return (
    <div className="@container space-y-2">
      <h2 className="text-2xl font-bold">
        {carouselTexts.title}
      </h2>
      <p className="text-ink-muted mb-8">
        {carouselTexts.description}
      </p>
      <div
        className={cn(
          "mx-auto grid w-fit grid-cols-1 gap-y-10",
          "@xl:grid-cols-2 @xl:gap-x-4",
          "@4xl:grid-cols-3",
          "@6xl:grid-cols-4",
          "ps-3"
        )}
      >
        {carouselMockData.map((item) => (
          <CarouselStack key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}

export default Carousles;
