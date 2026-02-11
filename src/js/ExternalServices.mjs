const baseURL = "https://pokeapi.co/api/v2/pokemon";

// Fetches a list of all Pokémon from the PokéAPI
export async function fetchPokemonNames() {
  try {
    const response = await fetch(`${baseURL}?limit=2000&offset=0`);
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
    const response = await fetch(`${baseURL}/${pokemonName}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    throw error;
  }
}
