import { ReactNode } from "react";

export const FloatingText = ({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`md:p-7 p-3 z-20 text-text w-fit bg-transparent shadow-md backdrop-brightness-50 md:rounded-3xl rounded-xl shadow-black backdrop-grayscale ${className}`}
    >
      {children}
    </div>
  );
};
