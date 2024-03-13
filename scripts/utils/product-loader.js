import { getProductJSON } from "@archetype-themes/scripts/utils/theme-request";

const loadedProducts = new Map();

export default async function loadProduct(handle) {
  if (!handle) {
    throw new Error(
      "The handle of the product is required before product can be loaded"
    );
  }

  if (loadedProducts.has(handle)) {
    return loadedProducts.get(handle);
  }

  const productJSON = await getProductJSON(handle);

  loadedProducts.set(handle, productJSON);

  return productJSON;
}
