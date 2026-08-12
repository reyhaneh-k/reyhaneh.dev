export function isTouchDevice() {
  return (
    "ontouchstart" in window || navigator.maxTouchPoints > 0
  );
}

export function supportsHover() {
  const mediaQuery = window.matchMedia(
    "(any-hover: hover)"
  );
  return mediaQuery.matches;
}
