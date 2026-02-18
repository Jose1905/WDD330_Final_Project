import {
  getLocalStorage,
  loadHeaderFooter,
  loadPokemonData,
  setLocalStorage,
} from "./utils.mjs";

loadHeaderFooter();

const favoriteBtn = document.querySelector("#favorites-btn");
const pokemonName = new URLSearchParams(window.location.search).get("name");

if (pokemonName) {
  loadPokemonData(pokemonName);
} else {
  loadPokemonData("pikachu"); // Default to Pikachu if no name is provided
}
favoriteBtn.addEventListener("click", toggleFavorite);

function toggleFavorite() {
  console.log("Toggling favorite for:", pokemonName); // Log the Pokémon name being toggled
  const favorites = getLocalStorage("favorites") || [];
  if (favorites.includes(pokemonName)) {
    // Remove from favorites
    const updatedFavorites = favorites.filter((name) => name !== pokemonName);
    setLocalStorage("favorites", updatedFavorites);
    favoriteBtn.textContent = "⭐";
  } else {
    // Add to favorites
    favorites.push(pokemonName);
    setLocalStorage("favorites", favorites);
    favoriteBtn.textContent = "🌟";
  }
}
