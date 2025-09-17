export async function fetchBoard() {
  try {
    const res = await fetch("http://127.0.0.1:5000/board");
    if (!res.ok) throw new Error("Error al obtener tablero");
    return await res.json();
  } catch (err) {
    console.error("Error cargando el tablero:", err);
    return null;
  }
}
