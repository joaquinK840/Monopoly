import { renderPlayerContainers } from "../components/players.js";
import { getPlayersCount } from "./players.js";
import { showTooltip, setCurrentPlayerIndex } from "../components/showToolTip.js";

let currentPlayerIndex = 0; // índice del jugador actual
let playerPositions = []; // posición inicial de los jugadores

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
    setCurrentPlayerIndex(currentPlayerIndex);
    showTooltip(currentPosition);
  }

  console.log(
    `Jugador ${currentPlayerIndex + 1} avanzó ${steps} pasos y está en ${currentPosition}`
  );

  const container = document.getElementById("player");
  renderPlayerContainers(container, currentPlayerIndex);
  
  // Pasar turno al siguiente jugador
  currentPlayerIndex = (currentPlayerIndex + 1) % playersCount;
  highlightSection(currentPosition);
}