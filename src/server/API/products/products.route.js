import express from "express";
import { getAllProducts, getProduct } from "./products.controller.js";
export const productsRouter = express.Router();
// The controller handles request/response logic.
//The model reads data from products.json.

// API endpoints for products

//Get all products
productsRouter.get("/products", getAllProducts);

//Get a product by color
productsRouter.get("/products/color=:color", getAllProducts);

//Get a product by gender
productsRouter.get("/products/gender=:gender", getAllProducts);

//Get a specific product by ID
productsRouter.get("/products/:id", getProduct);
