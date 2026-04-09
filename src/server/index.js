import express from "express";
import { productsRouter } from "./API/products/products.route.js";
<<<<<<< HEAD
import { basketRouter } from "./API/users/basket.route.js";
=======
import { basketRouter } from "./API/user/basket.route.js";
>>>>>>> KAN-49
// Now epress handles when someone visits /products or /products/:id

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(productsRouter);
app.use(basketRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
