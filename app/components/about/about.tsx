import { Tag } from "../tag";
import { Contours } from "./contour-background";

export const About = () => {
  return (
    <div id="about" className="p-10 m-20 relative">
      <Contours className=" h-[1000px] w-full absolute" />
      <section className="w-fit">
        <Tag lines={2} tag="h1" className="text-5xl leading-normal">
          About Me
        </Tag>
      </section>
    </div>
  );
};
