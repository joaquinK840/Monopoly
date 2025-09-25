
const API_URL = "http://127.0.0.1:5000/score-recorder";

/**
 * Guarda un usuario en el backend con score inicial 0.
 * @param {string} username - nombre del jugador
 * @param {string} countryCode - código del país (ej: "co")
 */
export async function saveUser(username, countryCode) {
  const payload = {
    nick_name: String(username).trim(),
    score: 0,
    country_code: String(countryCode).trim().toLowerCase(),
  };

  console.log("saveUser -> payload:", payload);

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = text;
    }

    if (!res.ok) {
      console.error("saveUser -> server error:", res.status, parsed);
      throw new Error(parsed.error || `Error HTTP ${res.status}`);
    }

    console.log("saveUser -> success:", parsed);
    return parsed;
  } catch (err) {
    console.error("❌ saveUser error:", err);
    throw err;
  }
}

export async function getAllUsers() {
  try {
    const res = await fetch(API_URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Error al obtener usuarios");
    }

    const data = await res.json();
    return data; // objeto con los usuarios
  } catch (err) {
    console.error("❌ getAllUsers error:", err);
    throw err;
  }
}