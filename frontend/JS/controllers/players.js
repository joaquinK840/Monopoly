import { getPlayers } from "../components/login.js";


// Función para mostrar los jugadores en el elemento con id "jugadores"
export function showPlayers() {
  const jugadoresElement = document.getElementById("jugadores");
  if (jugadoresElement) {
    const players = getPlayers();
    jugadoresElement.textContent = Array.isArray(players)
      ? players.map(p => p.name).join(", ")
      : "";
  }
}

// Función para obtener la cantidad de jugadores actuales
export function getPlayersCount() {
  const players = getPlayers();
  return Array.isArray(players) ? players.length : 0;
}