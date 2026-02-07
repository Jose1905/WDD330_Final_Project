/* import { setLocalStorage, loadHeaderFooter } from "./utils.mjs";*/
import { loadHeaderFooter } from "./utils.mjs";
/* import PokemonData from "./PokemonData.mjs"; */

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
