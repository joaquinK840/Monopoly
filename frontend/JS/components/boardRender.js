// Genera un tablero vacío en un grid 11x11 con 40 celdas alrededor
export function renderEmptyBoard() {
  const board = document.querySelector(".board");


  let id = 0;

  // 🔹 Fila inferior (row 11, col 11 → col 1)
  for (let col = 10; col >= 0; col--) {
    board.innerHTML += `<div class="cell" id="cell-${id}" style="grid-row: 11; grid-column: ${col + 1};"></div>`;
    id++;
  }

  // 🔹 Columna izquierda (row 10 → row 2, col 1)
  for (let row = 9; row >= 1; row--) {
    board.innerHTML += `<div class="cell" id="cell-${id}" style="grid-row: ${row + 1}; grid-column: 1;"></div>`;
    id++;
  }

  // 🔹 Fila superior (row 1, col 2 → col 11)
  for (let col = 0; col <= 9; col++) {
    board.innerHTML += `<div class="cell" id="cell-${id}" style="grid-row: 1; grid-column: ${col + 1};"></div>`;
    id++;
  }

  // 🔹 Columna derecha (row 2 → row 10, col 11)
  for (let row = 0; row <= 9; row++) {
    board.innerHTML += `<div class="cell" id="cell-${id}" style="grid-row: ${row + 1}; grid-column: 11;"></div>`;
    id++;
  }

}

// Decora las celdas usando la info del backend (colores, nombres, etc.)
export function decorateBoard(boardData) { // boardData viene del backend
    if (!boardData) {
        console.error("error: no board data to decorate");
        return;
    }
  Object.values(boardData).flat().forEach(cell => {
    const cellEl = document.getElementById(`cell-${cell.id}`);
    if (!cellEl) return;

     if ([0, 10, 20, 30].includes(cell.id)) {
        cellEl.classList.add("corner");
        cellEl.innerHTML = `<img src="../assets/images/${cell.id}.png" alt="${cell.name || ''}" class="corner-img" />`;
      return; // salimos aquí porque no queremos texto
    }

    if (cell.color) {
      cellEl.classList.add(cell.color); 
      // ej: si cell.color = "red" → class="cell red"
    }
  });
}
