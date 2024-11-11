import { useState, useCallback, useEffect } from "react";

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
