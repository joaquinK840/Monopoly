import { getCellInfoById } from "../components/infoCell.js"; // para buscar info de la celda
import { renderAllPlayerCards } from "../components/players.js";
import { getPlayersCount } from "./players.js";

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

function highlightSection(currentPosition) {
  const allCells = document.querySelectorAll(".board .cell");

  // Reset de estado
  allCells.forEach(cell => {
    cell.classList.remove("visible", "vertical-strip");
  });

  // Si la pantalla es grande, mostramos todo
  if (window.innerWidth >= 1024) {
    allCells.forEach(cell => cell.classList.add("visible"));
    return;
  }

  // Total de casillas en el tablero
  const totalCells = allCells.length;

  // En pantallas pequeñas → mostrar 2 atrás y 3 adelante
  let sectionCells = [];
  for (let offset = -2; offset <= 3; offset++) {
    let idx = (currentPosition + offset + totalCells) % totalCells; 
    sectionCells.push(idx);
  }

  // Mostrar solo esas
  sectionCells.forEach(id => {
    const cell = document.getElementById(`cell-${id}`);
    if (cell) {
      cell.classList.add("visible", "vertical-strip"); 
    }
  });
}



// Mostrar tooltip con la info de la casilla
function showTooltip(cellId) {
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
  `;

  card.classList.remove("hidden");
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
  renderAllPlayerCards(container);
  // Pasar turno al siguiente jugador
  currentPlayerIndex = (currentPlayerIndex + 1) % playersCount;
  highlightSection(currentPosition);
}