import { Frame } from "./frame";
import { Summary } from "./summary";

export const Header = () => {
  return (
    <div
      className="h-[800px] w-full bg-background flex md:flex-row flex-col items-center justify-center"
      id="header"
    >
      <Frame>
        <div className="w-2/3"></div>
        <Summary />
      </Frame>
    </div>
  );
};
