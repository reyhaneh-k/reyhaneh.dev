import {
  useCallback,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
} from "react";

import { SCROLL_STATUS } from "./index.type";

const THROTTLE_TIME = 200;

const useScroll = () => {
  const [scrollStatus, setScrollStatus] = useState<
    SCROLL_STATUS | undefined
  >(undefined);
  const [isAtTop, setIsAtTop] = useState(true);
  const lastScrollY = useRef<number>(0);
  const throttleTimer = useRef<
    ReturnType<typeof setTimeout> | undefined
  >(undefined);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    if (currentScrollY === 0) {
      setIsAtTop(true);
    } else {
      setIsAtTop(false);
    }

    if (currentScrollY > lastScrollY.current) {
      setScrollStatus(SCROLL_STATUS.DOWN);
    } else if (currentScrollY < lastScrollY.current) {
      setScrollStatus(SCROLL_STATUS.UP);
    }
  }, []);

  const handleWithThrottle = useEffectEvent(() => {
    if (throttleTimer.current) return;
    lastScrollY.current = window.scrollY;
    const timeout = setTimeout(() => {
      handleScroll();
      clearTimeout(throttleTimer.current);
      throttleTimer.current = undefined;
    }, THROTTLE_TIME);

    throttleTimer.current = timeout;
  });

  useEffect(() => {
    window.addEventListener("scroll", handleWithThrottle);
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
