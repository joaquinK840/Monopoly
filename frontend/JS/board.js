// Lógica para lanzar dados y mostrar el resultado visualmente
function lanzarDados() {
    // Genera dos números aleatorios entre 1 y 6
    const dado1 = Math.floor(Math.random() * 6) + 1;
    const dado2 = Math.floor(Math.random() * 6) + 1;
    mostrarResultadoDados(dado1, dado2);
}


function crearDadoHTML(valor) {
    // Representación de los puntos del dado
    const puntos = [
        [],
        [4],
        [0, 8],
        [0, 4, 8],
        [0, 2, 6, 8],
        [0, 2, 4, 6, 8],
        [0, 2, 3, 5, 6, 8]
    ];
    let dots = '';
    for (let i = 0; i < 9; i++) {
        dots += `<span class="dot${puntos[valor].includes(i) ? ' filled' : ''}"></span>`;
    }
    return `<div class="dado-visual">${dots}</div>`;
}

function mostrarResultadoDados(dado1, dado2) {
    const contenedor = document.getElementById('resultado-dados');
    if (contenedor) {
        contenedor.innerHTML = `
            ${crearDadoHTML(dado1)}
            ${crearDadoHTML(dado2)}
        `;
    }
}

// Asocia el evento al botón si existe
document.addEventListener('DOMContentLoaded', function() {
    const boton = document.getElementById('boton-lanzar-dados');
    if (boton) {
        boton.addEventListener('click', lanzarDados);
    }

    // Agregar estilos para los dados visuales si no existen
    if (!document.getElementById('estilos-dados')) {
        const style = document.createElement('style');
        style.id = 'estilos-dados';
        style.innerHTML = `
            .dado-visual {
                width: 50px;
                height: 50px;
                background: #fff;
                border: 2px solid #333;
                border-radius: 10px;
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                grid-template-rows: repeat(3, 1fr);
                gap: 2px;
                margin: 0 10px;
                box-shadow: 2px 2px 8px #aaa;
            }
            .dado-visual .dot {
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background: transparent;
                display: block;
                margin: auto;
            }
            .dado-visual .dot.filled {
                background: #222;
            }
        `;
        document.head.appendChild(style);
    }
});
