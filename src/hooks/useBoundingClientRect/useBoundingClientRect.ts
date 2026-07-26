import { useLayoutEffect, useState } from "react";

export function useBoundingClientRect(
  ref: React.RefObject<HTMLElement | null>
) {
  const [rect, setRect] = useState<DOMRect | undefined>(
    undefined
  );
  useLayoutEffect(() => {
    const callback = () => {
      if (ref.current) {
        setRect(ref.current.getBoundingClientRect());
      }
    };
    callback();
    window.addEventListener("resize", callback);
    return () => {
      window.removeEventListener("resize", callback);
    };
  }, [ref]);
  return [rect, setRect] as const;
}
