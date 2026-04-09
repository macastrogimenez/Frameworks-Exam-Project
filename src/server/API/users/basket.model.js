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
    (total, [, , quantity, unitPrice, discount]) => total + quantity * unitPrice * (1-discount),
    0
  );

  //rounding total price
  const roundedPrice = totalPrice.toFixed(2);

  // adding labels to every product field 
  let labelledBasketItems = basketItems.map(([id,prodName,qty,price,disc]) => {
    return {productId: id, productName: prodName, quantity: qty, unitPrice: price, discount: disc};
  }

  )
  //adding labels to every major basket field and returning
  return {username: username, basket: labelledBasketItems, totalPrice: roundedPrice};
}


