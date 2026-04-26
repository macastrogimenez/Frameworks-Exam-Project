import React from "react";
import "./Toast.css";

//Reusable toast for action buttons, login and registration pages (toast message is customizable on page)

interface ToastProps {
    visible: boolean; //tracks whether the toast is visible
    message: string; //toast message 
}

export class Toast extends React.Component<ToastProps> {
    render() {
        {/* If the toast is not visible, don't return anything. */ }
        if (!this.props.visible) {
            return null;
        }
        return (
            <div className="popup show">
                {/* Customizable toast message depending on where you use the component */}
                <p>{this.props.message}</p>

                <div className="checkmark">✓</div>
            </div>
        );
    }
}
