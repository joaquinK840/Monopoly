// js/routes/login.js
import { loadCountries } from "../components/countrySelect.js";
import { renderLogin, setupLogin } from "../components/login.js";

document.addEventListener("DOMContentLoaded", () => {
  const containers = document.querySelectorAll(".col");

  containers.forEach(container => {
    container.innerHTML = renderLogin();
  });

  // Ahora que ya se inyectaron los formularios:
  loadCountries();
  setupLogin();  // <- IMPORTANTE
});
