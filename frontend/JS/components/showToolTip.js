import { getCellInfoById } from "../components/infoCell.js"; // para buscar info de la celda
import { renderPlayerContainers } from "./players.js";

let boardData = null; // guardaremos el JSON del tablero
let currentPlayerIndex = 0; // vamos a sincronizarlo con board.js

// Inyectar boardData desde fuera (para usar en showTooltip)
export function setBoardData(data) {
  boardData = data;
}

// función que permite setear el jugador actual desde fuera
export function setCurrentPlayerIndex(idx) {
  currentPlayerIndex = idx;
}

export function showTooltip(cellId) {
  if (!boardData) return console.error("boardData no está definido");

  const card = document.getElementById("cell-info-card");
  const cellInfo = getCellInfoById(boardData, cellId);

  if (!cellInfo) {
    card.classList.add("hidden");
    return;
  }

  // Recuperar jugadores desde sessionStorage
  const players = JSON.parse(sessionStorage.getItem("players") || "[]");

  // Usamos la función nueva para generar el bloque dinámico
  const extraInfo = getExtraInfo(cellInfo, players);

  card.innerHTML = `
    <h3>${cellInfo.name}</h3>
    <p><strong>Tipo:</strong> ${cellInfo.type}</p>
    ${cellInfo.price ? `<p><strong>Precio:</strong> $${cellInfo.price}</p>` : ""}
    ${extraInfo}
  `;

  // Boton de compra
  const testBtn = document.getElementById("bt");
  if (testBtn) {
    testBtn.addEventListener("click", () => buyProperty(cellInfo));
  }

  // Botón de pagar renta
  const payRentBtn = document.getElementById("pay-rent-btn");
  if (payRentBtn) {
    payRentBtn.addEventListener("click", () => payRent(cellInfo));
  }

  // Botón construir casa
  const buildHouseBtn = document.getElementById("build-house-btn");
  if (buildHouseBtn) {
    buildHouseBtn.addEventListener("click", () => buildHouse(cellInfo));
  }

  // Botón construir hotel
  const buildHotelBtn = document.getElementById("build-hotel-btn");
  if (buildHotelBtn) {
    buildHotelBtn.addEventListener("click", () => buildHotel(cellInfo));
  }

  card.classList.remove("hidden");
}

// función para comprar propiedad
function buyProperty(cell) {
  console.log("Comprando propiedad:", cell);

  // 1. Obtener jugadores y jugador actual
  let players = JSON.parse(sessionStorage.getItem("players") || "[]");
  const currentPlayer = players[currentPlayerIndex];
  
  if (!currentPlayer) {
    console.error("No hay jugador activo");
    return;
  }

  // 2. Verificar si ya tiene la propiedad
  const alreadyOwned = currentPlayer.properties.some(p => p.id === cell.id);
  if (alreadyOwned) {
    alert("Ya tienes esta propiedad");
    return;
  }

  // 3. Validar dinero suficiente
  if (cell.price && currentPlayer.money < cell.price) {
    alert("No tienes suficiente dinero para comprar esta propiedad");
    return;
  }

  // 4. Restar el dinero
  if (cell.price) {
    currentPlayer.money -= cell.price;
  }

  // 5. Agregar la propiedad al jugador
  currentPlayer.properties.push({
    id: cell.id,
    name: cell.name,
    price: cell.price,
    mortgaged: false,
    houses: 0,
    hotel: false,
    withHouse: cell.rent?.withHouse || [],
    withHotel: cell.rent?.withHotel || 0,
  });

  // 6. Actualizar el sessionStorage
  sessionStorage.setItem("players", JSON.stringify(players));

  const cellEl = document.getElementById(`cell-${cell.id}`);
  if (cellEl) {
    cellEl.style.outline = `3px solid ${currentPlayer.color}`;
  }

  // 7. Volver a renderizar la card del jugador actual
  const container = document.getElementById("player");
  renderPlayerContainers(container, currentPlayerIndex);
}

function payRent(cell) {
  let players = JSON.parse(sessionStorage.getItem("players") || "[]");
  const currentPlayer = players[currentPlayerIndex];

  if (!currentPlayer) {
    console.error("No hay jugador activo");
    return;
  }

  // Buscar dueño de la propiedad
  const owner = players.find(player =>
    player.properties.some(p => p.id === cell.id)
  );

  if (!owner) {
    alert("Esta propiedad no tiene dueño.");
    return;
  }

  if (owner.name === currentPlayer.name) {
    alert("Eres el dueño, no pagas renta.");
    return;
  }

  // Buscar la propiedad dentro del dueño
  const propiedad = owner.properties.find(p => p.id === cell.id);

  // Verificar si está hipotecada
  if (propiedad && propiedad.mortgaged) {
    alert(`La propiedad ${propiedad.name} está hipotecada, no pagas renta.`);
    return;
  }

  // Calcular renta dinámica
  const rent = calculateRent(cell, propiedad);
  
  // Validar dinero suficiente
  if (currentPlayer.money < rent) {
    alert("No tienes suficiente dinero para pagar la renta.");
    return;
  }

  // Transferir dinero
  currentPlayer.money -= rent;
  owner.money += rent;

  alert(`Pagaste $${rent} de renta a ${owner.name}`);

  // Guardar cambios
  sessionStorage.setItem("players", JSON.stringify(players));

  // Actualizar tablero y cartas
  const container = document.getElementById("player");
  renderPlayerContainers(container, currentPlayerIndex);

  // Habilitar nuevamente el dado (desbloquear turno)
}

function buildHouse(cell) {
  let players = JSON.parse(sessionStorage.getItem("players") || "[]");
  const currentPlayer = players[currentPlayerIndex];
  const propiedad = currentPlayer.properties.find(p => p.id === cell.id);

  if (!propiedad) return alert("No posees esta propiedad.");
  if (propiedad.mortgaged) return alert("No puedes construir en una propiedad hipotecada.");
  if (propiedad.hotel) return alert("Ya hay un hotel en esta propiedad.");
  if (propiedad.houses >= 4) return alert("Debes construir un hotel después de 4 casas.");

  const cost = 100;
  if (currentPlayer.money < cost) return alert("No tienes suficiente dinero para construir una casa.");

  currentPlayer.money -= cost;
  propiedad.houses += 1;

  alert(`Construiste una casa en ${propiedad.name}. Ahora tiene ${propiedad.houses} casas.`);

  sessionStorage.setItem("players", JSON.stringify(players));
  console.log(players)
  const container = document.getElementById("player");
  renderPlayerContainers(container, currentPlayerIndex);
  showTooltip(cell.id);
}

// CAMBIO NUEVO: construir hotel
function buildHotel(cell) {
  let players = JSON.parse(sessionStorage.getItem("players") || "[]");
  const currentPlayer = players[currentPlayerIndex];
  const propiedad = currentPlayer.properties.find(p => p.id === cell.id);

  if (!propiedad) return alert("No posees esta propiedad.");
  if (propiedad.mortgaged) return alert("No puedes construir en una propiedad hipotecada.");
  if (propiedad.hotel) return alert("Ya existe un hotel en esta propiedad.");
  if (propiedad.houses < 4) return alert("Debes tener 4 casas antes de construir un hotel.");

  const cost = 250;
  if (currentPlayer.money < cost) return alert("No tienes suficiente dinero para construir un hotel.");

  currentPlayer.money -= cost;
  propiedad.houses = 0;
  propiedad.hotel = true;

  alert(`Construiste un hotel en ${propiedad.name}.`);

  sessionStorage.setItem("players", JSON.stringify(players));
  const container = document.getElementById("player");
  renderPlayerContainers(container, currentPlayerIndex);
  showTooltip(cell.id);
}

// Función que genera el contenido extra según el estado de la propiedad
function getExtraInfo(cellInfo, players) {
  if (cellInfo.type !== "property" && cellInfo.type !== "railroad") {
    return "";
  }

  // Buscar si la propiedad ya tiene dueño
  const owner = players.find(player =>
    player.properties.some(p => p.id === cellInfo.id)
  );

  if (owner) {
    // Buscar la propiedad dentro del dueño
    const propiedad = owner.properties.find(p => p.id === cellInfo.id);
    const currentPlayer = players[currentPlayerIndex];

    const todasLasCeldas = Object.values(boardData).flat();
    console.log(todasLasCeldas)

    // Filtrar solo las propiedades del mismo color
    const propiedadesMismoColor = todasLasCeldas.filter(c => c.color === cellInfo.color && c.type === "property");
    const tieneTodas = propiedadesMismoColor.every(c => currentPlayer.properties.some(p => p.id === c.id));

    const rentaActual = calculateRent(cellInfo, propiedad);
    console.log(rentaActual)

    if (propiedad && propiedad.mortgaged) {
      return `
        <p><strong>Propiedad hipotecada:</strong> ${propiedad.name}</p>
        <p><strong>Propiedad perteneciente a:</strong> ${owner.name}</p>
        <p><em>No genera renta</em></p>
      `;
    }

    if (owner.name !== currentPlayer.name) {
      return `
        <p><strong>Precio de Renta:</strong> ${rentaActual}</p>
        <p><strong>Propiedad perteneciente a:</strong> ${owner.name}</p>
        <button id="pay-rent-btn" class="btn btn-warning text-white">Pagar renta</button>
      `;
    }

    let buildBtn = "";
    if (tieneTodas && propiedad && !propiedad.mortgaged) {
      if (!propiedad.hotel) {
        if (propiedad.houses < 4) {
          buildBtn = `<button id="build-house-btn" class="btn btn-success">Construir Casa</button>`;
        } else {
          buildBtn = `<button id="build-hotel-btn" class="btn btn-danger">Construir Hotel</button>`;
        }
      }


      return `
        <p><strong>Precio de Renta:</strong> ${rentaActual}</p>
        <p><strong>Propiedad perteneciente a:</strong> ${owner.name}</p>
        <p><strong>Casas:</strong> ${propiedad.houses}, <strong>Hotel:</strong> ${propiedad.hotel ? "Sí" : "No"}</p>
        ${buildBtn}
      `;
    }

    return `
      <p><strong>Precio de Renta:</strong> ${rentaActual}</p>
      <p><strong>Propiedad perteneciente a:</strong> ${owner.name}</p>
    `;
  }

  // Si no tiene dueño, devolver el botón
  return `
    <p><strong>Precio de Renta:</strong> ${cellInfo.rent.base}</p>
    <button id="bt" class="btn btn-primary text-white">Comprar</button>
  `;
}

function calculateRent(cell, propiedad) {
  if (!cell.rent) return 0;

  console.log(propiedad)
  console.log(cell)

  // Renta base
  let rent = cell.rent.base || 0;

  if (!propiedad) return rent;

  // Si tiene hotel
  if (propiedad.hotel) {
    return cell.rent.withHotel || rent;
  }

  // Si tiene casas
  if (propiedad.houses > 0 && Array.isArray(cell.rent.withHouse)) {
    return cell.rent.withHouse[propiedad.houses - 1] || rent;
  }

  console.log(rent)

  return rent;

  
}

import { saveUser } from "../services/scoreService.js"; // importa tu servicio

export async function acabarJuego() {
  let players = JSON.parse(sessionStorage.getItem("players") || "[]");
  console.log("Jugadores al finalizar:", players);

  if (!players.length) {
    console.error("No hay jugadores en la partida.");
    return;
  }

  players = players.map(player => {
    let total = player.money;

    player.properties.forEach(prop => {
      if (prop.mortgaged) {
        total -= prop.price || 0; // restamos hipotecadas
        console.log("Propiedad hipotecada:", prop.name);
      } else {
        total += prop.price || 0; // sumamos propiedad
        console.log("Propiedad sumada:", prop.name);
        console.log("Precio propiedad:", prop.price);

        if (prop.houses && prop.houses > 0) {
          total += prop.houses * 100; // cada casa vale 100
        }

        if (prop.hotel) {
          total += 250; // cada hotel vale 250
        }
      }
    });

    return { ...player, finalScore: total };
  });

  // Guardamos scores finales en sessionStorage
  sessionStorage.setItem("players", JSON.stringify(players));
  console.log("✅ Scores finales calculados:", players);

  // Enviar cada jugador al backend
  for (const player of players) {
    try {
      await saveUser(player.name, player.country, player.finalScore);
      console.log(`✔ Puntaje enviado de ${player.name}: ${player.finalScore}`);
    } catch (err) {
      console.error(`❌ Error guardando score de ${player.name}:`, err);
    }
  }

  alert("El juego ha terminado. Los puntajes finales han sido enviados.");
}

