/* import { setLocalStorage, loadHeaderFooter } from "./utils.mjs";*/
import { loadHeaderFooter } from "./utils.mjs";
import { fetchPokemonNames } from "./ExternalServices.mjs";
import { PokemonDetails } from "./pokemonDetails.mjs";

const pokemonNames = await fetchPokemonNames();
const pokemonDetails = new PokemonDetails(pokemonNames[0]);
await pokemonDetails.init();
console.log(pokemonDetails); // Example usage of PokemonDetails class with the first Pokémon name from the list

loadHeaderFooter();

/* const dataSource = new PokemonData("tents");

function addPokemonTosaved(pokemon) {
  setLocalStorage("so-saved", pokemon);
}
// add to saved button event handler
async function addTosavedHandler(e) {
  const pokemon = await dataSource.findPokemonById(e.target.dataset.id);
  addPokemonTosaved(pokemon);
}

// add listener to Add to saved button
document
  .getElementById("addTosaved")
  .addEventListener("click", addTosavedHandler); */
