import * as fs from "fs/promises";
import * as productF from "../products/products.model.js"
const ALL_USERS_JSON = "./API/user/users.json";

// helper function to get basket in most basic format from JSON
export async function getJsonBasketFromUser(username){

  let usersTxt = await fs.readFile(ALL_USERS_JSON); // reading users file
  let users = JSON.parse(usersTxt); // parsing data from JSON to JS
  let user = users.find(person => person.username === username); // find user by username
  return user?.basket ?? false;
}

export async function getBasket(username) {
  let userBasket = await getJsonBasketFromUser(username);
  if (userBasket === false) {
    return null;
  }

  let products = await productF.getMostImportantInfo();

  let basketItems = userBasket
    .map(([prodId, quantity]) => {
      let product = products.find((p) => p.id === prodId);
      if (!product) return null;

      return [prodId, product.name, quantity, product.price, product.discount];
    })
    .filter((item) => item !== null);

  let totalPrice = basketItems.reduce(
    (total, [, , quantity, unitPrice, discount]) => total + quantity * unitPrice * (1-discount),
    0
  );

  const roundedPrice = totalPrice.toFixed(2);

  let labelledBasketItems = basketItems.map(([id,prodName,qty,price,disc]) => {
    return {productId: id, productName: prodName, quantity: qty, unitPrice: price, discount: disc};
  }

  )

  return {username: username, basket: labelledBasketItems, totalPrice: roundedPrice};
}


