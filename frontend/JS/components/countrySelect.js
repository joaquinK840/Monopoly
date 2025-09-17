// js/components/countrySelect.js
export function renderCountrySelect(countries, selectId, previewId) {
  const select = document.getElementById(selectId);
  const flagPreview = document.getElementById(previewId);

  if (!select) return;

  // Reset opciones
  select.innerHTML = '<option value="">-- Selecciona un país --</option>';

  // Llenar el select con países
  countries.forEach((country) => {
    const [code, name] = Object.entries(country)[0];
    const option = document.createElement("option");
    option.value = code;
    option.textContent = name;
    select.appendChild(option);
  });

  // Escuchar cambios y mostrar bandera
  select.addEventListener("change", () => {
    const code = select.value.toLowerCase();
    if (code) {
      flagPreview.innerHTML = `
        <img src="https://flagcdn.com/48x36/${code}.png" 
             alt="Bandera" class="border rounded">
      `;
    } else {
      flagPreview.innerHTML = "";
    }
  });
}
