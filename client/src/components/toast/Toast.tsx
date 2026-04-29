import "./Toast.css";

// Reusable toast for action buttons, login and registration pages (toast message is customizable on page)
interface ToastProps {
    visible: boolean; // tracks whether the toast is visible
    message: string; // toast message
}

function Toast(props: ToastProps) {
    // If the toast is not visible, don't return anything. 
    if (!props.visible) {
        return null;
    }

    return (
        <div className="popup show">
            {/* Customizable toast message depending on where you use the component */}
            <p> {props.message} </p>
            <div className="checkmark"> ✓ </div>
        </div>
    );
}

export default Toast;
