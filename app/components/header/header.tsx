import { Atom } from "./atom/atom";
import { Frame } from "./frame";

export const Header = () => {
  return (
    <div className="h-full w-full bg-background flex md:flex-row flex-col items-center justify-center">
      <Frame>
        <Atom />
      </Frame>
    </div>
  );
};
