import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AllProductsPage from "./pages/AllProductsPage";
import BasketPage from "./pages/BasketPage";
import LoginPage from "./pages/LoginPage";
import NavegationBar from "./components/navbar/NavegationBar";
import RegistrationPage from "./pages/RegistrationPage";


function App() {
  return (
    <>
      <NavegationBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<AllProductsPage />} />
        <Route path="/basket" element={<BasketPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
      </Routes>
    </>
  );
}

export default App;
