import * as basketModel from "./basket.model.js";

// Post a basket for a user based on username.
export async function createBasket(req, res) {
  try {
    // get username from URL path (e.g. /user/mia.anderson/basket.)
    // and basket data from the request body.
    const username = req.params.username;
    const basket = req.body.basket;

    // Calling model function to create basket for the user.
    const createBasketforUser = await basketModel.createBasketForUser(
      username,
      basket,
    );

    // model returns null if the user doesn't exist
    if (createBasketforUser === null) {
      return res.status(404).json({ error: "User not found" });
    }

    // model returns "already_exists" if the user already has a basket.
    if (createBasketforUser === "already_exists") {
      return res.status(409).json({ error: "Basket already exists" });
    }

    return res.status(201).json(createBasketforUser);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

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
