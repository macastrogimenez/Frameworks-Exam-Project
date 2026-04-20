import express from "express";
import { getAllProducts, getProduct, getFilteredProducts, getCategories } from "./products.controller.js";
export const productsRouter = express.Router();
// The controller handles request/response logic.
//The model reads data from products.json.

// API endpoints for products

//Get all products or filtered products with only most important information
productsRouter.get("/products", getFilteredProducts);

//Get product categories and subCategories
productsRouter.get("/products/categories", getCategories);

//Get a specific product by ID with all its information
productsRouter.get("/products/:id", getProduct);

