"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MyName } from "./my-name";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useState } from "react";

export const MenuBar = () => {
  const [visibility, setVisibility] = useState(true);
  const [lastScrollPos, setLastScrollPos] = useState(0);
  const handleScroll = useCallback(() => {
    if (window.scrollY <= lastScrollPos) {
      setVisibility(true);
    } else {
      setVisibility(false);
    }
    setLastScrollPos(window.scrollY);
  }, [lastScrollPos]);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      handleScroll();
    });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div
      className={`fixed top-0 z-20  transition-all duration-700 w-full bg-background  text-text md:text-3xl text-lg pt-10 px-16 flex md:flex-row gap-5 flex-col justify-between items-center
       ${visibility ? "translate-y-0" : "-translate-y-44"}`}
    >
      <MyName />
      <section className="flex gap-5 justify-between w-full md:w-fit">
        <span className="tracking-widest gap-3 bg-secondary px-7 py-4 rounded-lg shadow shadow-blue-900 flex hover:shadow-inner hover:shadow-black cursor-pointer">
          <FontAwesomeIcon icon={faDownload} />
          CV
        </span>
        <span className="  px-7 py-4 r">let&apos;s talk</span>
      </section>
    </div>
  );
};
