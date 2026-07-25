const getMaskMetrics = (
  item: HTMLElement | null,
  list: HTMLElement | null
): number | null => {
  if (!item || !list) return null;

  const itemBox = item.getBoundingClientRect();
  const olBox = list.getBoundingClientRect();

  const centerX =
    itemBox.left + itemBox.width / 2 - olBox.left;

  return centerX;
};

export { getMaskMetrics };
