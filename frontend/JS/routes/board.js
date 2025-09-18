import { fetchBoard } from "../services/boardServices.js";
import { renderBoard } from "../components/board.js";
import { initDice } from "../components/dice.js";
import { renderToken, moveToken } from "../components/motion.js";

document.addEventListener("DOMContentLoaded", async () => {
  initDice(); // inicializar dados

  const boardData = await fetchBoard();
  renderBoard(boardData); // mostrar tablero

  renderToken(0)
});
