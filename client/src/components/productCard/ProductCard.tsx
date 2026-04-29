import "./ProductCard.css";
import ActionButton from "../buttons/ActionButton";

type ProductCardProps = {
  id: number;
  image: string;
  name: string;
  price: number;
  discount: number;
  showButton?: boolean; // whether or not you see a "Add to Cart" button on the card
};
function ProductCard(props: ProductCardProps) {
  const hasDiscount = props.discount > 0;
  const discountedPrice = props.price * (1 - props.discount);

  return (
    <div className="product-card">
      <img className="product-card-image" src={props.image} alt={props.name} />
      <div className="product-card-content">
        <h2 className="product-card-title">{props.name}</h2>

        {hasDiscount ? (
          <div>
            <p className="product-card-old-price">
              <s>€ {props.price.toFixed(2)}</s>
            </p>

            <p className="product-card-discount-price">
              € {discountedPrice.toFixed(2)}
            </p>
          </div>
        ) : (
          <p className="product-card-price">€ {props.price.toFixed(2)}</p>
        )}

        {props.showButton ? <ActionButton textOnButton="Add to basket" /> : null}
      </div>
    </div>
  );
}

export default ProductCard;
