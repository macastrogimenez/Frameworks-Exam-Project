import * as fs from "fs/promises";
const ALL_PRODUCTS_JSON = "./API/products/products.json";

// return all products from file
export async function getAll() {
  try {
    let productsTxt = await fs.readFile(ALL_PRODUCTS_JSON);
    let products = JSON.parse(productsTxt);
    return products;
  } catch (err) {
    console.log(err);
    return [];
  }
}

// return a product by ID
export async function getProductByID(productId) {
  try {
    let productArray = await getAll();
    return productArray.find((product) => product.id === productId);
  } catch (err) {
    throw new Error(`Product with ID:${productId} doesn't exist`);
  }
}
