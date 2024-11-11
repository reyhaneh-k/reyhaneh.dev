import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SectionId, sectionsInfo } from "./menu-utilities";
import { useInViewSection } from "@/app/hooks/useInViewSection";
import { useState } from "react";

export const VerticalIndicator = () => {
  const { inViewSection, sections } = useInViewSection();
  const [hoverItem, setHoverItem] = useState<SectionId>();
  return (
    <div className="fixed py-9 px-2 -left-1 w-1/12 max-w-32 top-1/3 min-w-20 h-fit text-text rounded-full shadow-lg shadow-secondary bg-background z-30 flex flex-col gap-7 items-center">
      <div className="bg-background inset-0 rounded-full z-0 absolute "></div>

      {sectionsInfo.map(({ icon, id, title }) => {
        return (
          <div key={id} className="relative items-center flex">
            <FontAwesomeIcon
              icon={icon}
              className={`cursor-pointer ${
                inViewSection === id
                  ? `scale-[270%] transition-all z-10`
                  : "transition-all z-10"
              }`}
              onClick={() => {
                sections.current?.[id]?.scrollIntoView({ behavior: "smooth" });
              }}
              onMouseOver={() => {
                setHoverItem(id);
              }}
            />
            <span
              className={`absolute text-xl  transition-all pl-5 pr-8 py-4 rounded-r-3xl w-48 -z-10 cursor-default opacity-0 ${
                hoverItem === id ? "animate-slide-right-left" : ""
              }`}
            >
              {title}
            </span>
          </div>
        );
      })}
    </div>
  );
};
