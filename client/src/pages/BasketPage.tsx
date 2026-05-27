import "./pages.css";
import useProducts from "../hooks/useProducts";
import useBasket from "../hooks/useBasket";
import BasketContent from "../components/basketContent/BasketContent";
import Toast from "../components/toast/Toast";
import { useState } from "react";

function BasketPage() {
  const products = useProducts(); // Calls hook to fetch products data from backend.
  const { basket, addToBasket, removeFromBasket, basketData, placeOrder } = useBasket( // Calls hook to manage basket state and actions.
    products.length // Pass products length to useBasket to trigger re-render when products are loaded, ensuring basket data is in sync with products.
  );

  const hasItems = basket.some((qty) => qty > 0);

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Place order handler that shows toast only on success and updates basket
  const handlePlaceOrder = async () => {
    const success = await placeOrder(); // call placeOrder from useBasket (true or false), store result in success variable.
    setToastMessage(success ? "Order placed successfully!" : "Order failed"); // Ternary operator to set message based on success
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 1500);
  };

  return (
    <main className="page-container">
      <h1 className="page-title basketTitle">
        {!hasItems ? "Your basket is empty" : "Your basket"}
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