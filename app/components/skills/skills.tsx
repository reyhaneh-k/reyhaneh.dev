import { Tag } from "../tag";
import { Atom } from "./atom/atom";

export const Skills = () => {
  return (
    <div id="skills" className="md:mt-40 px-20 mt-10 h-[40rem]">
      {/* <Tag tag="h2" lines={1} className="text-4xl basis-1/2 text-text">
        Skills
      </Tag> */}
      <Atom className="self-end" />
    </div>
  );
};
