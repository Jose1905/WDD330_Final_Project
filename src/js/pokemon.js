/* import { setLocalStorage, loadHeaderFooter } from "./utils.mjs";*/
import { loadHeaderFooter, loadPokemonData } from "./utils.mjs";

loadHeaderFooter();

const pokemonName = new URLSearchParams(window.location.search).get("name");
if (pokemonName) {
  loadPokemonData(pokemonName);
} else {
  console.error("No Pokémon name specified in the URL.");
}