"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NameLogo } from "./name-logo";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../button";
import { useScroll } from "@/app/hooks/useScroll";

export const MenuBar = () => {
  const isScrollingUp = useScroll();

  return (
    <div
      className={`fixed w-full top-0 z-10 justify-around items-center bg-gradient-to-b from-background to-transparent transition-all duration-700 pt-10 flex flex-row gap-5 
       ${isScrollingUp ? "translate-y-0" : "-translate-y-full"}`}
    >
      <NameLogo className="lg:text-3xl text-lg" />
      <section className="flex gap-5 justify-between">
        <FontAwesomeIcon
          size="4x"
          icon={faFileDownload}
          className="p-2 text-text text-3xl"
        />
        <Button style="outline" className="lg:text-3xl text-nowrap text-lg">
          let&apos;s talk
        </Button>
      </section>
    </div>
  );
};
