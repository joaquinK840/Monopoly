import { getPlayers } from "./login.js";

export function renderPlayerContainers(containerId, currentPlayerIndex) {
  let players = getPlayers();

  // Limpia el contenedor antes de renderizar
  containerId.innerHTML = "";

  // Generar un div por cada jugador
const player = players[currentPlayerIndex];
  if (player) {
    const div = document.createElement("div");
    div.className = "player-container";
    div.innerHTML = renderCardPlayer(player);
    containerId.appendChild(div);
  }
}

export function renderCardPlayer(player) {
    return `
    <div class="container py-3">
        <div class="card shadow-sm" style="max-width: 200px;">
            <div class="card-body">
            <h5 class="card-title text-primary">${player.name}</h5>
            
            <div class="mb-2">
                <span class="fw-bold">Dinero:</span> ${player.money}
            </div>
            
            <div class="mb-3">
                <label for="propiedades" class="form-label fw-bold">Propiedades:</label>
                <select class="form-select" id="propiedades">
                ${player.properties.map(p => `<option value="${p.id}">${p.name}</option>`).join("")}
                </select>
            </div>
            
            <button class="btn btn-primary w-100">Acción</button>
            </div>
        </div>
    </div>
    `
}