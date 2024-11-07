import { Frame } from "./frame";

export const Header = () => {
  return (
    <div
      className="h-[800px] w-full bg-background flex md:flex-row flex-col items-center justify-center"
      id="header"
    >
      <Frame></Frame>
    </div>
  );
};
