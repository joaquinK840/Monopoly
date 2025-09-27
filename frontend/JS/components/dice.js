// Lógica para ingreso manual de dados
export function lanzarDadosManual() {
  const val1 = parseInt(document.getElementById('input-dado1').value);
  const val2 = parseInt(document.getElementById('input-dado2').value);

  // Mostrar el resultado sin importar el rango
  mostrarResultadoDados(val1, val2);

  // 🚨 Mover token con los valores ingresados
  moveToken(val1, val2);
}

import { moveToken } from "../controllers/motion.js";

function crearDadoHTML(valor) {
  const puntos = [
    [],                           // 0
    [4],                          // 1
    [0, 8],                       // 2
    [0, 4, 8],                    // 3
    [0, 2, 6, 8],                 // 4
    [0, 2, 4, 6, 8],              // 5
    [0, 2, 3, 5, 6, 8],           // 6
  ];

  // Si el valor no está entre 1 y 6, evitamos error mostrando vacío
  let safeValor = (valor >= 1 && valor <= 6) ? valor : 0;

  let dots = "";
  for (let i = 0; i < 9; i++) {
    dots += `<span class="dot${puntos[safeValor].includes(i) ? " filled" : ""}"></span>`;
  }
  return `<div class="dado-visual">${dots}</div>`;
}

export function lanzarDados() {
  const dado1 = Math.floor(Math.random() * 6) + 1;
  const dado2 = Math.floor(Math.random() * 6) + 1;
  mostrarResultadoDados(dado1, dado2);

  // 🚨 Mover token con el resultado de los dados
  moveToken(dado1, dado2);
}

function mostrarResultadoDados(dado1, dado2) {
  const contenedor = document.getElementById("resultado-dados");
  if (contenedor) {
    contenedor.innerHTML = `
      <div class="d-flex align-items-center justify-content-center gap-3">
        ${crearDadoHTML(dado1)}
        ${crearDadoHTML(dado2)}
      </div>
      <div class="resultado-numero" style="margin-top:10px;font-size:1.3rem;font-family:'Luckiest Guy',cursive;color:#e63946;">
        <span>¡Sacaste <b>${dado1 + dado2}</b>!</span>
      </div>
    `;
  }
}

export function initDice() {
  const boton = document.getElementById("boton-lanzar-dados");
  if (boton) {
    boton.addEventListener("click", lanzarDados);
  }
  const botonManual = document.getElementById("boton-dados-manual");
  if (botonManual) {
    botonManual.addEventListener("click", lanzarDadosManual);
  }
}
