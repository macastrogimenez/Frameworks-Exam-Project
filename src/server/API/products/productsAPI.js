import express from "express";
import { productsRouter } from "./products.route.js";

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies in requests (needed for POST/PUT requests)
app.use(express.json());

app.use(productsRouter);

// For invalid routes
app.get("*", (req, res) => {
  res.send("404! This is an invalid URL.");
});

app.listen(PORT, function (err) {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port", PORT);
});
