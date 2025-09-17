import { fetchBoard } from "../services/boardServices.js";
import { renderBoard } from "../components/board.js";
import { initDice } from "../components/dice.js";

document.addEventListener("DOMContentLoaded", async () => {
  initDice(); // inicializar dados

  const boardData = await fetchBoard();
  renderBoard(boardData); // mostrar tablero
});
