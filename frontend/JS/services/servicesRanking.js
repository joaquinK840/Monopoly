// Obtener usuarios
export async function getUsers() {
  try {
    const response = await fetch("http://127.0.0.1:5000/ranking");
    return await response.json();
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    return [];
  }
}

// Eliminar usuario
export async function deleteUser(id) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE",
    });
    return response.ok;
  } catch (error) {
    console.error("Error en la solicitud DELETE:", error);
    return false;
  }
}
