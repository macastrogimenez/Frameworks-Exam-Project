import * as basketModel from "./basket.model.js";

//Get basket by username
export async function getBasket(req, res) {
  try {
    let username = req.query.username;
    if (!username) {
      return res.status(400).json({ error: "username query parameter is required" });
    }

    let basket = await basketModel.getBasket(username);

    if (!basket) {
      return res.status(404).json({ error: "Basket not found" });
    }

    res.json(basket);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

