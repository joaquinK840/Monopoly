fetch("http://127.0.0.1:5000/ranking")
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
.catch((err) => console.error("Error cargando datos:", err));
