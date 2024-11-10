"use client";
import { useState, useEffect } from "react";
import { MenuMobile } from "./menu-bar-mobile";
import { VerticalIndicator } from "./vertical-indicator-menu";
import { MenuBar } from "./menu-bar-web";

export const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < breakpoint);

    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
};

export const Menu = () => {
  const isMobile = useIsMobile();
  return (
    <>
      {isMobile ? (
        <MenuMobile />
      ) : (
        <>
          <VerticalIndicator />
          <MenuBar />
        </>
      )}
    </>
  );
};
