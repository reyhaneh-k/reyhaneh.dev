import { useEffect, useState } from "react";

const useReducedMotion = () => {
  const [isReducedMotion, setIsReducedMotion] =
    useState(false);
  useEffect(() => {
    const mediaQuery = matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    const handleChange = () => {
      setIsReducedMotion(mediaQuery.matches);
    };
    handleChange();
    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener(
        "change",
        handleChange
      );
    };
  }, []);
  return isReducedMotion;
};

export { useReducedMotion };
