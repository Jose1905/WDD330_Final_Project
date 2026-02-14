const baseURL = "https://pokeapi.co/api/v2";

// Fetches a list of all Pokémon from the PokéAPI
export async function fetchPokemonNames() {
  try {
    const response = await fetch(`${baseURL}/pokemon?limit=2000&offset=0`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const pokemonNames = data.results.map(pokemon => pokemon.name);
    return pokemonNames;
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    throw error;
  }
}

// Fetches data for the specified Pokémon from the PokéAPI
export async function fetchPokemonData(pokemonName) {
  try {
    const response = await fetch(`${baseURL}/pokemon/${pokemonName}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const pokemonData = {
      name: data.name,
      abilities: data.abilities.map(ability => ability.ability.name),
      types: data.types.map(type => type.type.name),
      imageUrl: data.sprites.front_default,
      baseHp: data.stats.find(stat => stat.stat.name === "hp").base_stat,
      baseAttack: data.stats.find(stat => stat.stat.name === "attack").base_stat,
      baseDefense: data.stats.find(stat => stat.stat.name === "defense").base_stat,
      baseSpecialAttack: data.stats.find(stat => stat.stat.name === "special-attack").base_stat,
      baseSpecialDefense: data.stats.find(stat => stat.stat.name === "special-defense").base_stat,
      baseSpeed: data.stats.find(stat => stat.stat.name === "speed").base_stat,
      evYield: {
        hp: data.stats.find(stat => stat.stat.name === "hp").effort,
        attack: data.stats.find(stat => stat.stat.name === "attack").effort,
        defense: data.stats.find(stat => stat.stat.name === "defense").effort,
        specialAttack: data.stats.find(stat => stat.stat.name === "special-attack").effort,
        specialDefense: data.stats.find(stat => stat.stat.name === "special-defense").effort,
        speed: data.stats.find(stat => stat.stat.name === "speed").effort
      }
    };
    return pokemonData;
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    throw error;
  }
}

// Fetches a list of all Regions from the PokéAPI
export async function fetchRegions() {
  try {
    const response = await fetch(`${baseURL}/region`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const regions = data.results.map(region => ({name: region.name, url: region.url}));
    return regions;
  } catch (error) {
    console.error("Error fetching regions:", error);
    throw error;
  }
}

// Fetches pokedex Url from region from the PokéAPI
export async function fetchPokedexUrl(regionUrl) {
  try {    
    const response = await fetch(regionUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const pokedexUrl = data.pokedexes[0].url;
    return pokedexUrl;
  } catch (error) {
    console.error("Error fetching pokedex URL:", error);
    throw error;
  }
}

// Fetches the list of Pokémon for a specific region from the PokéAPI
export async function loadRegionalPokemons(regionUrl) {
  try {
    const pokedexUrl = await fetchPokedexUrl(regionUrl);
    const response = await fetch(pokedexUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const regionalPokemons = data.pokemon_entries.map(pokemon => pokemon.pokemon_species.name);
    return regionalPokemons;
  } catch (error) {
    console.error("Error fetching regional Pokémon names:", error);
    throw error;
  }
}