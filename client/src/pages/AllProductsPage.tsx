import ProductCard from "../components/productCard/ProductCard";
import useProducts from "../hooks/useProducts";
import "./pages.css";

function AllProductsPage() {
  const products = useProducts();

  return (
    <main className="page-container">
      <h1 className="page-title">All Products</h1>

      <div className="all-products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            image={product.image}
            name={product.name}
            price={product.price}
            discount={product.discount}
            showButton={true}
          />
        ))}
      </div>
    </main>
  );
}

export default AllProductsPage;
