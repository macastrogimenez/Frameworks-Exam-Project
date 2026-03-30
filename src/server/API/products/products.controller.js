import * as productsModel from "./products.model.js";

export async function getAllProducts(req, res) {
  try {
    let allProducts = await productsModel.getAll();
    res.json(allProducts);
  } catch (error) {
    // res.statusMessage=
    res.status(400).send(error.message);
  }
}

//Get a single product by ID
export async function getProduct(req, res) {
  try {
    let id = parseInt(req.params.id);
    let product = await productsModel.getProductByID(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    // If product is found, send it as JSON response.
    res.json(product);
  } catch (error) {
    res.status(400).send(error.message); // if the JSON file can't be read.
  }
}

//Get all product categories
export async function getCategories(req, res) {
  try {
    let categories = await productsModel.getCategories();
    res.json(categories);
  } catch (error) {
    res.status(400).send(error.message);
  }
}
