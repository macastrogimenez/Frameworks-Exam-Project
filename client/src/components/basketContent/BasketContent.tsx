
import "./BasketContent.css";
import type { Product } from "../../hooks/useProducts";
import PlaceOrderButton from "../buttons/PlaceOrderButton";

type BasketContentProps = {
    products: Product[];
    basket: number[];
    onRemoveItem: (productId: number) => void;
    onAddItem: (productId: number) => void;
    onPlaceOrder: () => void;
    hasItems: boolean;
    totalPrice?: string;
};

function BasketContent(props: BasketContentProps) {

    return (
        <div style={{ overflowX: "auto" }}>
            <table className="table">
                <thead className="table-light">
                    <tr>
                        <th scope="col">Product Id</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Price Per Unit</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total Price</th>
                        <th scope="col">Edit Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {props.basket.map((quantity, index) => { // Map over basket array to render each product row
                        if (quantity === 0 || !props.products[index]) return null; //Guard clause against missing product data (Logical OR)
                        const product = props.products[index];
                        const price = product.price;
                        const itemTotal = (quantity * price).toFixed(2);

                        return (
                            <tr key={`basket-item-${product.id}`}>
                                <td>#{product.id}</td>
                                <td>{product.name}</td>
                                <td>{price}</td>
                                <td>{quantity}</td>
                                <td>€ {itemTotal}</td>
                                <td>
                                    <div className="table-button-group">
                                        <button
                                            className="btn btn-dark"
                                            onClick={() => props.onRemoveItem(index)} //Event handler to decrease quantity (Arrow Function)
                                        >
                                            -
                                        </button>

                                        <button
                                            className="btn btn-dark"
                                            onClick={() => props.onAddItem(index)} //Event handler to increase quantity (Arrow Function)
                                        >
                                            +
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="basket-price">
                <div className="basket-price-total">
                    <b>{"Total price: " + (props.totalPrice || "Error calculating total")}</b> {/* Logical OR */}
                    <PlaceOrderButton
                        textOnButton="Place your order"
                        onPlaceOrder={props.onPlaceOrder}
                    />
                </div>
            </div>
        </div>
    );
}

export default BasketContent;
