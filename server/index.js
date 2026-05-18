import express from "express";
import { productsRouter } from "./API/products/products.route.js";
import { basketRouter } from "./API/basket/basket.route.js";
import { usersRouter } from "./API/users/users.route.js";
// Now express handles when someone visits /products or /products/:id

const app = express();
const PORT = 3001;

app.use(express.json());

// CORS middleware to allow requests from the React app running on http://localhost:3000
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type");

  next();
});

app.use(productsRouter);
app.use(basketRouter);
app.use(usersRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
