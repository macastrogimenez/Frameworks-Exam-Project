import express from "express";
import { getAllProducts, getProduct, getFilteredProducts, getCategories } from "./products.controller.js";
export const productsRouter = express.Router();
// The controller handles request/response logic.
//The model reads data from products.json.

// API endpoints for products

//Get all products or filtered products with only most important information
productsRouter.get("/products", getFilteredProducts);

//Get all information about all products
productsRouter.get("/products/all", getAllProducts);

//Get product categories
productsRouter.get("/products/categories", getCategories);

//Get a specific product by ID
productsRouter.get("/products/:id", getProduct);

