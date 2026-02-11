/* import { setLocalStorage } from "./utils.mjs";*/
import { fetchPokemonData } from "./ExternalServices.mjs";

export default class PokemonDetails {
    constructor(pokemonName) {
        this.pokemonName = pokemonName;
        this.abilities = null;
        this.types = null;
        this.imageUrl = null;
        this.baseHp = null;
        this.baseAttack = null;
        this.baseDefense = null;
        this.baseSpecialAttack = null;
        this.baseSpecialDefense = null;
        this.baseSpeed = null;
    }

    async init() {
        try {
            const data = await fetchPokemonData(this.pokemonName);
            let abilities = data.abilities.map(ability => ability.ability.name);
            this.abilities = abilities;
            let types = data.types.map(type => type.type.name);
            this.types = types;
            this.imageUrl = data.sprites.front_default;
            this.baseHp = data.stats.find(stat => stat.stat.name === "hp").base_stat;
            this.baseAttack = data.stats.find(stat => stat.stat.name === "attack").base_stat;
            this.baseDefense = data.stats.find(stat => stat.stat.name === "defense").base_stat;
            this.baseSpecialAttack = data.stats.find(stat => stat.stat.name === "special-attack").base_stat;
            this.baseSpecialDefense = data.stats.find(stat => stat.stat.name === "special-defense").base_stat;
            this.baseSpeed = data.stats.find(stat => stat.stat.name === "speed").base_stat;
        } catch (error) {
            console.error("Error initializing PokemonDetails:", error);
        }
    }
}