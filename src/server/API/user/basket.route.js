import express from "express";
import { getBasket } from "./basket.controller.js";
export const basketRouter = express.Router();
// The controller handles request/response logic.
//The model reads data from products.json.

// API endpoints for products

//Get basket for a certain user
basketRouter.get("/basket/:username", getBasket);

