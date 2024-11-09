"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sectionsInfo, useInView } from "./menu-utilities";
import {
  faArrowRight,
  faDownload,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useState } from "react";
import { MyNameMobile } from "./my-name";
import { useScroll } from "./menu-bar";

export const MenuMobile = () => {
  const { inViewSection, sections } = useInView();
  const isScrollingUp = useScroll();
  const [isMenuOpen, toggleMenu] = useState(false);
  const [isRendered, render] = useState(false);
  const closeMenu = useCallback(() => {
    toggleMenu(false);
    setTimeout(() => {
      render(false);
    }, 400);
  }, [close]);
  useEffect(() => {
    if (isRendered) {
      setTimeout(() => {
        toggleMenu(true);
      }, 100);
    }
  }, [isRendered]);

  return (
    <div
      className={`flex h-fit fixed justify-between w-full z-20 py-10 top-0 ps-5 transition-all duration-700 ${
        isScrollingUp || isRendered ? "translate-y-0" : "-translate-y-44"
      }`}
    >
      <MyNameMobile className="backdrop-blur h-fit p-3 rounded-md" />
      <div className="relative ">
        <div
          className=""
          onClick={() => {
            if (!isMenuOpen) {
              render(true);
            } else {
              closeMenu();
            }
          }}
        >
          <FontAwesomeIcon
            size={"4x"}
            className={`absolute z-20 top-0 right-8 text-6xl text-text cursor-pointer p-0 transition-all ${
              isMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
            icon={faMinus}
          />
          <FontAwesomeIcon
            size={"4x"}
            icon={faMinus}
            className={`absolute z-20 top-3 text-secondary right-8 text-6xl  cursor-pointer p-0 transition-all ${
              isMenuOpen ? "-rotate-45  -translate-y-1 " : ""
            }`}
          />{" "}
        </div>
        {isRendered && (
          <div
            className={`right-6 mt-20  p-5 shadow-lg shadow-black rounded-lg h-fit w-fit text-text bg-background flex flex-col gap-7 items-start transition-all ${
              isMenuOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-16 opacity-0"
            }`}
          >
            {sectionsInfo.map(({ icon, id, title }) => {
              return (
                <div
                  key={id}
                  className={`flex items-center gap-6 cursor-pointer w-full  ${
                    inViewSection === id
                      ? `border border-gray-500 shadow-inner shadow-primary rounded-xl p-4 transition-all`
                      : "transition-all"
                  }`}
                  onClick={() => {
                    sections.current?.[id]?.scrollIntoView({
                      behavior: "smooth",
                    });
                    closeMenu();
                  }}
                >
                  <FontAwesomeIcon icon={icon} />
                  <span className={`text-xl`}>{title}</span>
                </div>
              );
            })}
            <div className="flex">
              <section className="flex gap-5 justify-between w-full md:w-fit">
                <span className="tracking-widest gap-3 bg-secondary px-7 py-4 rounded-lg shadow shadow-blue-900 flex hover:shadow-inner hover:shadow-black cursor-pointer">
                  <FontAwesomeIcon icon={faDownload} />
                  CV
                </span>
                <span className="px-7 py-4 r">let&apos;s talk</span>
              </section>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
