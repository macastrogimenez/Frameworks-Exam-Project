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

export async function getFilteredProducts(req, res) {
  try {
    let filteredProducts = await productsModel.getAll();
    const { color, gender } = req.query;

    // Filter products based on query parameters if they are provided.
    if (color) {
      const filterColor = color.toString().toLowerCase();
      filteredProducts = filteredProducts.filter((product) => {
        return product.color?.toString().toLowerCase() === filterColor;
      });
    }

    if (gender) {
      const filterGender = gender.toString().toLowerCase();
      filteredProducts = filteredProducts.filter((product) =>
        product.gender?.toString().toLowerCase() === filterGender
      );
    }
    // Send the filtered products as a JSON response.
    res.json(filteredProducts);
  } catch (error) {
    res.status(400).send(error.message);
  }
}
