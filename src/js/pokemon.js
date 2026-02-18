import {
  getLocalStorage,
  loadHeaderFooter,
  loadPokemonData,
  setLocalStorage,
} from "./utils.mjs";

const pokemonName = new URLSearchParams(window.location.search).get("name");

if (pokemonName) {
  loadPokemonData(pokemonName);
} else {
  loadPokemonData("pikachu"); // Default to Pikachu if no name is provided
}

document.addEventListener('click', (e) => {
  if (e.target.id === 'favorites-btn') {
    toggleFavorite(e.target);}
});

function toggleFavorite(favoriteBtn) {
  const favorites = getLocalStorage("favorites") || [];
  if (favorites.includes(pokemonName)) {
    // Remove from favorites
    const updatedFavorites = favorites.filter((name) => name !== pokemonName);
    setLocalStorage("favorites", updatedFavorites);
  } else {
    // Add to favorites
    favorites.push(pokemonName);
    setLocalStorage("favorites", favorites);
  }
  updateFavoriteButton();
}

function updateFavoriteButton() {
  const favorites = getLocalStorage("favorites") || [];
  const favoriteBtn = document.getElementById("favorites-btn");
  if (favorites.includes(pokemonName)) {
    favoriteBtn.textContent = "🌟";
  } else {
    favoriteBtn.textContent = "⭐";
  }
}

loadHeaderFooter();
updateFavoriteButton();