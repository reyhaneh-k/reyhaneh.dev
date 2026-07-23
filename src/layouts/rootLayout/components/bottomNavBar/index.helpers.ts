const getMaskMetrics = (
  id: string,
  list: HTMLElement | null
): number | null => {
  if (!id || !list) return null;

  const item = list.querySelector<HTMLElement>(
    `[id="${CSS.escape(id)}"]`
  );
  if (!item) return null;

  const itemBox = item.getBoundingClientRect();
  const olBox = list.getBoundingClientRect();

  const centerX =
    itemBox.left + itemBox.width / 2 - olBox.left;

  return centerX;
};

export { getMaskMetrics };
