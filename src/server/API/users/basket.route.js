import express from "express";
import { createBasket, getBasket, updateBasket } from "./basket.controller.js";
export const basketRouter = express.Router();
// The controller handles request/response logic.
//The model reads data from products.json.

// API endpoints for products

// POST: Createbasket for one specific user based on username
basketRouter.post("/user/:username/basket", createBasket);

//Get basket for a certain user
basketRouter.get("/basket/:username", getBasket);

// PUT: Put a product to a specific user's basket
basketRouter.put(("/user/:username/basket"), updateBasket);
