import { ReactNode } from "react";
export const Frame = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="bg-gradient-to-r from-secondary to-black w-[90%] h-[90%] rounded-2xl flex p-4 relative">
      <div className="bg-background rounded-2xl w-full h-full">{children}</div>
    </div>
  );
};
