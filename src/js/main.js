import { loadHeaderFooter, loadPokemonCard } from "./utils.mjs";
import { fetchRegions, loadRegionalPokemons } from "./ExternalServices.mjs";
import PokemonDetails from "./pokemonDetails.mjs";

const regionSelect = document.getElementById("region-select");
const searchBtn = document.getElementById("search-btn");
const statSelect = document.getElementById("stat-select");
console.log(statSelect.value); // Log the elements to verify they are being selected correctly

async function buildRegionList() {
  const regions = await fetchRegions();
  regions.forEach((region) => {
    const regionName =
      region.name.charAt(0).toUpperCase() + region.name.slice(1);
    const option = document.createElement("option");
    option.value = region.url;
    option.textContent = regionName;
    regionSelect.appendChild(option);
  });
}

searchBtn.addEventListener("click", () => {
  buildPokemonList(regionSelect.value, statSelect.value);
});

async function buildPokemonList(regionUrl, stat) {
  const pokemonGrid = document.querySelector(".pokemon-grid");
  pokemonGrid.innerHTML = ""; // Clear the grid before loading new Pokémon
  const regionalPokemons = await loadRegionalPokemons(regionUrl);
  const regionalPokemonDetails = await Promise.all(
    regionalPokemons.map(async (pokemonName) => {
      const pokemonDetails = new PokemonDetails(pokemonName);
      await pokemonDetails.init();
      try {
        if (!isStat(pokemonDetails, stat)) {
          return null; // Skip Pokémon that don't yield EVs in the selected stat
        } else {
          console.log(`Adding ${pokemonDetails.pokemonName} to the grid`); // Log the Pokémon being added to the grid
          return {
            name: pokemonDetails.pokemonName,
            sprites: { front_default: pokemonDetails.imageUrl },
            evsYield: pokemonDetails.evsYield,
          };
        }
      } catch (error) {
        console.error(`Error processing ${pokemonDetails.pokemonName}:`, error);
        return null; // Skip this Pokémon if there's an error
      }
    }),
  );
  regionalPokemonDetails.forEach((pokemon) => {
    if (pokemon) {
      loadPokemonCard(
        pokemonGrid,
        pokemon.name.toUpperCase(),
        pokemon.sprites.front_default,
      );
    }
  });
}

function isStat(pokemon, stat) {
  return pokemon.evsYield[stat] > 0;
}

loadHeaderFooter();
buildRegionList();
