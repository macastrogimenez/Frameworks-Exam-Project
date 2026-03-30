import * as basketModel from "./basket.model.js";

//Get basket by username
export async function getBasket(req, res) {
  try {
    let username = req.query; 
    let basket = await basketModel.getBasket(username);

    if (!basket) {
      return res.status(404).json({ error: "Product not found" });
    }
    // If product is found, send it as JSON response.
    res.json(basket);
  } catch (error) {
    res.status(400).send(error.message); // if the JSON file can't be read.
  }
}

