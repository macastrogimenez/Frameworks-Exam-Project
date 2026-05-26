import "./ActionButton.css";

interface PlaceOrderButtonProps {
    textOnButton?: string;
    onPlaceOrder?: () => void; //Optional prop (?) that allows parent components to pass a callback function.
}

function PlaceOrderButton(props: PlaceOrderButtonProps) {
    const handleClick = () => {
        if (props.onPlaceOrder) { // Check if callback function exits before calling it
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