document.addEventListener("DOMContentLoaded", function () {
    let btnCargar = document.getElementById("cargarUsuarios"); // Botón para cargar usuarios
    let tablaUsuarios = document.getElementById("tablaUsuarios"); // Tabla para mostrar usuarios

    // Evento para cargar usuarios al hacer clic en el botón
    btnCargar.addEventListener("click", cargarUsuarios); // Llama a la función cargarUsuarios

    // Función para obtener y mostrar usuarios
function cargarUsuarios() { // API GET
    fetch("http://127.0.0.1:5000/ranking")
        .then(response => response.json())
        .then(users => {
            console.log(users);
            tablaUsuarios.innerHTML = ""; // Limpiar contenido previo
            users.forEach(usuario => {
                tablaUsuarios.innerHTML += `
                <tr id="usuario-${usuario.id}">
                    <td>
                        <img src="https://flagsapi.com/${usuario.country_code.toUpperCase()}/shiny/64.png"
                    </td>
                    <td>${usuario.nick_name}</td>
                    <td>${usuario.score}</td>
                    <td>
                        <button class="btn btn-danger btn-sm" onclick="eliminarUsuario(${usuario.id})">
                            Eliminar
                        </button>
                    </td>
                </tr>
                `;
            });
        })
        .catch(error => console.error("Error al obtener los usuarios:", error));
}


    // Función para eliminar usuario con API DELETE
    function eliminarUsuario(id) {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method: "DELETE"
        })
            .then(response => { // Verifica si la respuesta es exitosa  "sirve para hacer lo de la hipoteca"
                if (response.ok) {
                    document.getElementById(`usuario-${id}`).remove();
                    console.log(`Usuario con ID ${id} eliminado`);
                } else {
                    console.error("Error al eliminar el usuario");
                }
            })
            .catch(error => console.error("Error en la solicitud DELETE:", error));
    }

    // Hacer la función eliminarUsuario accesible globalmente
    window.eliminarUsuario = eliminarUsuario;

});