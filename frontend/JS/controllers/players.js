import { getPlayers } from "../components/login.js";


// Función para mostrar los jugadores en el elemento con id "jugadores"


// Función para obtener la cantidad de jugadores actuales
export function getPlayersCount() {
  const players = getPlayers();
  return Array.isArray(players) ? players.length : 0;
}