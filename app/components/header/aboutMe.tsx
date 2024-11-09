"use client";

import { useRef, useState, useEffect } from "react";
import { text } from "stream/consumers";

const useTypeWriter = (str: string) => {
  const text = useRef("");
  const [index, setIndex] = useState(0);
  useEffect(() => {
    let timeOutId: NodeJS.Timeout | undefined = undefined;
    if (index < str.length) {
      timeOutId = setTimeout(() => {
        text.current += str[index];
        setIndex((index) => index + 1);
      }, 20);
    } else {
      clearTimeout(timeOutId);
    }
    return () => clearTimeout(timeOutId);
  }, [index]);
  return text;
};

export const AboutMe = ({ className }: { className?: string }) => {
  const aboutMeText: string =
    "Passionate Front-End Developer with a strong foundation in modern web technologies, specializing in creating intuitive, responsive user interfaces.";
  const text = useTypeWriter(aboutMeText);
  return (
    <span
      className={`text-lg font-extralight text-text tracking-wide ${className}`}
    >
      {text.current}
    </span>
  );
};
