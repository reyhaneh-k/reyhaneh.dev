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
          "grid w-full gap-x-10 gap-y-10",
          "justify-items-center",
          "grid-cols-[repeat(auto-fit,minmax(300px,1fr))]"
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
