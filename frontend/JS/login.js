fetch("http://127.0.0.1:5000/countries")
  .then((res) => res.json())
  .then((data) => {
    const select = document.getElementById("scoreboard");
    const flagPreview = document.getElementById("flag-preview");

    select.innerHTML = '<option value="">-- Selecciona un país --</option>';

    data.forEach((country) => {
      const [code, name] = Object.entries(country)[0];
      const option = document.createElement("option");
      option.value = code;
      option.textContent = name;
      select.appendChild(option);
    });

    // Cuando el usuario cambia de país, mostramos la bandera
    select.addEventListener("change", () => {
      const code = select.value.toLowerCase();
      if (code) {
        flagPreview.innerHTML = `<img src="https://flagcdn.com/48x36/${code}.png" alt="Bandera" class="border rounded">`;
      } else {
        flagPreview.innerHTML = "";
      }
    });
  })
  .catch((err) => console.error("Error cargando datos:", err));
