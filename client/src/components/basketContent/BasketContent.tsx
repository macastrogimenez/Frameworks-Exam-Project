
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
                    {props.basket.map((quantity, index) => {
                        if (quantity === 0 || !props.products[index]) return null;

                        const product = props.products[index];
                        const price = product.price; // make sure api returns discounted pri
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
                                            onClick={() => props.onRemoveItem(index)}
                                        >
                                            -
                                        </button>

                                        <button
                                            className="btn btn-dark"
                                            onClick={() => props.onAddItem(index)}
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
                    <b>{"Total price: " + (props.totalPrice || "Error calculating total")}</b>
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
