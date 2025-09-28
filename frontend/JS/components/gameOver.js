document.addEventListener("DOMContentLoaded", () => {
  const resultsContainer = document.getElementById("results");

  const players = JSON.parse(sessionStorage.getItem("players") || "[]");

  if (!players.length) {
    resultsContainer.innerHTML = "<p>No hay datos de jugadores.</p>";
    return;
  }

  // Ordenar de mayor a menor puntaje
  players.sort((a, b) => b.finalScore - a.finalScore);

  // Mostrar resultados
  resultsContainer.innerHTML = players.map((p, idx) => `
    <div class="player-result">
      <h2>${idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : ""} ${p.name}</h2>
      <p><strong>País:</strong> ${p.country || "N/A"}</p>
      <p><strong>Dinero:</strong> $${p.money}</p>
      <p><strong>Propiedades:</strong> ${p.properties.length}</p>
      <p><strong>Score Final:</strong> ${p.finalScore}</p>
    </div>
  `).join("");
});
