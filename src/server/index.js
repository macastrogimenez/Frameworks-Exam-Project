import express from "express";
import { productsRouter } from "./API/products/products.route.js";
// Now epress handles when someone visits /products or /products/:id

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(productsRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
