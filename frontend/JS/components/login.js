// js/components/login.js
export function renderLogin() {
  return `
    <div class="card d-flex justify-content-center align-items-center">
      <form id="loginForm" class="card-monopoly card p-4 shadow-sm" autocomplete="off">
        <h2 class="h5 text-center mb-3">Iniciar sesión</h2>
    
        <div class="mb-3">
          <label for="name" class="form-label">Nombre</label>
          <input id="name" name="name" type="text" class="form-control" placeholder="Tu nombre" required>
        </div>
    
        <div class="mb-3">
          <label for="country" class="form-label">País</label>
          <select class="form-select scoreboard" name="country" required></select>
          <div class="flag-preview" class="mt-2"></div>
        </div>
    
        <div class="d-grid">
          <button id="submitBtn" type="submit" class="btn btn-primary">
            <a href="./board.html" class="text-white text-decoration-none d-block">Entrar</a>
          </button>
        </div>
    
        <div id="error" class="text-danger mt-2" role="alert" aria-live="polite" style="display:none"></div>
      </form>
    </div>
  `;
}