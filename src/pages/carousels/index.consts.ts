import img from "@/assets/images/carousel1/post_01_perceived_performance_carousel.avif";

import { CarouselStackProps } from "./components/carouselStack/index.types";
const carouselMockData: CarouselStackProps[] = [
  {
    id: "1",
    title: "Carousel 1",
    description: "Description 1",
    data: [
      img,
      img,
      img,
      img,
      img,
      img,
      img,
      img,
      img,
      img,
    ],
  },
  {
    id: "2",
    title: "Carousel 2",
    description: "Description 2",
    data: [
      img,
      img,
      img,
      img,
      img,
      img,
      img,
      img,
      img,
      img,
    ],
  },
  {
    id: "3",
    title: "Carousel 3",
    description: "Description 3",
    data: [
      img,
      img,
      img,
      img,
      img,
      img,
      img,
      img,
      img,
      img,
    ],
  },
  {
    id: "4",
    title: "Carousel 4",
    description: "Description 4",
    data: [
      img,
      img,
      img,
      img,
      img,
      img,
      img,
      img,
      img,
      img,
    ],
  },
  {
    id: "5",
    title: "Carousel 5",
    description: "Description 5",
    data: [
      img,
      img,
      img,
      img,
      img,
      img,
      img,
      img,
      img,
      img,
    ],
  },
];

const carouselTexts = {
  title: "Carousels",
  description:
    "Slide-by-slide breakdowns, built for the LinkedIn feed.",
};
export { carouselMockData, carouselTexts };
