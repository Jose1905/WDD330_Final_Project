import { fetchPokemonData } from "./ExternalServices.mjs";

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../partials/header.html");
  const footerTemplate = await loadTemplate("../partials/footer.html");
  const headerElement = qs("#main-header");
  const footerElement = qs("#main-footer");
  renderWithTemplate(footerTemplate, footerElement);
  renderWithTemplate(headerTemplate, headerElement);
}

async function getCountryFlag() {
  const res = await fetch("https://ipapi.co/json/");
  const data = await res.json();
  return data.country_code.toLowerCase();
}

export function loadPokemonCard(parentElement, pokemonName, pokemonImage) {
  const cardTemplate = `<div class="pokemon-card">
    <a href="../pokemon/index.html?name=${pokemonName.toLowerCase()}" class="pokemon-link">
      <img src="${pokemonImage}" alt="${pokemonName}" class="pokemon-image">
    </a>
    <h3>${pokemonName}</h3>
  </div>`;
  parentElement.innerHTML += cardTemplate;
}

export async function loadPokemonData(pokemonName) {
  const parentElement = document.querySelector(".pokemon-container");
  const pokemonData = await fetchPokemonData(pokemonName);
  console.log("Fetched Pokémon data:", pokemonData); // Log the fetched data to verify it's correct
  const pokemonDetailsTemplate = `<h1 id="pokemon-name">${pokemonData.name}</h1>

      <img
        alt="Pokemon sprite"
        src="${pokemonData.imageUrl}"
        id="pokemon-sprite"
      />

      <button id="favorites-btn" alt="Favorites button">⭐</button>

      <section id="types">
        <h2>Types</h2>
        <ul id="pokemon-types">
          <li>${pokemonData.types[0]}</li>
        </ul>
      </section>

      <section id="abilities">
        <h2>Abilities</h2>
        <ul id="pokemon-abilities">
          <li>${pokemonData.abilities[0]}</li>
        </ul>
      </section>

      <section id="stats">
        <h2>Stats</h2>
        <ul id="pokemon-stats">
          <li>HP: ${pokemonData.baseHp}</li>
          <li>Attack: ${pokemonData.baseAttack}</li>
          <li>Defense: ${pokemonData.baseDefense}</li>
          <li>Special Attack: ${pokemonData.baseSpecialAttack}</li>
          <li>Special Defense: ${pokemonData.baseSpecialDefense}</li>
          <li>Speed: ${pokemonData.baseSpeed}</li>
        </ul>
      </section>

      <section id="evs">
        <h2>EVs Yielded</h2>
        <ul id="pokemon-evs">
          <li>HP: ${pokemonData.evYield.hp}</li>
          <li>Attack: ${pokemonData.evYield.attack}</li>
          <li>Defense: ${pokemonData.evYield.defense}</li>
          <li>Special Attack: ${pokemonData.evYield.specialAttack}</li>
          <li>Special Defense: ${pokemonData.evYield.specialDefense}</li>
          <li>Speed: ${pokemonData.evYield.speed}</li>
        </ul>
      </section>`;
  parentElement.innerHTML += pokemonDetailsTemplate;
}
