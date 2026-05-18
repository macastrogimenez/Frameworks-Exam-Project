import "./pages.css";
import { useParams } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import useBasket from "../hooks/useBasket";
import ActionButton from "../components/buttons/ActionButton";

function ProductDetailPage() {
  const params = useParams();
  const productId = Number(params.id);

  const products = useProducts();
  const product = products.find((product) => product.id === productId);
  const { addToBasket } = useBasket(products.length);

  if (!product) {
    return <p>Loading product...</p>;
  }

  const hasDiscount = product.discount > 0;
  const discountedPrice = product.price * (1 - product.discount);

  return (
    <main className="page-container">
      <h1 className="product-detail-title">{product.name}</h1>

      <div className="product-detail-card">
        <img
          className="product-detail-image"
          src={product.image}
          alt={product.name}
        />

        <div className="product-detail-content">
          {hasDiscount ? (
            <div>
              <p className="product-card-old-price">
                <s>€ {product.price.toFixed(2)}</s>
              </p>

              <p className="product-card-discount-price">
                € {discountedPrice.toFixed(2)}
              </p>
            </div>
          ) : (
            <p className="product-card-price">€ {product.price.toFixed(2)}</p>
          )}

          <p>{product.description}</p>
          <p>Color: {product.color}</p>
          <ActionButton
            textOnButton="Add to basket"
            onAddToBasket={() => addToBasket(product.id)}
          />
        </div>
      </div>
    </main>
  );
}

export default ProductDetailPage;
