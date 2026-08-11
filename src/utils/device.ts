export function isTouchDevice() {
  return (
    "ontouchstart" in window || navigator.maxTouchPoints > 0
  );
}
export function supportsHover() {
  return (
    "hover" in window ||
    (("onwheel" in window || "onmousewheel" in window) &&
      "pointer" in document.documentElement.style)
  );
}
