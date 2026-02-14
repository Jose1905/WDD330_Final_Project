/* import { setLocalStorage, loadHeaderFooter } from "./utils.mjs";*/
import { loadHeaderFooter } from "./utils.mjs";
import { fetchPokemonNames } from "./ExternalServices.mjs";
import PokemonDetails from "./pokemonDetails.mjs";

loadHeaderFooter();

const pokemonNames = await fetchPokemonNames();
const pokemonDetails = new PokemonDetails(pokemonNames[0]);

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
