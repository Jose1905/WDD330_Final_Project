import { loadHeaderFooter, loadPokemonCard } from "./utils.mjs";
import { fetchRegions, loadRegionalPokemons } from "./ExternalServices.mjs";
import PokemonDetails from "./pokemonDetails.mjs";

const regionSelect = document.getElementById("region-select");
const searchBtn = document.getElementById("search-btn");
const statSelect = document.getElementById("stat-select");

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
      return ({
        name: pokemonDetails.pokemonName,
        sprites: { front_default: pokemonDetails.imageUrl },
        evsYield: pokemonDetails.evsYield,
      });
    }),
  );
  console.log(regionalPokemonDetails); // Log the regional Pokémon details to verify they are being fetched correctly

  regionalPokemonDetails.forEach((pokemon) => {
    loadPokemonCard(pokemonGrid, pokemon.name.toUpperCase(), pokemon.sprites.front_default);
  });
}

loadHeaderFooter();
buildRegionList();
