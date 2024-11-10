import { Tag } from "../tag";
import { Atom } from "./atom/atom";

export const Skills = () => {
  return (
    <div
      id="skills"
      className="md:p-10 md:m-20 md:mt-8 p-5 m-2 h-[30rem] w-full flex flex-col md:flex-row"
    >
      <Tag tag="h2" lines={1} className="text-4xl basis-1/2 text-text">
        Skills
      </Tag>
      <Atom className="self-end basis-1/2" />
    </div>
  );
};
