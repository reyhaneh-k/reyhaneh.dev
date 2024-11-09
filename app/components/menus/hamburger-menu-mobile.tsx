"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sectionsInfo, useInView } from "./menu-utilities";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useState } from "react";

export const MenuMobile = () => {
  const { inViewSection, sections } = useInView();
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
    <div className="fixed right-6 top-3 z-20 text-right ">
      <button
        className="text-6xl text-white"
        onClick={() => {
          if (!isMenuOpen) {
            render(true);
          } else {
            closeMenu();
          }
        }}
      >
        X
      </button>
      {isRendered && (
        <div
          className={`right-6 top-3 p-5 shadow-lg shadow-black rounded-lg h-fit w-fit text-text bg-background flex flex-col gap-7 items-start transition-all ${
            isMenuOpen
              ? "translate-y-0 opacity-100"
              : "translate-y-16 opacity-0"
          }`}
        >
          {sectionsInfo.map(({ icon, id, title }) => {
            return (
              <div
                key={id}
                className={`flex items-center gap-6 cursor-pointer w-full ${
                  inViewSection === id
                    ? `bg-highlight rounded-xl p-4 transition-all`
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
  );
};
