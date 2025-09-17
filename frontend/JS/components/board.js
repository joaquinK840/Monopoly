export function renderBoard(data) {
  if (!data) return;

  const sections = ["top", "right", "bottom", "left"];

  sections.forEach((section) => {
    const cells = Array.from(document.querySelectorAll(".cell")).filter(
      (cell) => cell.textContent.trim() === section
    );

    const items = data[section];

    cells.forEach((cell, index) => {
      if (items[index]) {
        cell.textContent = items[index].name;
      } else {
        cell.textContent = "";
      }
    });
  });
}
