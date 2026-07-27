import { CarouselStack } from "./components/carouselStack/CarouselStack";
import { carouselMockData } from "./index.consts";

function Carousles() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {carouselMockData.map((item) => (
        <CarouselStack key={item.id} {...item} />
      ))}
    </div>
  );
}

export default Carousles;
