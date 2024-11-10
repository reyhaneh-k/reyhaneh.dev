import { Tag } from "../tag";
import { AboutMe } from "./aboutMe";

export const Summary = () => {
  return (
    <div className="flex flex-col gap-10 md:w-2/5 w-full m-2">
      <Tag
        lines={2}
        tag="h1"
        className="md:text-3xl xl:text-4xl text-3xl tracking-wider text-text"
      >
        Hey
        <br />
        I'm{" "}
        <span className="text-secondary md:leading-loose leading-normal">
          Reyhaneh
        </span>
        <br />
        Frontend Developer
      </Tag>
      <Tag lines={3} tag="p">
        {<AboutMe />}
      </Tag>
    </div>
  );
};
