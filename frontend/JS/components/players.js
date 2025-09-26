
import { getPlayers } from "./login.js";

// Renderiza una card para cada jugador en el contenedor dado
export function renderAllPlayerCards(containerId) {
  let players = getPlayers();
  containerId.innerHTML = "";
  players.forEach(player => {
    const div = document.createElement("div");
    div.className = "player-container mb-3";
    div.innerHTML = renderCardPlayer(player);
    containerId.appendChild(div);
  });
}

export function renderCardPlayer(player) {
  return `
    <div class="container py-3">
      <div class="card shadow-sm" style="max-width: 200px;">
        <div class="card-body">
          <h5 class="card-title text-primary">${player.name}</h5>
          <div class="mb-2">
            <span class="fw-bold">País:</span> ${player.country}
          </div>
          <div class="mb-2">
            <span class="fw-bold">Dinero:</span> 1500
          </div>
          <div class="mb-3">
            <label for="propiedades" class="form-label fw-bold">Propiedades:</label>
            <select class="form-select" id="propiedades">
              <option selected>propiedades</option>
            </select>
          </div>
          <button class="btn btn-primary w-100">Acción</button>
        </div>
      </div>
    </div>
  `;
}