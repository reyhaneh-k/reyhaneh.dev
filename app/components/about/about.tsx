import { Tag } from "../tag";
import { Contours } from "./contour-background";
import { FloatingText } from "./floating-text";

export const About = () => {
  return (
    <div
      id="about"
      className="md:p-10 flex flex-col gap-10 md:gap-40 p-5 m-2 relative h-[30rem] md:h-[50rem] mt-20 md:mt-40"
    >
      <div className="flex justify-between">
        <Tag
          tag="h2"
          lines={1}
          className="md:text-4xl text-2xl basis-full text-text"
        >
          About Me
        </Tag>
      </div>
      <div className="flex items-center justify-center">
        <Contours className="absolute" />
        <FloatingText className="md:text-2xl text-xl text-text tracking-normal leading-normal md:tracking-wider md:leading-loose lg:max-w-[60vw]">
          <h1 className="text-secondary text-3xl tracking-wider m-5">Hello!</h1>
          I'm Reyhaneh, a{" "}
          <Tag selfClosing={true} tag="" className="text-secondary ">
            self-driven
          </Tag>{" "}
          frontend developer who began through self-directed learning. I have a
          strong foundation in{" "}
          <Tag selfClosing={true} tag="" className="text-secondary ">
            modern web technologies
          </Tag>{" "}
          & I'm passionate about creating{" "}
          <Tag selfClosing={true} tag="" className="text-secondary">
            intuitive, responsive
          </Tag>{" "}
          user interfaces. My background in Engineering, brings a unique{" "}
          <Tag selfClosing={true} tag="" className="text-secondary">
            problem solving
          </Tag>{" "}
          perspective to my skills stack.
        </FloatingText>
      </div>
    </div>
  );
};
