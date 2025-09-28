const API_URL = "http://127.0.0.1:5000/score-recorder";

/**
 * Guarda un usuario en el backend con score definido.
 * @param {string} username - nombre del jugador
 * @param {string} countryCode - código del país (ej: "co")
 * @param {number} score - puntaje inicial del jugador
 */
export async function saveUser(username, countryCode, score) {
  const payload = {
    nick_name: String(username).trim(),
    score: Number(score) || 0, // usa el score recibido, si viene vacío se pone 0
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
