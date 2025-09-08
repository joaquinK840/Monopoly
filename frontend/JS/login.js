

fetch("http://127.0.0.1:5000/countries")
  .then((res) => res.json())
  .then((data) => {
    const select = document.getElementById("scoreboard");
    select.innerHTML = '<option value="">-- Selecciona un país --</option>';

    data.forEach((country) => {
      // obtener la clave y el valor del objeto
      const [code, name] = Object.entries(country)[0];

      const option = document.createElement("option");
      option.value = code;   // valor real (ej: 'us')
      option.textContent = name; // texto visible (ej: 'United States')
      select.appendChild(option);
    });
  })
  .catch((err) => console.error("Error cargando datos:", err));


