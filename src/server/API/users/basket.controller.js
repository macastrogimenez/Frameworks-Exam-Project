import * as basketModel from "./basket.model.js";

// Post a basket for a user based on username.
export async function createBasket(req, res) {
  try {
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


//Put a product in a specific user's basket\
export async function updateBasket(req, res) {
  try {
    let username = req.params.username;
    let product = req.body.product;

    let updatedBasket = await basketModel.updateBasket(username, product);

    if (!updatedBasket) {
      return res.status(404).json({ error: "Basket or user not found" });
    }

    // If basket and user are found, send the updated basket as JSON response.
    res.json(updatedBasket);

  } catch (error) {
    res.status(400).send(error.message);

  }
}

// Remove a product from user's basket
export async function removeFromBasket(req, res) {
  try {
    let username = req.params.username;
    let productId = parseInt(req.params.productId);

    let updatedBasket = await basketModel.removeFromBasket(username, productId);

    if (!updatedBasket) {
      return res.status(404).json({ error: "User not found" });
    }

    if (updatedBasket === "not_found") {
      return res.status(404).json({ error: "Product not found in basket" });
    }

    res.json(updatedBasket);

  } catch (error) {
    res.status(400).send(error.message);
  }
}
