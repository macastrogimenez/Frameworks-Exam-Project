import express from "express";
import { getAllProducts, getProduct, getCategories } from "./products.controller.js";
export const productsRouter = express.Router();
// The controller handles request/response logic.
//The model reads data from products.json.

// API endpoints for products

//Get all products
productsRouter.get("/products", getAllProducts);

//Get product categories
productsRouter.get("/products/categories", getCategories);

//Get a specific product by ID
productsRouter.get("/products/:id", getProduct);

