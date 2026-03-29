import express from "express";
import { getAllProducts, getProduct, getFilteredProducts } from "./products.controller.js";
export const productsRouter = express.Router();
// The controller handles request/response logic.
//The model reads data from products.json.

// API endpoints for products

//Get all products or filtered products
productsRouter.get("/products", getFilteredProducts);

//Get a specific product by ID
productsRouter.get("/products/:id", getProduct);
