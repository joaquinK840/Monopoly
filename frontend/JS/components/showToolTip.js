import { getCellInfoById } from "../components/infoCell.js"; // para buscar info de la celda

// Mostrar tooltip con la info de la casilla

let boardData = null; // guardaremos el JSON del tablero

// Inyectar boardData desde fuera (para usar en tooltip)
export function setBoardData(data) {
  boardData = data;
}

export function showTooltip(cellId) {
  if (!boardData) return console.error("boardData no está definido");

  const card = document.getElementById("cell-info-card");
  const cellInfo = getCellInfoById(boardData, cellId);

  if (!cellInfo) {
    card.classList.add("hidden");
    return;
  }

  card.innerHTML = `
    <h3>${cellInfo.name}</h3>
    <p><strong>Tipo:</strong> ${cellInfo.type}</p>
    ${cellInfo.price ? `<p><strong>Precio:</strong> $${cellInfo.price}</p>` : ""}
    ${cellInfo.type === "property" || cellInfo.type === "railroad"? `<button class="btn btn-primary text-white">Comprar</button>` : ""}
  `;

  card.classList.remove("hidden");
}