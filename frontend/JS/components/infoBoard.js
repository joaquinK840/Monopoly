export function renderBoard(data) {
   // Llamar a la función para mostrar los jugadores
  if (!data) return;

  const sections = ["top", "right", "bottom", "left"];

  sections.forEach((section) => {
    const items = data[section];



    items.forEach((item) => {
      // Buscar la celda cuyo id coincide con el del JSON
      const cell = document.getElementById(`cell-${item.id}`);
      //console.log(item.name + " " + item.price + " " + item.type);
      if (cell) {
        cell.textContent = item.name;
      }
    });
  });
}