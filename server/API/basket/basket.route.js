import express from "express";
import { getBasket, updateBasket, removeFromBasket, placeOrder } from "./basket.controller.js";
export const basketRouter = express.Router();
// The controller handles request/response logic.
//The model reads data from products.json.

// API endpoints for basket

//Get basket for a certain user
basketRouter.get("/user/:username/basket", getBasket);

// PUT: Put a product to a specific user's basket
basketRouter.put(("/user/:username/basket"), updateBasket);

// DELETE: Remove a product from a specific user's basket
basketRouter.delete("/user/:username/basket/:productId", removeFromBasket);

//DELETE: Remove all products from a specific user's basket
basketRouter.delete("/user/:username/basket", placeOrder);
