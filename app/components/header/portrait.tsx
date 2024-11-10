import Image from "next/image";
import HeaderSvg from "@/public/header.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faCircleDot } from "@fortawesome/free-solid-svg-icons";
import { useId } from "react";
import { faStairs } from "@fortawesome/free-solid-svg-icons/faStairs";
export const Portrait = () => {
  return (
    <div className="relative p-8 m-8 md:w-3/5 md:h-full w-full h-2/5">
      {/* <Image
        src={HeaderSvg}
        width={600}
        height={600}
        alt="header svg decorations"
        className="absolute inset-0"
      /> */}

      <div className="right-0 bottom-0 absolute">
        <div className="flex flex-col gap-[0.3vw]">
          {Array(20)
            .fill(0)
            .map((_, row) => (
              <div className="flex gap-[0.3vw] h-[0.7vw]" key={useId()}>
                {Array(20)
                  .fill(0)
                  .map((_, col) => (
                    <FontAwesomeIcon
                      size="2xs"
                      icon={faCircle}
                      key={useId()}
                      className="text-primary w-1.5"
                    />
                  ))}
              </div>
            ))}
        </div>
      </div>
      <div className="top-0 left-0  absolute">
        <div className="flex flex-col gap-[0.3vw]">
          {Array(15)
            .fill(0)
            .map((_, row) => (
              <div className="flex gap-[0.3vw] h-[0.6vw]" key={useId()}>
                {Array(15)
                  .fill(0)
                  .map((_, col) => (
                    <FontAwesomeIcon
                      size="2xs"
                      icon={faCircleDot}
                      key={useId()}
                      className="text-highlight w-[0.6vw]"
                    />
                  ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
