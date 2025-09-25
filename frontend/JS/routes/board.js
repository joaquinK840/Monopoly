import { fetchBoard } from "../services/boardServices.js";
import { renderBoard } from "../components/board.js";
import { initDice } from "../components/dice.js";
import { renderAllTokens } from "../components/motion.js";
import { renderEmptyBoard,decorateBoard } from "../components/boardRender.js";

document.addEventListener("DOMContentLoaded", async () => {

   renderEmptyBoard();

  initDice(); // inicializar dados

  const boardData = await fetchBoard();
  renderBoard(boardData); // mostrar tablero
  decorateBoard(boardData);

  renderAllTokens()
});