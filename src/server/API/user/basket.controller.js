import * as basketModel from "./basket.model.js";

//Get basket by username
export async function getBasket(req, res) {
  try {
    let username = req.params.username;

    if (!username) {
      return res.status(400).json({ error: "username query parameter is required" });
    }

    //let userBasket = await basketModel.getJsonBasketFromUser(username);
    // if (userBasket === false) {
    //   return res.status(400).json({ error: "username does not match any existing record" });
    // }

    let basket = await basketModel.getBasket(username);

    if (basket === null){
      return res.status(404).json({ error: "username not found" });
    }

    if (!basket) {
      return res.status(404).json({ error: "Basket not found" });
    }

    res.json(basket);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

