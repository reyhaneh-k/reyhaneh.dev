"use client";

import { useEffect, useState } from "react";

const useFollowCursor = () => {
  const [cursorPosition, setPosition] = useState([100, 100]);
  const handleEvent = (event: MouseEvent) => {
    setPosition([event.pageX, event.pageY]);
  };
  useEffect(() => {
    document.addEventListener("mousemove", handleEvent);
    return () => document.removeEventListener("mousemove", handleEvent);
  });
  return cursorPosition;
};
export const CursorLight = () => {
  const pos = useFollowCursor();

  return (
    <div
      className={`absolute w-96 h-96 z-10 opacity-5 rounded-full bg-white -top-48 -left-48 origin-center`}
      style={{
        transform: `translate(${pos[0]}px, ${pos[1]}px)`,
        background: "radial-gradient(#EAEAEA,#1A1A2E, #1A1A2E)",
      }}
    >
      {" "}
    </div>
  );
};
