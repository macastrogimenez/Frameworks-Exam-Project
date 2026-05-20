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
    if (categories === null) {
      return res.status(404).json({ error: "No categories are set" });
    }
    res.json(categories);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export async function getMostImportantInfo(req, res) {
  try {
    let importantInfo = await productsModel.getMostImportantInfo();
    res.json(importantInfo);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export async function getFilteredProducts(req, res) {
  try {
    let filteredProducts = await productsModel.getMostImportantInfo();

    const toStringArray = (value) => {
      if (!value) return [];
      return Array.isArray(value) ? value : [value];
    };

    const colors = toStringArray(req.query.color).map((value) =>
      value.toString().toLowerCase(),
    );
    const genders = toStringArray(req.query.gender).map((value) =>
      value.toString().toLowerCase(),
    );

    // Filter products based on query parameters if they are provided.
    if (colors.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        colors.includes(product.color?.toString().toLowerCase()),
      );
    }

    if (genders.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        genders.includes(product.gender?.toString().toLowerCase()),
      );
    }
    // Send the filtered products as a JSON response.
    res.json(filteredProducts);
  } catch (error) {
    res.status(400).send(error.message);
  }
}
