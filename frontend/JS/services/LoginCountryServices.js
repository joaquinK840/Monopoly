// js/services/countryService.js
export async function getCountries() {
  try {
    const res = await fetch("http://127.0.0.1:5000/countries");
    if (!res.ok) throw new Error("Error al cargar países");
    return await res.json();
  } catch (err) {
    console.error("Error en countryService:", err);
    return [];
  }
}
