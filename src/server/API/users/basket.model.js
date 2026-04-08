import * as fs from "fs/promises";
import * as productF from "../products/products.model.js";
const ALL_PRODUCTS_JSON = "./API/products/products.json";
const ALL_USERS_JSON = "./API/users/users.json";

// return all users from JSON file
export async function getAllUsers() {
  try {
    let usersTxt = await fs.readFile(ALL_USERS_JSON);
    let users = JSON.parse(usersTxt);
    return users;
  } catch (err) {
    console.log(err);
    return [];
  }
}

// Create a basket for a use if they dont have one. Based on username.
export async function createBasketForUser(username, basket) {
  try {
    let users = await getAllUsers();
    let user = users.find((u) => u.username === username);

    if (!user) return null;

    // Check if the user already has a basket.
    if (Array.isArray(user.basket) && user.basket.length > 0) {
      return "already_exists";
    }
    user.basket = basket;

    // Update the users.json file with the new basket information.
    await fs.writeFile(ALL_USERS_JSON, JSON.stringify(users));
    return user;
  } catch (err) {
    throw new Error("Could not create basket");
  }
}

// helper function to get all products relevant info for basket
async function getProductsMostImportantInfo() {
  try {
    let allProducts = await productF.getAll(); // get all products from file
    let importantInfo = allProducts.map((product) => {
      return {
        price: product.price,
        name: product.name,
        id: product.id,
      };
    });
    return importantInfo;
  } catch (err) {
    throw new Error(`Couldn't read products data`);
  }
}

// helper function to get basket in most basic format from JSON
function getJsonBasketFromUser(username) {
  // TODO: complete helper function
}

export async function getBasket(username) {
  // TODO: complete as below
  // this function should:
  //  1. use the getJsonBasketFromUser
  //  2. use the getProductsMostImportantInfo and filter them against the JSON basket from 1.
  //  3. list products
  //  4. calculate total price and list it
  //  5. return username, products array [id, name, qty, unit price], total price
}

//Put a product to a specific user's basket

export async function updateBasket(username, product) {
  let users = await getAllUsers();
  let user = users.find((u) => u.username === username);

  if (!user) return null;

  /* 
  If the product is already in the basket, 
  increase the quantity, otherwise add the product to the basket 
  */

  let existingProduct = user.basket.find((p) => p[0] === product[0]);

  if (existingProduct) {
    existingProduct[1] += product[1];
  } else {
    user.basket.push(product);
  }

  await fs.writeFile(ALL_USERS_JSON, JSON.stringify(users));
  return user;
}

// Remove a product from a specific user's basket
export async function removeFromBasket(username, productId) {
  let users = await getAllUsers();
  let user = users.find((u) => u.username === username);

  if (!user) return null;

  let productIndex = user.basket.findIndex((p) => p[0] === productId);

  if (productIndex === -1) {
    return "not_found";
  }

  // Decrease the quanitaty of product or full entry.
  const currentQuantity = user.basket[productIndex][1];
  if (currentQuantity > 1) {
    user.basket[productIndex][1] = currentQuantity - 1;
  } else {
    // Splice modifies the original array, so we don't need to reassign it.
    user.basket.splice(productIndex, 1);
  }

  await fs.writeFile(ALL_USERS_JSON, JSON.stringify(users));
  return user;
}
