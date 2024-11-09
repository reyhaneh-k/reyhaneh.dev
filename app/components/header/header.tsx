import { Frame } from "./frame";
import { Summary } from "./summary";

export const Header = () => {
  return (
    <div
      className="h-[800px] w-full bg-background flex md:flex-row flex-col items-center justify-center"
      id="header"
    >
      <Frame>
        <div className="md:w-3/5 md:h-full w-full h-2/5"></div>
        <Summary />
      </Frame>
    </div>
  );
};
