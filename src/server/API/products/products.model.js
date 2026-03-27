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


//return a product based on color
export async function getByColor(color) {
  try {
    let productArray = await getAll();
    return productArray.filter((product) => product.color === color);
  } catch (err) {
    throw new Error(`No products found with color: ${color}`);
  }
}

//return a product based on gender
export async function getByGender(gender) {
  try {
    let productArray = await getAll();
    return productArray.filter((product) => product.gender === gender);
  } catch (err) {
    throw new Error(`No products found with gender: ${gender}`);
  }
}