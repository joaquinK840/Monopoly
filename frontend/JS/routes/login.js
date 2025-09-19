import { loadCountries } from "../components/countrySelect.js";
import { renderLogin } from "../components/login.js";

document.addEventListener("DOMContentLoaded", () => {
  const containers = document.querySelectorAll(".col");

  containers.forEach(container => {
    container.innerHTML = renderLogin();
  });

  // Aquí cargamos los países después de que el login ya está inyectado
  loadCountries();
});