/* fetch("http://127.0.0.1:5000/ranking")
.then((res) => res.json())
.then((data) => {
    const scoreboard = document.getElementById("scoreboard");
    data.forEach((player) => {
    const div = document.createElement("div");
    div.classList.add("player");
    div.innerHTML = `
        <span>${player.nick_name} (${player.country_code.toUpperCase()})</span>
        <strong>${player.score}</strong>
    `;
    scoreboard.appendChild(div);
    });
}) 
.catch((err) => console.error("Error cargando datos:", err)); */

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


