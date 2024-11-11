import { useRef, useState, useEffect } from "react";

export const useTypeWriter = (str: string) => {
  const text = useRef("|");
  const [index, setIndex] = useState(0);
  useEffect(() => {
    let timeOutId: NodeJS.Timeout | undefined = undefined;
    if (index < str.length) {
      timeOutId = setTimeout(() => {
        text.current = text.current.slice(0, text.current.length - 1);
        text.current += str[index] + "|";
        setIndex((index) => index + 1);
      }, 20);
    } else {
      clearTimeout(timeOutId);
    }
    return () => clearTimeout(timeOutId);
  }, [index]);
  return text.current;
};
