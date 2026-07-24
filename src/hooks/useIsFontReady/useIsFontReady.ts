import { useLayoutEffect, useState } from "react";

const useIsFontReady = () => {
  const [isFontReady, setIsFontReady] = useState(false);
  useLayoutEffect(() => {
    document.fonts.ready
      .then(() => {
        setIsFontReady(true);
      })
      .catch(() => {
        setIsFontReady(false);
      });
  }, []);
  if (!("document" in globalThis)) return false;

  return isFontReady;
};
export { useIsFontReady };
