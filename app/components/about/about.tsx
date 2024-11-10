import { Portrait } from "../about/portrait";
import { Tag } from "../tag";
import { Contours } from "./contour-background";
import { FloatingText } from "./floating-text";

const aboutSections = [
  "Self-driven frontend developer who began through self-directed learning",
  "Strong foundation in modern web technologies",
  "Focus on creating intuitive, responsive user interfaces",
  "Experience with Agile methodologies and collaborative development",
  "Background in Engineering, bringing unique problem-solving perspective",
  "Passionate about optimizing web application performance",
];
export const About = () => {
  return (
    <div id="about" className="md:p-10 md:m-20 p-5 m-2 relative h-[850px]">
      <div className="flex justify-between w-full">
        <Tag tag="h2" lines={1} className="text-4xl basis-1/2 text-text">
          About Me
        </Tag>
        <Portrait className="basis-1/3  h-full invisible md:visible" />
      </div>
      <div className="flex items-center justify-center h-full">
        <Contours className=" h-[1000px] absolute inset-0" />
        <section className="flex flex-col gap-6 w-fit h-ful items-center justify-around ">
          <FloatingText className="text-2xl text-text tracking-normal leading-normal md:tracking-wider md:leading-loose max-w-[800px]">
            <h1 className="text-secondary text-3xl tracking-wider m-5">
              Hello!
            </h1>
            I'm Reyhaneh, a{" "}
            <Tag selfClosing={true} tag="" className="text-secondary ">
              self-driven
            </Tag>{" "}
            frontend developer who began through self-directed learning. I have
            a strong foundation in{" "}
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
          {/* {aboutSections.map((section, i) => (
            <FloatingText key={i} className="w-fit text-center bg-transparent">
              {section}
            </FloatingText>
          ))} */}
        </section>
      </div>
    </div>
  );
};
