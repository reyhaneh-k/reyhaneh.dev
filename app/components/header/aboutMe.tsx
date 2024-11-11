"use client";

import { useTypeWriter } from "@/app/hooks/useTypeWriter";

export const AboutMe = ({ className }: { className?: string }) => {
  const aboutMeText: string =
    "Passionate Front-End Developer with a strong foundation in modern web technologies, specializing in creating intuitive, responsive user interfaces.";
  const text = useTypeWriter(aboutMeText);
  return (
    <span
      className={`md:text-lg lg:text-xl lg:tracking-wide tracking-normal text-base font-extralight text-text ${className}`}
    >
      {text}
    </span>
  );
};
