import { useState } from "react";
import "./ActionButton.css";
import Toast from "../toast/Toast";

// Action Button on product cards for the add to basket function

// Defined while rendering on page
interface ActionButtonProps {
    textOnButton?: string;
    toastMessage?: string;
}

function ActionButton(props: ActionButtonProps) {
    // Tracks the click of the action button, sets the initial state (not clicked)
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(true);
        setTimeout(() => setClicked(false), 1000); // Resets after 1 second
    };

    return (
        <div>
            {/* Add to basket button: */}
            <button onClick={handleClick} className="btn-dark">
                {/* Use props.textOnButton if it has a value, otherwise the default is "Add to basket" */}
                {props.textOnButton || "Add to basket"}
            </button>
            {/* Toast message: use props.toastMessage if it has a value, otherwise the default is "Straight into your basket!" */}
            <Toast message={props.toastMessage || "Straight into your basket!"}
                visible={clicked} />
        </div>
    );
}

export default ActionButton;