// js/components/countrySelect.js
import { getCountries } from "../services/LoginCountryServices.js";

export async function loadCountries() {
  const selects = document.querySelectorAll(".scoreboard");
  const flagPreviews = document.querySelectorAll(".flag-preview");
  

  if (!selects.length) return;

  try {
    const countries = await getCountries();

    selects.forEach((select, index) => {
      // llenar cada <select>
      countries.forEach((country) => {
        const [code, name] = Object.entries(country)[0];

        const option = document.createElement("option");
        option.value = code;
        option.textContent = name;

        select.appendChild(option);
      });

      // evento de cambio en cada select
      select.addEventListener("change", () => {
        const selected = select.value;
        const preview = flagPreviews[index]; // el flag-preview correspondiente

        if (preview) {
          preview.innerHTML = `
            <img src="https://flagcdn.com/w40/${selected.toLowerCase()}.png"
                 alt="Bandera de ${selected}" width="40">
          `;
        }
      });
    });
    } catch (err) {
    console.error("Error cargando países:", err);
  }
}