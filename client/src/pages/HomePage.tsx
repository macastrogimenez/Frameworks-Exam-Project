import NewArrivalSection from "../components/newArrivalSection/NewArrivalSection";
import DiscountSection from "../components/discountSection/DiscountSection";
import "./pages.css";

function HomePage() {
  return (
    <main className="page-container">
      <NewArrivalSection />
      <DiscountSection />
    </main>
  );
}

export default HomePage;
