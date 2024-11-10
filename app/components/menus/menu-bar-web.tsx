"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NameLogo } from "./name-logo";
import {
  faCloudDownloadAlt,
  faDownload,
  faFileDownload,
} from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../button";

export const useScroll = () => {
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [lastScrollPos, setLastScrollPos] = useState(0);
  const handleScroll = useCallback(() => {
    if (window.scrollY <= lastScrollPos) {
      setIsScrollingUp(true);
    } else {
      setIsScrollingUp(false);
    }
    setLastScrollPos(window.scrollY);
  }, [lastScrollPos]);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      handleScroll();
    });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);
  return isScrollingUp;
};
export const MenuBar = () => {
  const isScrollingUp = useScroll();

  return (
    <div
      className={`fixed top-0 z-10  bg-gradient-to-b from-background to-transparent transition-all duration-700 w-full text-text md:text-3xl text-lg pt-10 px-16 flex md:flex-row gap-5 flex-col justify-between items-center
       ${isScrollingUp ? "translate-y-0" : "-translate-y-44"}`}
    >
      <NameLogo />
      <section className="flex gap-5 justify-between w-full md:w-fit">
        <FontAwesomeIcon size="2x" icon={faFileDownload} className="p-2" />
        <Button style="outline" className="lg:text-3xl text-nowrap text-lg">
          let&apos;s talk
        </Button>
      </section>
    </div>
  );
};
