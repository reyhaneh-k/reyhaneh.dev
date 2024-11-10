"use client";

import { useState } from "react";
import { NameLogoShort } from "./name-logo";
import { useScroll } from "./menu-bar-web";
import { HamburgerMenu } from "./hamburger-menu";

export const MenuMobile = () => {
  const isScrollingUp = useScroll();
  const [isRendered, render] = useState(false);

  return (
    <div
      className={`flex h-fit fixed  justify-between w-screen z-20 py-10 top-0 ps-5 transition-all duration-700 ${
        isScrollingUp || isRendered ? "translate-y-0" : "-translate-y-44"
      }`}
    >
      <NameLogoShort className="bg-gradient-to-bl from-background to-transparent h-fit p-3 rounded-md" />
      <HamburgerMenu render={render} isRendered={isRendered} />
    </div>
  );
};
