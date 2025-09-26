import { renderPlayerContainers } from "../components/players.js";
import { getPlayersCount } from "./players.js";
import { getCellInfoById } from "../components/infoCell.js"; // para buscar info de la celda

let currentPlayerIndex = 0; // índice del jugador actual
let playerPositions = []; // posición inicial de los jugadores
let boardData = null; // guardaremos el JSON del tablero

// Inyectar boardData desde fuera (para usar en tooltip)
export function setBoardData(data) {
  boardData = data;
}


// Crear el div de la ficha
function createTokenElement(playerIndex) {
  const token = document.createElement("div");
  token.id = `player-token-${playerIndex}`;
  token.textContent = "🏃";
  return token;
}

// Renderizar todas las fichas al inicio
export function renderAllTokens() {
  const playersCount = getPlayersCount();
  playerPositions = Array(playersCount).fill(0); // todos empiezan en la celda 0

  for (let i = 0; i < playersCount; i++) {
    const targetCell = document.getElementById(`cell-0`);
    targetCell.appendChild(createTokenElement(i));
  }
}

// Mostrar tooltip con la info de la casilla
function showTooltip(cellId) {
  if (!boardData) return console.error("boardData no está definido");

  const tooltip = document.getElementById("cell-tooltip");
  const cellInfo = getCellInfoById(boardData, cellId);

  console.log("Mostrando tooltip para celda:", cellId, cellInfo);

  if (!cellInfo) {
    tooltip.classList.add("hidden");
    return;
  }

  const cellEl = document.getElementById(`cell-${cellId}`);
  if (!cellEl) return;

  // Posicionar tooltip sobre la celda
  const rect = cellEl.getBoundingClientRect();
  tooltip.style.left = `${rect.left + rect.width / 2}px`;
  tooltip.style.top = `${rect.top}px`;

  // Contenido del tooltip
  tooltip.innerHTML = `
    <strong>${cellInfo.name}</strong><br>
    Tipo: ${cellInfo.type}<br>
    ${cellInfo.price ? `Precio: $${cellInfo.price}` : ""}
  `;

  tooltip.classList.remove("hidden");
}

// Mover ficha según los dados
export function moveToken(dice1, dice2) {
  const steps = dice1 + dice2;
  const playersCount = getPlayersCount();

  // Posición del jugador actual
  let currentPosition = playerPositions[currentPlayerIndex];

  // Nueva posición (tablero circular de 40 celdas)
  currentPosition = (currentPosition + steps) % 40;
  playerPositions[currentPlayerIndex] = currentPosition;

  // Mover ficha correspondiente
  const tokenId = `player-token-${currentPlayerIndex}`;
  const token = document.getElementById(tokenId);

  if (token) {
    const targetCell = document.getElementById(`cell-${currentPosition}`);
    targetCell.appendChild(token);

    // Mostrar tooltip de la nueva celda
    showTooltip(currentPosition);
  }

  console.log(
    `Jugador ${currentPlayerIndex + 1} avanzó ${steps} pasos y está en ${currentPosition}`
  );

  const container = document.getElementById("player");
  renderPlayerContainers(container, currentPlayerIndex);
  // Pasar turno al siguiente jugador
  currentPlayerIndex = (currentPlayerIndex + 1) % playersCount;
}
