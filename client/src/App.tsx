import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AllProductsPage from "./pages/AllProductsPage";
import BasketPage from "./pages/BasketPage";
import LoginPage from "./pages/LoginPage";
import NavigationBar from "./components/navbar/NavigationBar";
import RegistrationPage from "./pages/RegistrationPage";
import ProductDetailPage from "./pages/ProductDetailPage";

function App() {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<AllProductsPage />} />
        <Route path="/basket" element={<BasketPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
      </Routes>
    </>
  );
}

export default App;
