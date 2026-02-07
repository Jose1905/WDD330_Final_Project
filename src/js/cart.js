import { getLocalStorage } from "./utils.mjs";

function rendersavedContents() {
  const savedItems = getLocalStorage("so-saved");
  const htmlItems = savedItems.map((item) => savedItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function savedItemTemplate(item) {
  const newItem = `<li class="saved-card divider">
  <a href="#" class="saved-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="saved-card__color">${item.Colors[0].ColorName}</p>
  <p class="saved-card__quantity">qty: 1</p>
  <p class="saved-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

rendersavedContents();
