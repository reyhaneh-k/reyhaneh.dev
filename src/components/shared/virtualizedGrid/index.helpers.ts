function getDefaultScrollElement() {
  return (
    document.scrollingElement ?? document.documentElement
  );
}

function getListScrollOffset(
  element: HTMLElement,
  scrollElement: Element
) {
  const listRect = element.getBoundingClientRect();
  const scrollRect = scrollElement.getBoundingClientRect();

  return (
    listRect.top -
    scrollRect.top +
    getScrollTop(scrollElement)
  );
}

function getScrollTop(scrollElement: Element) {
  if (
    scrollElement === document.documentElement ||
    scrollElement === document.body
  ) {
    return window.scrollY;
  }

  return scrollElement.scrollTop;
}

function getColumnCount(
  gridWidth: number,
  minColumnWidth: number,
  gap: number
) {
  return Math.max(
    1,
    Math.floor((gridWidth + gap) / (minColumnWidth + gap))
  );
}

export {
  getColumnCount,
  getDefaultScrollElement,
  getListScrollOffset,
  getScrollTop,
};
