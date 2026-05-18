import * as fs from "fs/promises";
import * as productF from "../products/products.model.js";
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


//Put a product to a specific user's basket
export async function updateBasket(username, product) {
  let users = await getAllUsers();
  let user = users.find((u) => u.username === username);

  if (!user) return null;

  if (!Array.isArray(user.basket)) {
    user.basket = [];
  }

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
  return await getBasket(username);
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
  return await getBasket(username);
}
// helper function to get basket in most basic format from JSON
export async function getJsonBasketFromUser(username) {

  let usersTxt = await fs.readFile(ALL_USERS_JSON); // reading users file
  let users = JSON.parse(usersTxt); // parsing data from JSON to JS
  let user = users.find(person => person.username === username); // find user by username
  return user?.basket ?? false;
}

export async function getBasket(username) {
  // get the basket from the users.json file for the corresponding user
  let userBasket = await getJsonBasketFromUser(username);

  // if the user does not exist return null for error handling on controller
  if (userBasket === false) {
    return null;
  }

  // getting most important info about all products
  let products = await productF.getMostImportantInfo();

  // from the original array userBasket map it to create an array which also retrieves price, name and discount 
  // saved as basketItems.
  let basketItems = userBasket
    .map(([prodId, quantity]) => {
      let product = products.find((p) => p.id === prodId);
      if (!product) return null;

      return [prodId, product.name, quantity, product.price, product.discount];
    })
    .filter((item) => item !== null);

  // calculating total price by folding every element of the bakset
  let totalPrice = basketItems.reduce(
    (total, [, , quantity, unitPrice, discount]) => total + quantity * unitPrice * (1 - discount),
    0
  );

  //rounding total price
  const roundedPrice = totalPrice.toFixed(2);

  // adding labels to every product field 
  let labelledBasketItems = basketItems.map(([id, prodName, qty, price, disc]) => {
    return { productId: id, productName: prodName, quantity: qty, unitPrice: price, discount: disc };
  }

  )
  //adding labels to every major basket field and returning
  return { username: username, basket: labelledBasketItems, totalPrice: roundedPrice };
}


