
import type { Product } from "../../hooks/useProducts";

type BasketContentProps = {
    products: Product[];
    basket: number[];
    onRemoveItem: (productId: number) => void;
    onAddItem: (productId: number) => void;
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
                        const itemTotal = quantity * price;

                        return (
                            <tr key={`basket-item-${product.id}`}>
                                <td>#{product.id}</td>
                                <td>{product.name}</td>
                                <td>{price}</td>
                                <td>{quantity}</td>
                                <td>€ {itemTotal}</td>
                                <td>
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
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default BasketContent;
