import {showPlayers, getPlayersCount} from '../controllers/players.js';

export function renderBoard(data) {
   // Llamar a la función para mostrar los jugadores
  if (!data) return;

  
  showPlayers();// muestra los jugadores en el board

  console.log("Número de jugadores actuales:", getPlayersCount());

  const sections = ["top", "right", "bottom", "left"];

  sections.forEach((section) => {
    const items = data[section];

    items.forEach((item) => {
      // Buscar la celda cuyo id coincide con el del JSON
      const cell = document.getElementById(`cell-${item.id}`);

      if (cell) {
        cell.textContent = item.name;
      }
    });
  });
}