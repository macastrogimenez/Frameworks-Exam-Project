import WelcomeBanner from "../components/welcomeBanner/WelcomeBanner";
import NewArrivalSection from "../components/newArrivalSection/NewArrivalSection";
import DiscountSection from "../components/discountSection/DiscountSection";
import "./pages.css";

function HomePage() {
  return (
    <main className="page-container">
      <WelcomeBanner />
      <NewArrivalSection />
      <DiscountSection />
    </main>
  );
}

export default HomePage;
