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
        this.evsYield = null;
    }

    async init() {
        try {
            const data = await fetchPokemonData(this.pokemonName);
            this.abilities = data.abilities;
            this.types = data.types;
            this.imageUrl = data.imageUrl;
            this.baseHp = data.baseHp;
            this.baseAttack = data.baseAttack;
            this.baseDefense = data.baseDefense;
            this.baseSpecialAttack = data.baseSpecialAttack;
            this.baseSpecialDefense = data.baseSpecialDefense;
            this.baseSpeed = data.baseSpeed;
            this.evsYield = data.evYield;           
        } catch (error) {
            console.error("Error initializing PokemonDetails:", error);
        }
    }
}