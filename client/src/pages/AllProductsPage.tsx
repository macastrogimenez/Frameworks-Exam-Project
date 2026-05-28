import ProductCard from "../components/productCard/ProductCard";
import useProducts from "../hooks/useProducts";
import useBasket from "../hooks/useBasket";
import "./pages.css";
import Filter from "../components/filtering/Filter";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import { SelectedFilters } from "../hooks/useProducts";

// Page: AllProductsPage
// - Holds the user's selected filters and passes them to `useProducts`.
// - Renders a `Filter` sidebar (controlled) and a responsive grid of
//   `ProductCard` components for the products returned by the API.
function AllProductsPage() {
  // Track selected filter values per category. Example:
  // { color: ["Blue","Red"], gender: ["Unisex"] }
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({});

  // Call `useProducts()` (no filters) to get the full product list length
  // which is used by `useBasket` to initialize basket-related logic.
  const products = useProducts();
  const { addToBasket } = useBasket(products.length);

  // Handler invoked by `Filter` when a checkbox/switch is toggled.
  // - `category`: the filter key (e.g. "color")
  // - `value`: the specific filter value (e.g. "Blue")
  // - `checked`: true when selected, false when deselected
  const handleToggleFilter = (
    category: string,
    value: string,
    checked: boolean,
  ) => {
    setSelectedFilters((currentFilters) => {
      const currentValues = currentFilters[category] ?? [];
      const nextValues = checked
        ? [...currentValues, value] // Spread operator
        : currentValues.filter((existingValue) => existingValue !== value);

      const nextFilters = {
        ...currentFilters,
        [category]: nextValues,
      };

      // Remove the category key if no values remain to keep the object clean
      if (nextValues.length === 0) {
        delete nextFilters[category];
      }

      return nextFilters;
    });
  };

  // Fetch only products matching the currently selected filters. The
  // `useProducts` hook constructs the query string from `selectedFilters`
  // and refetches whenever this object changes.
  const filteredProducts = useProducts(selectedFilters);

  return (
    <main className="page-container">
      <Container fluid>
        <Row className="g-4">
          <Col xs={12} md={3} lg={2}>
            {/* Controlled filter sidebar: receives current selections and a
                callback to update them. */}
            <Filter
              selectedFilters={selectedFilters}
              onToggleFilter={handleToggleFilter}
            />
          </Col>

          <Col xs={12} md={9} lg={10}>
            <h1 className="page-title">All Products</h1>

            {/* Grid of product cards. Layout is handled in pages.css */}
            <div className="all-products-grid">
              {filteredProducts.map((product) => (
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
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default AllProductsPage;
