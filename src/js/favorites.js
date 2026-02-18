import {
  getLocalStorage,
  loadHeaderFooter,
  loadPokemonCard,
} from "./utils.mjs";
import { fetchPokemonData } from "./ExternalServices.mjs";

const favoritesGrid = document.querySelector(".pokemon-grid");

function loadFavorites() {
  const favorites = getLocalStorage("favorites") || [];
  if (favorites.length === 0) {
    favoritesGrid.innerHTML = "<h1 class='no-favorites'>You have no favorite Pokémon yet. Go add some!</h1>";
    return;
  }
  favoritesGrid.innerHTML = ""; // Clear the grid before loading favorites
  console.log("Loading favorites:", favorites);
  favorites.forEach((pokemonName) => {
    fetchPokemonData(pokemonName).then((pokemonData) => {
      loadPokemonCard(favoritesGrid, pokemonName, pokemonData.imageUrl);
    }).catch((error) => {
      console.error(`Error loading data for ${pokemonName}:`, error);
    });
  });
}

loadHeaderFooter();
loadFavorites();
