import { getUsers, deleteUser } from "../services/servicesRanking.js";
import { renderUserRow } from "../components/RankingUser.js";

document.addEventListener("DOMContentLoaded", () => {
  const btnCargar = document.getElementById("cargarUsuarios");
  const tablaUsuarios = document.getElementById("tablaUsuarios");

  // Evento para cargar usuarios
  btnCargar.addEventListener("click", async () => {
    const users = await getUsers();
    tablaUsuarios.innerHTML = ""; // limpiar
    users.forEach(usuario => {
      tablaUsuarios.innerHTML += renderUserRow(usuario);
    });

    // Agregar eventos a los botones de eliminar
    document.querySelectorAll(".eliminar-btn").forEach(btn => {
      btn.addEventListener("click", async (e) => {
        const id = e.target.dataset.id;
        const ok = await deleteUser(id);
        if (ok) document.getElementById(`usuario-${id}`).remove();
      });
    });
  });
});
