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

export async function getMostImportantInfo() {
  try {
    let allProducts = await getAll();
    let importantInfo = allProducts.map((product) => {
      return {
        price: product.price,
        discount: product.discount,
        color: product.color,
        name: product.name,
        id: product.id,
        gender: product.gender,
        image: product.image,
        newArrival: product.newArrival,
      };
    });
    return importantInfo;
  } catch (err) {
    throw new Error(`Couldn't read products data`);
  }
}

// return unique categories from products
export async function getCategories() {
  try {
    // Fetch all products and categories file in parallel
    let [products, categoriesTxt] = await Promise.all([
      getAll(),
      fs.readFile(ALL_CATEGORIES_JSON),
    ]);
    // Parse the JSON file and extract the categories array
    let configuredCategories = JSON.parse(categoriesTxt).categories;

    if (configuredCategories === null) {
      return null;
    }

    // Create an array of unique, trimmed category names
    // Filter out empty strings and trim whitespace, then remove duplicates using Set
    let majorCategories = [
      ...new Set(
        configuredCategories
          .filter(
            (category) =>
              typeof category === "string" && category.trim() !== "",
          )
          .map((category) => category.trim()),
      ),
    ];

    // Build an object where each major category is a key with its subcategories as values
    return majorCategories.reduce(
      (allCategories, category) => ({
        ...allCategories,
        // For each category, extract unique subcategory values from all products
        [category]: [
          ...new Set(
            products
              // Get the value of this category from each product (e.g., product.color, product.size)
              .map((product) => product?.[category]) // '?'  If product is null or undefined, it returns undefined without throwing an error
              // If product exists, it accesses the dynamic property [category]
              // Filter out null and undefined values to keep only valid subcategories
              .filter(
                (subCategory) =>
                  subCategory !== null && subCategory !== undefined,
              ),
          ),
        ],
      }),
      {},
    );
  } catch (err) {
    throw new Error("Categories could not be loaded");
  }
}
