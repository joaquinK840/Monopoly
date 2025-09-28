import { getPlayers } from "./login.js";

export function renderPlayerContainers(containerId, currentPlayerIndex) {
  let players = getPlayers();
  console.log(players)
  containerId.innerHTML = ""; // Limpia el contenedor antes de renderizar

  const player = players[currentPlayerIndex];
  if (player) {
    const div = document.createElement("div");
    div.className = "player-container";
    div.innerHTML = renderCardPlayer(player);
    containerId.appendChild(div);

    // Botón hipotecar
    const btnHipotecar = div.querySelector(".btn-hipotecar");
    if (btnHipotecar) {
      btnHipotecar.onclick = function() {
        const select = div.querySelector("#propiedades");
        const propId = select.value;
        hipotecarPropiedad(player, propId);
        sessionStorage.setItem("players", JSON.stringify(players));
        renderPlayerContainers(containerId, currentPlayerIndex);
      };
    }

    // Botón deshipotecar
    const btnDeshipotecar = div.querySelector(".btn-deshipotecar");
    if (btnDeshipotecar) {
      btnDeshipotecar.onclick = function() {
        const select = div.querySelector("#propiedades");
        const propId = select.value;
        deshipotecarPropiedad(player, propId);
        sessionStorage.setItem("players", JSON.stringify(players));
        renderPlayerContainers(containerId, currentPlayerIndex);
      };
    }
  }
}

export function renderCardPlayer(player) {
  return `
  <div class="container ">
    <div class="card shadow-sm" style="max-width: 300px; min-width: 270px;">
      <div class="card-body">
        <div class="mb-2">
          <span style="display:inline-block;width:16px;height:16px;border-radius:50%;background:${player.color};border:2px solid #222;vertical-align:middle;"></span>
        </div>
        <h5 class="card-title text-primary">
          ${player.name}
        </h5>
        <div class="d-flex align-items-center justify-content-center gap-2">
          <p class=""fw-bold m-0">${player.country.toUpperCase()}</p>
          <p><img src="https://flagsapi.com/${player.country.toUpperCase()}/shiny/64.png" class="flag-img"></p>
        </div>
        <div class="mb-2">
          <span class="fw-bold">Dinero:</span> ${player.money}
        </div>
        <div class="mb-3">
          <label for="propiedades" class="form-label fw-bold">Propiedades:</label>
          <select class="form-select" id="propiedades">
          <option selected disabled>Selecciona una propiedad</option>
          ${player.properties && player.properties.length > 0 
            ? player.properties.map(p => `<option value="${p.id}">${p.name}${p.mortgaged ? ' (Hipotecada)' : ''}</option>`).join("") 
            : `<option selected disabled>No tienes propiedades</option>`}
          </select>
        </div>
        <div class="row mb-2">
          <div class="col-6 d-grid">
            <button class="btn btn-warning btn-hipotecar" type="button">Hipotecar</button>
          </div>
          <div class="col-6 d-grid">
            <button class="btn btn-success btn-deshipotecar" type="button">Deshipotecar</button>
          </div>
    </div>
  </div>
  `;
}

// Lógica hipotecar
export function hipotecarPropiedad(player, propId) {
  const propiedad = player.properties.find(p => p.id == propId);
  if (!propiedad) return alert("Selecciona una propiedad válida");
  if (propiedad.mortgaged) return alert("La propiedad ya está hipotecada");
  console.log("id: " + propId)
  console.log("players" + player)
  console.log("propiedades" + propiedad)
  console.log("hotel" + propiedad.hotel)
  console.log("casas: "+ propiedad.houses)

  
  // ✅ CAMBIO NUEVO:
  // ✅ CAMBIO: bloquear solo si la propiedad seleccionada tiene casas u hotel
  if ((propiedad.houses > 0) || propiedad.hotel) {
    return alert("No puedes hipotecar una propiedad que tenga casas u hotel.");
  }
  
    // Precio seguro como número
    let precio = parseInt(propiedad.price) || 0;
    if (precio <= 0) {
      return alert("La propiedad no tiene un precio válido para hipotecar");
    }

    let valorHipoteca = Math.floor(precio / 2);
    let saldo = parseInt(player.money) || 0;

    saldo += valorHipoteca;
    player.money = saldo;
    propiedad.mortgaged = true;

    alert(`Hipotecaste ${propiedad.name}. Recibes $${valorHipoteca}`);
  
}

// Lógica deshipotecar
export function deshipotecarPropiedad(player, propId) {
  const propiedad = player.properties.find(p => p.id == propId);
  console.log(propiedad);
  if (!propiedad) return alert("Selecciona una propiedad válida");
  if (!propiedad.mortgaged) return alert("La propiedad no está hipotecada");

  // Precio seguro como número
  let precio = parseInt(propiedad.price) || 0;
  if (precio <= 0) {
    return alert("La propiedad no tiene un precio válido para deshipotecar");
  }

  let valorHipoteca = Math.floor(precio / 2);
  const costo = Math.ceil(valorHipoteca * 1.1); // siempre redondea hacia arriba
  let saldo = parseInt(player.money) || 0;

  if (saldo < costo) {
    return alert(`No tienes suficiente dinero para deshipotecar. Necesitas $${costo}`);
  }

  propiedad.mortgaged = false;
  player.money = saldo - costo;
+
  alert(`Deshipotecaste ${propiedad.name}. Pagaste $${costo}`);
}
