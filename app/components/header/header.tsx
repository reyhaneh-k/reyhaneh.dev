import { Frame } from "./frame";
import { Portrait } from "./portrait";
import { Summary } from "./summary";
export const Header = () => {
  return (
    <div
      className="h-full bg-background flex md:flex-row flex-col items-center justify-center"
      id="header"
    >
      <Frame>
        <Portrait />
        <Summary />
      </Frame>
    </div>
  );
};
