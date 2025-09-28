import { renderBoard } from "../components/infoBoard.js";
import { decorateBoard, renderEmptyBoard } from "../components/boardRender.js";
import { initDice } from "../components/dice.js";
import { renderAllTokens, restoreOwnedProperties } from "../controllers/motion.js";
import { setBoardData } from "../components/showToolTip.js";
import { fetchBoard } from "../services/boardServices.js";
import { getCellInfoById } from "../components/infoCell.js";
import { initResponsiveCards } from "../../utils/responsiveCards.js";
import { acabarJuego } from "../components/showToolTip.js";

document.addEventListener("DOMContentLoaded", async () => {

   renderEmptyBoard();

  initDice(); // inicializar dados

  const boardData = await fetchBoard();
  renderBoard(boardData); // mostrar tablero
  decorateBoard(boardData);
   initResponsiveCards();
  getCellInfoById(boardData);
  setBoardData(boardData); // inyectar datos del tablero para tooltips

    const finBtn = document.getElementById("btn-fin");
    if (finBtn) {
    finBtn.addEventListener("click", () => {
      console.log("Juego finalizado por el usuario.");
      acabarJuego();
      window.location.href = "fin.html";
    });
  }


  renderAllTokens()
  restoreOwnedProperties()
});