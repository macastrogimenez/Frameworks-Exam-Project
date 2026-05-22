// This hook fetches product data from the server and saves it in a Product[] variable.
// The hook returns the products array, which can be used in any component that calls useProducts().
import { useEffect, useState } from "react";

// Product shape returned by the server's /products endpoint
export type Product = {
  id: number; // unique numeric id for the product
  image: string; // image URL or path
  name: string; 
  description: string; 
  color: string; 
  price: number; 
  discount: number; 
  newArrival: boolean; // whether the product is flagged as new
};

// SelectedFilters maps filter category names (e.g. "color", "gender")
// to an array of selected values. This allows building repeated query
// parameters like `?color=Blue&color=Red` for the server.
export type SelectedFilters = Record<string, string[]>;

// Build a products URL with repeated query parameters for each selected
// filter value. Example: { color: ["Blue","Red"] } ->
// http://localhost:3001/products?color=Blue&color=Red
function buildProductsUrl(filters: SelectedFilters) {
  const params = new URLSearchParams();

  // For each filter category, append every selected value as a separate
  // query parameter with the same key (this produces repeated keys).
  Object.entries(filters).forEach(([category, values]) => {
    values.forEach((value) => {
      params.append(category, value);
    });
  });

  const queryString = params.toString();

  // If there are any query params, attach them to the /products path.
  return queryString
    ? `http://localhost:3001/products?${queryString}`
    : "http://localhost:3001/products";
}

// React hook to fetch and return the product list. It accepts an optional
// `filters` object (see SelectedFilters) and will re-run the fetch every
// time `filters` changes.
function useProducts(filters: SelectedFilters = {}) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Build the appropriate URL based on the current filters.
    const url = buildProductsUrl(filters);

    // Fetch products from the API, replace local state with the response.
    // Any network or parsing error is logged to the console.
    fetch(url)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.log(error));
  }, [filters]); // Re-run effect when `filters` object identity changes

  // Return the current list of products to the caller.
  return products;
}

export default useProducts;
