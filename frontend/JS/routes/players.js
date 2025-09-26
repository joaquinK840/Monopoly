import { renderAllPlayerCards } from "../components/players.js";

document.addEventListener("DOMContentLoaded", () => {
    const FirstContainer = document.getElementById("player")
    
    renderAllPlayerCards(FirstContainer)

});

