import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  MutableRefObject,
} from "react";

export const useInView = (ref: MutableRefObject<any>) => {
  const [isInView, setIsInView] = useState(false);
  const observerCallBack = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        } else {
          setIsInView(false);
        }
      });
    },
    []
  );
  const observer = useMemo(
    () =>
      new IntersectionObserver(observerCallBack, {
        threshold: [0.2],
      }),
    [observerCallBack]
  );
  useEffect(() => {
    observer.observe(ref.current);

    return () => {
      observer.unobserve(ref.current);
    };
  }, [observerCallBack]);

  return { isInView };
};
