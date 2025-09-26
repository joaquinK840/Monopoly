import { saveUser } from "../services/scoreService.js";
import { getPlayersCount } from "../controllers/players.js";

export function renderLogin() {
  return `
   <div class="card login-card d-flex justify-content-center align-items-center p-3">
    <form class="loginForm card-monopoly card p-4 shadow-sm" autocomplete="off">
      <h2 class="h5 text-center mb-3">Iniciar sesión</h2>

      <div class="mb-3">
        <label class="form-label">Nombre</label>
        <input name="name" type="text" class="form-control name-input" placeholder="Tu nombre" required>
      </div>

      <div class="mb-3">
        <label class="form-label">País</label>
        <select class="form-select scoreboard" name="country" required></select>
        <div class="flag-preview mt-2"></div>
      </div>

      <div class="d-grid">
        <button type="submit" class="btn btn-primary submit-btn">Ingresar</button>
      </div>

      <div class="error-msg text-danger mt-2" ></div>
    </form>

    <!-- Contenedor del jugador cuando la card está ocupada -->
    <div class="player-slot w-100 mt-3"></div>
  </div>
  `;
}

export function setupLogin() {
  const forms = Array.from(document.querySelectorAll(".loginForm"));
  if (!forms.length) return;

  let players = JSON.parse(sessionStorage.getItem("players") || "[]");

  function refreshUI() {

    players = JSON.parse(sessionStorage.getItem("players") || "[]");

    console.log("Jugadores actuales:", players);
    forms.forEach((form, idx) => {
      const playerSlot = form.parentElement.querySelector(".player-slot");
      const errorBox = form.querySelector(".error-msg");

      errorBox.style.display = "none";

      if (players[idx]) {
        const player = players[idx];
        form.style.display = "none";
        playerSlot.style.display = "block";
        playerSlot.innerHTML = `
          <div class="alert alert-success text-center mb-0">
            ✅ <strong>${player.name}</strong> (${player.country.toUpperCase()})
          </div>
        `;
      } else {
        form.style.display = "block";
        playerSlot.style.display = "none";
      }
    });

    refreshGoBoard();
  }

  console.log("Inicializando login con jugadores:", players);
  console.log("Cantidad de jugadores:", players);

  function refreshGoBoard() {
    const goBtn = document.querySelector(".goBoard");
    if (goBtn) goBtn.disabled = players.length < 2; // Usar getPlayersCount() para verificar el número de jugadores
    console.log('validacion')
  }

  forms.forEach((form, idx) => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const errorBox = form.querySelector(".error-msg");
      errorBox.style.display = "none";

      const nameInput = form.querySelector(".name-input");
      const countrySelect = form.querySelector(".scoreboard");
      const username = nameInput?.value?.trim();
      const country = countrySelect?.value;

      if (!username || !country) {
        errorBox.textContent = "Completa todos los campos";
        errorBox.style.display = "block";
        return;
      }

      if (players.length >= 4) {
        errorBox.textContent = "Máximo 4 jugadores permitidos";
        errorBox.style.display = "block";
        return;
      }

      

      try {
        await saveUser(username, country);

        if (!players.some(p => p.name === username)) {
          players.push({ name: username, country, ready: true });
          sessionStorage.setItem("players", JSON.stringify(players));
        }

      } catch (err) {
        console.error("❌ Error en login submit:", err);
        errorBox.textContent = `Error al guardar usuario: ${err.message || err}`;
        errorBox.style.display = "block";
      }
    });
  });

  // 🔥 Botón global al tablero (fuera de las cards)
  let globalBtn = document.querySelector(".global-board-btn");
  if (!globalBtn) {
    const container = document.querySelector(".login-card")?.parentElement;
    if (container) {
      const wrapper = document.createElement("div");
      wrapper.className = "d-flex justify-content-center mt-4";
      wrapper.innerHTML = `<button class="btn  btn-success goBoard global-board-btn" >Ir al tablero</button>`;
      container.appendChild(wrapper);

      const goBtn = wrapper.querySelector(".goBoard");
      goBtn.addEventListener("click", () => {
        players = JSON.parse(sessionStorage.getItem("players") || "[]");
        if (players.length < 2) {
          alert("Necesitas al menos 2 jugadores para continuar");
          console.log('necesitas al menos 2 jugadores para continuar')
          return;
        }
        window.location.href = "./board.html";
      });
    }
  }


  
}

export function getPlayers() {
  return JSON.parse(sessionStorage.getItem("players") || "[]");

  

}


console.log("Jugadores en sesión:", getPlayersCount());



