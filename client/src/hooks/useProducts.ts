// This hook fetches product data from the server and saves it in a Product[] variable.
// The hook returns the products array, which can be used in any component that calls useProducts().
import { useEffect, useState } from "react";

export type Product = {
  id: number;
  image: string;
  name: string;
  description: string;
  color: string;
  price: number;
  discount: number;
  newArrival: boolean;

};

function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.log(error));
  }, []);

  return products;
}

export default useProducts;
