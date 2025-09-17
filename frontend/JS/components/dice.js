function crearDadoHTML(valor) {
  const puntos = [
    [],
    [4],
    [0, 8],
    [0, 4, 8],
    [0, 2, 6, 8],
    [0, 2, 4, 6, 8],
    [0, 2, 3, 5, 6, 8],
  ];
  let dots = "";
  for (let i = 0; i < 9; i++) {
    dots += `<span class="dot${puntos[valor].includes(i) ? " filled" : ""}"></span>`;
  }
  return `<div class="dado-visual">${dots}</div>`;
}

export function lanzarDados() {
  const dado1 = Math.floor(Math.random() * 6) + 1;
  const dado2 = Math.floor(Math.random() * 6) + 1;
  mostrarResultadoDados(dado1, dado2);
}

function mostrarResultadoDados(dado1, dado2) {
  const contenedor = document.getElementById("resultado-dados");
  if (contenedor) {
    contenedor.innerHTML = `
      ${crearDadoHTML(dado1)}
      ${crearDadoHTML(dado2)}
    `;
  }
}

export function initDice() {
  const boton = document.getElementById("boton-lanzar-dados");
  if (boton) {
    boton.addEventListener("click", lanzarDados);
  }
}
