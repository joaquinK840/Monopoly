import { renderPlayerContainers } from "../components/players.js";
import { setCurrentPlayerIndex, showTooltip } from "../components/showToolTip.js";
import { getPlayersCount } from "./players.js";

let currentPlayerIndex = 0; // índice del jugador actual
let playerPositions = []; // posición inicial de los jugadores
let jailStatus = []; // Estado de cárcel por jugador

// Crear el div de la ficha
function createTokenElement(playerIndex) {
  const players = JSON.parse(sessionStorage.getItem("players")) || [];
  const player = players[playerIndex];

  const token = document.createElement("div");
  token.id = `player-token-${playerIndex}`;
  token.classList.add("player-token");
  if (player && player.color) {
    token.style.backgroundColor = player.color; // Color propio del jugador
  }
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
  let currentPosition = playerPositions[currentPlayerIndex];

  // Si el jugador está en la cárcel (flag)
  if (jailStatus[currentPlayerIndex]) {
    // Si saca dobles, sale gratis
    if (dice1 === dice2) {
      jailStatus[currentPlayerIndex] = false;
      alert("¡Sacaste dobles y sales de la cárcel!");
      currentPosition = (currentPosition + steps) % 40;
    } else {
      jailStatus[currentPlayerIndex]++;
      if (jailStatus[currentPlayerIndex] > 3) {
        alert("No sacaste dobles en 3 turnos, pagas $50 para salir.");
        jailStatus[currentPlayerIndex] = false;
        currentPosition = (currentPosition + steps) % 40;
      } else {
        alert(`Estás en la cárcel. Intento ${jailStatus[currentPlayerIndex]}/3. Debes sacar dobles para salir o esperar 3 turnos y pagar $50.`);
        playerPositions[currentPlayerIndex] = 10;
        currentPlayerIndex = (currentPlayerIndex + 1) % playersCount;
        highlightSection(10);
        return;
      }
    }
  } else {
    // Si cae en la casilla 30, va a la cárcel
    if (currentPosition === 30) {
      alert("¡Vas a la cárcel!");
      currentPosition = 10;
      jailStatus[currentPlayerIndex] = 1; // primer turno en la cárcel
    } else {
      currentPosition = (currentPosition + steps) % 40;
    }
  }
  playerPositions[currentPlayerIndex] = currentPosition;

  // Mover ficha correspondiente
  const tokenId = `player-token-${currentPlayerIndex}`;
  const token = document.getElementById(tokenId);

  if (token) {
    const targetCell = document.getElementById(`cell-${currentPosition}`);
    targetCell.appendChild(token);
    setCurrentPlayerIndex(currentPlayerIndex);
    showTooltip(currentPosition);
  }

  console.log(`Jugador ${currentPlayerIndex + 1} avanzó ${steps} pasos y está en ${currentPosition}`);
  const container = document.getElementById("player");
  renderPlayerContainers(container, currentPlayerIndex);
  currentPlayerIndex = (currentPlayerIndex + 1) % playersCount;
  highlightSection(currentPosition);
}

export function restoreOwnedProperties() {
  const players = JSON.parse(sessionStorage.getItem("players")) || [];

  players.forEach(player => {
    if (player.properties && player.properties.length > 0) {
      player.properties.forEach(prop => {
        const cell = document.getElementById(`cell-${prop.id}`);
        if (cell) {
          // Crear un marcador visual del dueño
          let ownerMark = cell.querySelector(".owner-mark");
          if (!ownerMark) {
            ownerMark = document.createElement("div");
            ownerMark.className = "owner-mark rounded-circle border border-dark";
            ownerMark.style.width = "16px";
            ownerMark.style.height = "16px";
            ownerMark.style.background = player.color;
            ownerMark.title = `Propiedad de ${player.name}`;
            cell.appendChild(ownerMark);
          }
        }
      });
    }
  });
}
