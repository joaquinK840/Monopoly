import {getPlayersCount} from '../utils/players.js';

let currentPlayerIndex = 0; // índice del jugador actual
let playerPositions = [];// posición inicial de los jugadores

// Crear el div de la ficha
function createTokenElement(playerIndex) {
  const token = document.createElement("div");
  token.id = `player-token-${playerIndex}`;
  token.textContent = "🏃";
  return token;
}

// Renderizar la ficha en la posición actual
export function renderAllTokens() {
  const playersCount = getPlayersCount();
  playerPositions = Array(playersCount).fill(0); // todos empiezan en la celda 0

  for (let i = 0; i < playersCount; i++) {
    const targetCell = document.getElementById(`cell-0`);
    targetCell.appendChild(createTokenElement(i));
  }
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
  }

  console.log(
    `Jugador ${currentPlayerIndex + 1} avanzó ${steps} pasos y está en ${currentPosition}`
  );

  // Pasar turno al siguiente jugador
  currentPlayerIndex = (currentPlayerIndex + 1) % playersCount;
}