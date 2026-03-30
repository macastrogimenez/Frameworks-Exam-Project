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

export async function getMostImportantInfo() {
  try {
    let allProducts = await getAll();
    let importantInfo = allProducts.map((product) => {
      return {
        price: product.price,
        color: product.color,
        name: product.name,
        id: product.id,
        gender: product.gender,
      };
    });
    return importantInfo;
  } catch (err) {
    throw new Error(`Couldn't read products data`);
  }
}
