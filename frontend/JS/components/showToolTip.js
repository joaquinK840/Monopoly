import { getCellInfoById } from "../components/infoCell.js"; // para buscar info de la celda
import { renderPlayerContainers } from "./players.js";

let boardData = null; // guardaremos el JSON del tablero
let currentPlayerIndex = 0; // vamos a sincronizarlo con board.js

// Inyectar boardData desde fuera (para usar en showTooltip)
export function setBoardData(data) {
  boardData = data;
}

// función que permite setear el jugador actual desde fuera
export function setCurrentPlayerIndex(idx) {
  currentPlayerIndex = idx;
}

export function showTooltip(cellId) {
  if (!boardData) return console.error("boardData no está definido");

  const card = document.getElementById("cell-info-card");
  const cellInfo = getCellInfoById(boardData, cellId);

  if (!cellInfo) {
    card.classList.add("hidden");
    return;
  }

  // Recuperar jugadores desde sessionStorage
  const players = JSON.parse(sessionStorage.getItem("players") || "[]");

  // Usamos la función nueva para generar el bloque dinámico
  const extraInfo = getExtraInfo(cellInfo, players);

  card.innerHTML = `
    <h3>${cellInfo.name}</h3>
    <p><strong>Tipo:</strong> ${cellInfo.type}</p>
    ${cellInfo.price ? `<p><strong>Precio:</strong> $${cellInfo.price}</p>` : ""}
    ${extraInfo}
  `;

  // Aquí enganchamos el evento del botón
  const testBtn = document.getElementById("bt");
  if (testBtn) {
    testBtn.addEventListener("click", () => buyProperty(cellInfo));
  }

  card.classList.remove("hidden");
}

// 
function buyProperty(cell) {
  console.log("Comprando propiedad:", cell);

  // 1. Obtener jugadores y jugador actual
  let players = JSON.parse(sessionStorage.getItem("players") || "[]");
  console.log(players)
  const currentPlayer = players[currentPlayerIndex];
  
  if (!currentPlayer) {
    console.error("No hay jugador activo");
    return;
  }

  // 2. Verificar si ya tiene la propiedad
  const alreadyOwned = currentPlayer.properties.some(p => p.id === cell.id);
  if (alreadyOwned) {
    alert("Ya tienes esta propiedad");
    return;
  }

  // 3. Validar dinero suficiente
  if (cell.price && currentPlayer.money < cell.price) {
    alert("No tienes suficiente dinero para comprar esta propiedad");
    return;
  }

  // 4. Restar el dinero
  if (cell.price) {
    currentPlayer.money -= cell.price;
  }

  // 5. Agregar la propiedad al jugador
  currentPlayer.properties.push({
    id: cell.id,
    name: cell.name
  });

  // 6. Actualizar el sessionStorage
  sessionStorage.setItem("players", JSON.stringify(players));

  // 7. Volver a renderizar la card del jugador actual
  const container = document.getElementById("player");
  renderPlayerContainers(container, currentPlayerIndex);

  //console.log("Propiedad añadida:", currentPlayer.properties);
}

// Función que genera el contenido extra según el estado de la propiedad
function getExtraInfo(cellInfo, players) {
  if (cellInfo.type !== "property" && cellInfo.type !== "railroad") {
    return "";
  }

  // Buscar si la propiedad ya tiene dueño
  const owner = players.find(player =>
    player.properties.some(p => p.id === cellInfo.id)
  );

  if (owner) {
    return `<p><strong>Propiedad perteneciente a:</strong> ${owner.name}</p>`;
  }

  // Si no tiene dueño, devolver el botón
  return `<button id="bt" class="btn btn-primary text-white">Comprar</button>`;
}