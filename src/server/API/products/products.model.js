import * as fs from "fs/promises";
const ALL_PRODUCTS_JSON = "./API/products/products.json";
const ALL_CATEGORIES_JSON = "./API/products/categories.json";

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

// return unique categories from products
export async function getCategories() {
    try {
    let [products, categoriesTxt] = await Promise.all([getAll(), fs.readFile(ALL_CATEGORIES_JSON)]);
    let configuredCategories = JSON.parse(categoriesTxt).categories;

    let majorCategories = [...new Set(
        configuredCategories
        .filter((category) => typeof category === "string" && category.trim() !== "")
        .map((category) => category.trim())
    )];

    return majorCategories.reduce(
        (allCategories, category) => ({
            ...allCategories,
            [category]: [...new Set(
                products
                .map((product) => product?.[category])
                .filter((subCategory) => subCategory !== null && subCategory !== undefined)
            )],
        }),
    {});
    } catch (err) {
        throw new Error("Categories could not be loaded");
    }
}