import Accordion from "react-bootstrap/Accordion";
import FilterSwitch from "../buttons/FilterSwitch";
import { useCategories } from "../../hooks/useCategories";
import { SelectedFilters } from "../../hooks/useProducts";

// Props for the Filter component
type FilterProps = {
    // Current selection state from the page (controlled)
    selectedFilters: SelectedFilters;
    // Callback to notify parent when a value is toggled
    onToggleFilter: (category: string, value: string, checked: boolean) => void;
};

// Filter sidebar component
// - Fetches available categories/values via `useCategories()`
// - Renders an Accordion where each category is a section
// - For each possible value it renders a controlled `FilterSwitch`
//   whose `checked` state is derived from `selectedFilters` and which
//   calls `onToggleFilter` when toggled.
function Filter({ selectedFilters, onToggleFilter }: FilterProps) {
    const { categories, loading, error } = useCategories();

    if (loading) return <p>Loading filters...</p>;
    if (error) return <p>{error}</p>;

    return (
        <aside>
        <Accordion alwaysOpen>
            <h5>Filters</h5>
            {categories.map((category, index) => (
            <Accordion.Item eventKey={String(index)} key={category.name}>
                <Accordion.Header>
                {category.name.toUpperCase()}
                </Accordion.Header>
                <Accordion.Body>
                {category.possibleVals.map((value) => (
                    <div
                    key={`${category.name}-${value}`}
                    style={{ marginBottom: "0.5rem" }}
                    >
                    {/* Controlled switch: determine checked state from
                        `selectedFilters` and forward changes up */}
                    <FilterSwitch
                        id={`${category.name}-${value}`}
                        label={value}
                        checked={selectedFilters[category.name]?.includes(value) ?? false}
                        onChange={(checked) => onToggleFilter(category.name, value, checked)}
                    />
                    </div>
                ))}
                </Accordion.Body>
            </Accordion.Item>
            ))}
        </Accordion>
        </aside>
    );
}

export default Filter;