import { getLocalStorage,
  loadHeaderFooter,
  loadPokemonData,
  setLocalStorage,
  qs,
  setClick,
} from "./utils.mjs";

loadHeaderFooter();

const pokemonName = new URLSearchParams(window.location.search).get("name");
if (pokemonName) {
  loadPokemonData(pokemonName);
} else {
  console.error("No Pokémon name specified in the URL.");
}

const favoriteBtn = qs("favorites-btn");
console.log("Favorite button:", favoriteBtn);
  
// setClick(favoriteBtn, toggleFavorite);

function toggleFavorite() {
  const favorites = getLocalStorage("favorites") || [];
  if (favorites.includes(pokemonName)) {
    // Remove from favorites
    const updatedFavorites = favorites.filter((name) => name !== pokemonName);
    setLocalStorage("favorites", updatedFavorites);
    favoriteBtn.textContent = "⭐"; // Unfilled star
  } else {
    // Add to favorites
    favorites.push(pokemonName);
    setLocalStorage("favorites", favorites);
    favoriteBtn.textContent = "🌟"; // Filled star
  }
};