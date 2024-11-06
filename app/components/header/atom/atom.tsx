import { Electron } from "./electron";
import { Orbit } from "./orbit";
import tsIcon from "@/public/tech-stack/typescript.png";
import jsIcon from "@/public/tech-stack/javascript.png";
import reactIcon from "@/public/tech-stack/react.png";
import htmlIcon from "@/public/tech-stack/html.png";
import cssIcon from "@/public/tech-stack/css.png";
import sassIcon from "@/public/tech-stack/sass.png";
import twIcon from "@/public/tech-stack/tailwind.png";
import bsIcon from "@/public/tech-stack/bootstrap.png";
import gitIcon from "@/public/tech-stack/git.png";
import gitHubIcon from "@/public/tech-stack/github.png";
import gitLabIcon from "@/public/tech-stack/gitlab.png";
import cIcon from "@/public/tech-stack/c++.png";
import javaIcon from "@/public/tech-stack/java.png";
import pythonIcon from "@/public/tech-stack/python.png";
import nextIcon from "@/public/tech-stack/nextjs.svg";
import tanstackIcon from "@/public/tech-stack/tanstack.png";

export const Atom = () => {
  return (
    <div className="relative md:w-[500px] md:h-[500px] w-[300px] h-[300px]">
      <div className="absolute w-full h-full bg-gradient-to-b from-transparent from-0% to-background z-10"></div>
      <Orbit size={1} />
      <Orbit size={2} />
      <Orbit size={3} />
      <Orbit size={4} />
      <Orbit size={5} />
      <Orbit size={6} />
      <Orbit size={7} />
      <Orbit size={8} />
      <Electron
        icon={tsIcon.src}
        alt="typescript"
        position={18}
        priority={true}
      />
      <Electron icon={jsIcon.src} alt="javascript" position={19} />
      <Electron icon={reactIcon.src} alt="react" position={20} />
      <Electron icon={nextIcon.src} alt="next.js" position={11} />
      <Electron icon={htmlIcon.src} alt="html" position={5} />
      <Electron icon={cssIcon.src} alt="css" position={12} />
      <Electron icon={twIcon.src} alt="tailwind" position={7} />
      <Electron icon={bsIcon.src} alt="bootstrap" position={8} />
      <Electron icon={sassIcon.src} alt="sass" position={9} />
      <Electron icon={tanstackIcon.src} alt="tanstack query" position={10} />
      <Electron icon={javaIcon.src} alt="java" position={6} />
      <Electron icon={pythonIcon.src} alt="python" position={13} />
      <Electron icon={cIcon.src} alt="c++" position={14} />
      <Electron icon={gitHubIcon.src} alt="github" position={15} />
      <Electron icon={gitIcon.src} alt="git" position={16} />
      <Electron icon={gitLabIcon.src} alt="gitlab" position={17} />
    </div>
  );
};
