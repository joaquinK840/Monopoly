export function getCellInfoById(data, id) {
  const sections = ["bottom", "left", "top", "right"];

  for (const section of sections) {
    const items = data[section];
    const found = items.find((item) => item.id === id);
    if (found) return found;
  }

  return null;
}
