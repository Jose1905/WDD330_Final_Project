import {
  getLocalStorage,
  loadHeaderFooter,
  loadPokemonData,
  setLocalStorage,
  setClick,
} from "./utils.mjs";

loadHeaderFooter();

const pokemonName = new URLSearchParams(window.location.search).get("name");
if (pokemonName) {
  loadPokemonData(pokemonName);
} else {
  console.error("No Pokémon name specified in the URL.");
}

window.addEventListener("DOMContentLoaded", () => {
  const favoriteBtn = document.querySelector("#favorites-btn");
  setClick(favoriteBtn, toggleFavorite);

  function toggleFavorite() {
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
});
