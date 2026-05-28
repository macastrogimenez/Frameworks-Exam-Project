import * as basketModel from "./basket.model.js";

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

//Get basket by username
export async function getBasket(req, res) {
  try {
    let username = req.params.username;

    if (!username) {
      return res.status(400).json({ error: "username query parameter is required" });
    }

    let basket = await basketModel.getBasket(username);

    if (basket === null) {
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

// Clear the basket and place an order for a specific user
export async function placeOrder(req, res) {
  try {
    let username = req.params.username;

    // Clear the basket by calling the placeOrder function
    let basket = await basketModel.placeOrder(username);

    if (basket === null) {
      return res.status(404).json({ error: "username not found" });
    }

    if (!basket) {
      return res.status(404).json({ error: "Basket not found" });
    }
    res.json({ message: "Order placed successfully", basket: basket });
  }
  catch (error) {
    res.status(400).send(error.message);
  }
}


