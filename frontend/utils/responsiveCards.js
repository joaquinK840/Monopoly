// initResponsiveCards.js
export function initResponsiveCards() {
  const center = document.querySelector(".center");
  const cards = document.querySelector(".cards");
  const board = document.querySelector(".board");

  if (!center || !cards || !board) return;

  function relocateCards() {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 768 && screenWidth <= 1024) {
      // 🔹 Tablet: mover las cards dentro de .center
      if (!center.contains(cards)) {
        center.appendChild(cards);
      }
    }
  }

  // Ejecutar al inicio y cuando cambie el tamaño
  relocateCards();
  window.addEventListener("resize", relocateCards);
}
