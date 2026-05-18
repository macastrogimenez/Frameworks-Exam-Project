import "./pages.css";
import useProducts from "../hooks/useProducts";
import useBasket from "../hooks/useBasket";
import BasketContent from "../components/basketContent/BasketContent";
import BasketPrice from "../components/basketPrice/BasketPrice";

function BasketPage() {
  const products = useProducts();
  const { basket, registeredName, addToBasket, removeFromBasket, placeOrder, basketData } = useBasket(
    products.length
  );

  const hasItems = basket.some((qty) => qty > 0);


  return (
    <main className="page-container">
      <h1 className="page-title basketTitle">
        {registeredName
          ? `${registeredName}, your basket looks cool!`
          : "Your basket"}
      </h1>

      {!hasItems ? (
        <div className="alert alert-info">Your basket is empty</div>
      ) : (
        <>
          <BasketContent
            products={products}
            basket={basket}
            onRemoveItem={removeFromBasket}
            onAddItem={addToBasket}
          />
          <BasketPrice
            onPlaceOrder={placeOrder}
            hasItems={hasItems}
            totalPrice={basketData?.totalPrice}
          />
        </>
      )}
    </main>
  );
}

export default BasketPage;