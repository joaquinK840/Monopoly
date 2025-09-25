import { renderBoard } from "../components/infoBoard.js";
import { decorateBoard, renderEmptyBoard } from "../components/boardRender.js";
import { initDice } from "../components/dice.js";
import { renderAllTokens,setBoardData } from "../controllers/motion.js";
import { fetchBoard } from "../services/boardServices.js";
import { getCellInfoById } from "../components/infoCell.js";

document.addEventListener("DOMContentLoaded", async () => {

   renderEmptyBoard();

  initDice(); // inicializar dados

  const boardData = await fetchBoard();
  renderBoard(boardData); // mostrar tablero
  decorateBoard(boardData);
  getCellInfoById(boardData);
  setBoardData(boardData); // inyectar datos del tablero para tooltips

  renderAllTokens()
});