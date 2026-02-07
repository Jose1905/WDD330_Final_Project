import { setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductTosaved(product) {
  setLocalStorage("so-saved", product);
}
// add to saved button event handler
async function addTosavedHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductTosaved(product);
}

// add listener to Add to saved button
document
  .getElementById("addTosaved")
  .addEventListener("click", addTosavedHandler);
