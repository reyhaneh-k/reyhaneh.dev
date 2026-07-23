import {
  useCallback,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
} from "react";

import { SCROLL_STATUS } from "./index.type";

const THROTTLE_TIME = 200;
const TOP_THRESHOLD = 8;

const useScroll = () => {
  const [scrollStatus, setScrollStatus] = useState<
    SCROLL_STATUS | undefined
  >(undefined);
  const [isAtTop, setIsAtTop] = useState(() =>
    typeof window === "undefined"
      ? true
      : window.scrollY <= TOP_THRESHOLD
  );
  const lastScrollY = useRef(
    typeof window === "undefined" ? 0 : window.scrollY
  );
  const throttleTimer = useRef<
    ReturnType<typeof setTimeout> | undefined
  >(undefined);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    setIsAtTop(currentScrollY <= TOP_THRESHOLD);

    if (currentScrollY > lastScrollY.current) {
      setScrollStatus(SCROLL_STATUS.DOWN);
    } else if (currentScrollY < lastScrollY.current) {
      setScrollStatus(SCROLL_STATUS.UP);
    }

    lastScrollY.current = currentScrollY;
  }, []);

  const handleWithThrottle = useEffectEvent(() => {
    if (throttleTimer.current) return;

    throttleTimer.current = setTimeout(() => {
      handleScroll();
      throttleTimer.current = undefined;
    }, THROTTLE_TIME);
  });

  useEffect(() => {
    window.addEventListener("scroll", handleWithThrottle, {
      passive: true,
    });
    return () => {
      window.removeEventListener(
        "scroll",
        handleWithThrottle
      );
      clearTimeout(throttleTimer.current);
    };
  }, []);

  return { scrollStatus, isAtTop };
};
export { useScroll };
