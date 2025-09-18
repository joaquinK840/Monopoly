let currentPosition = 0; // posición inicial del jugador

// Crear el div de la ficha
function createTokenElement() {
  const token = document.createElement("div");
  token.id = "player-token";
  token.textContent = "🏃"; // puedes cambiar el emoji si quieres
  return token;
}

// Renderizar la ficha en la posición actual
export function renderToken(position =0) {
  currentPosition = position;

  const targetCell = document.getElementById(`cell-${currentPosition}`);
  if (!targetCell) return;
  console.log(targetCell)

  

  // Si ya existe el token en otra celda, lo quitamos
  const existingToken = document.getElementById("player-token");
  if (existingToken) {
    existingToken.remove();
  }
  

  // Agregamos el token en la nueva celda
  targetCell.appendChild(createTokenElement());
}

// Mover ficha según los dados
export function moveToken(dice1, dice2) {
  const steps = dice1 + dice2;
  currentPosition = (currentPosition + steps) % 40; // tablero circular (0 a 39)
  renderToken(currentPosition);
  console.log(steps + " dados")
  console.log(currentPosition + " posicion en el tablero")
}
