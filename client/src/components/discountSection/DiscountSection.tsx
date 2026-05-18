import ProductCard from "../productCard/ProductCard";
import useProducts from "../../hooks/useProducts";
import useBasket from "../../hooks/useBasket";
import "./DiscountSection.css";

function DiscountSection() {
  const products = useProducts();
  const { addToBasket } = useBasket(products.length);

  //if the product has a discount greater than 0, it means that it is on discount, so we keep it in the discountProducts array
  const discountProducts = products.filter((product) => product.discount > 0);

  return (
    <section className="product-section">
      <h2 className="section-title">Discounts</h2>

      <div className="section-product-grid">
        {discountProducts.map((product) => (
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

export default DiscountSection;
