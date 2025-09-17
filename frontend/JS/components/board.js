export function renderBoard(data) {
  if (!data) return;

  const sections = ["top", "right", "bottom", "left"];

  sections.forEach((section) => {
    const items = data[section];

    items.forEach((item) => {
      // Buscar la celda cuyo id coincide con el del JSON
      const cell = document.getElementById(`cell-${item.id}`);

      if (cell) {
        cell.textContent = item.name;
      }
    });
  });
}