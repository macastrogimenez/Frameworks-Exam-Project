import express from "express";
import { createBasket, updateBasket, removeFromBasket } from "./basket.controller.js";
export const basketRouter = express.Router();
// The controller handles request/response logic.
//The model reads data from products.json.

// API endpoints for products

// POST: Createbasket for one specific user based on username
basketRouter.post("/user/:username/basket", createBasket);

// PUT: Put a product to a specific user's basket
basketRouter.put(("/user/:username/basket"), updateBasket);

// DELETE: Remove a product from a specific user's basket
basketRouter.delete("/user/:username/basket/:productId", removeFromBasket);
