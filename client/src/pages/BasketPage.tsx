import "./pages.css";
import useProducts from "../hooks/useProducts";
import useBasket from "../hooks/useBasket";
import BasketContent from "../components/basketContent/BasketContent";
import Toast from "../components/toast/Toast";
import { useState } from "react";

function BasketPage() {
  const products = useProducts();
  const { basket, addToBasket, removeFromBasket, basketData, placeOrder } = useBasket(
    products.length
  );

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("Order placed successfully!");

  const hasItems = basket.some((qty) => qty > 0);

  // Place order handler that shows toast only on success and updates basket
  const handlePlaceOrder = async () => {
    const success = await placeOrder();
    setToastMessage(success ? "Order placed successfully!" : "Order failed");
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 1500);
  };

  return (
    <main className="page-container">
      <h1 className="page-title basketTitle">
        {!hasItems ? "Your basket is empty" : "Your basket"}
        {/* Inline If-Else with Conditional Operator */}
      </h1>

      <Toast visible={toastVisible} message={toastMessage} />

      {hasItems ? (
        <>
          <BasketContent
            products={products}
            basket={basket}
            onRemoveItem={removeFromBasket}
            onAddItem={addToBasket}
            onPlaceOrder={handlePlaceOrder}
            hasItems={hasItems}
            totalPrice={basketData?.totalPrice}
          />
        </>
      ) : null}
    </main>
  );
}

export default BasketPage;