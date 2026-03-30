import * as fs from "fs/promises";
import * as productF from "../products/products.model"
const ALL_PRODUCTS_JSON = "./API/products/products.json";


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
function getJsonBasketFromUser (username){
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

