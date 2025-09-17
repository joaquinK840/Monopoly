// js/routes/countries.js
import { getCountries } from "../services/LoginCountryServices.js";
import { renderCountrySelect } from "../components/countrySelect.js";

document.addEventListener("DOMContentLoaded", async () => {
  const countries = await getCountries();
  renderCountrySelect(countries, "scoreboard", "flag-preview");
});
