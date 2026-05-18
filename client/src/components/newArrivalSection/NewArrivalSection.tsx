import ProductCard from "../productCard/ProductCard";
import useProducts from "../../hooks/useProducts";
import useBasket from "../../hooks/useBasket";
import "./NewArrivalSection.css";

function NewArrivalSection() {
  const products = useProducts();
  const { addToBasket } = useBasket(products.length);

  const newArrivalProducts = products.filter((product) => product.newArrival); // only keep products where newArrival is true

  return (
    <section className="product-section">
      <h2 className="section-title">New arrivals</h2>

      <div className="section-product-grid">
        {newArrivalProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            image={product.image}
            name={product.name}
            price={product.price}
            discount={product.discount}
            showButton={true}
            onAddToBasket={addToBasket}
          />
        ))}
      </div>
    </section>
  );
}

export default NewArrivalSection;
