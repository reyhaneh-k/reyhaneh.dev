"use client";
import { useState, useEffect } from "react";
import { MenuMobile } from "./hamburger-menu-mobile";
import { VerticalIndicator } from "./vertical-indicator-menu";
import { MenuBar } from "./menu-bar/menu-bar";

const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

  useEffect(() => {
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
