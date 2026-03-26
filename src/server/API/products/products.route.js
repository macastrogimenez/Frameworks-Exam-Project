import express from "express";
import { getAllProducts, getProduct } from "./products.controller.js";

export const productsRouter = express.Router();

// route handlers
productsRouter.get("/products", getAllProducts);

productsRouter.get("/products/:id", getProduct);
