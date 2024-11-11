"use client";
import { MenuMobile } from "./menu-bar-mobile";
import { VerticalIndicator } from "./vertical-indicator-menu";
import { MenuBar } from "./menu-bar-web";
import { useIsMobile } from "@/app/hooks/useIsMobile";

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
