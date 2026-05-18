import "./BasketPrice.css";

type BasketPriceProps = {
    onPlaceOrder: () => void;
    hasItems: boolean;
    totalPrice?: string;
};

function BasketPrice(props: BasketPriceProps) {

    return (
        <div className="basket-summary">
            <div className="basket-summary-total">
                <b>{props.totalPrice || "Error calculating total"}</b>
            </div>
            <div className="d-grid gap-2 col-4 mx-auto">
                <button
                    id="orderButton"
                    type="button"
                    className="btn btn-dark btn-lg"
                    onClick={props.onPlaceOrder}
                    disabled={!props.hasItems}
                >
                    Place an order
                </button>
            </div>
        </div>
    );
}

export default BasketPrice;
