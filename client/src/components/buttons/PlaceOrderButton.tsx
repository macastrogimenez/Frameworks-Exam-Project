import "./ActionButton.css";

interface PlaceOrderButtonProps {
    textOnButton?: string;
    onPlaceOrder?: () => void;
}

function PlaceOrderButton(props: PlaceOrderButtonProps) {
    const handleClick = () => {
        if (props.onPlaceOrder) {
            props.onPlaceOrder();
        }
    };

    return (
        <div>
            <button onClick={handleClick} className="btn-dark">
                {props.textOnButton || "Place your order"}
            </button>
        </div>
    );
}

export default PlaceOrderButton;