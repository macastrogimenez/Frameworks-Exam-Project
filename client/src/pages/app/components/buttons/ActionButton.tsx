import React from "react";
import "./ActionButton.css";
import { Toast } from "../toast/Toast";

//Action Button on product cards for the add to basket function 

//Defined while rendering on page
interface ActionButtonProps {
    label?: string;
    toastMessage?: string;
}

interface ActionButtonState { //tracks the click of the button 
    clicked: boolean;
}

export class ActionButton extends React.Component<
    ActionButtonProps,
    ActionButtonState
> {
    constructor(props: ActionButtonProps) {
        super(props);
        this.state = { clicked: false }; //sets the initial state of the button (not clicked)
    }

    handleClick = () => {
        this.setState({ clicked: true });
        setTimeout(() => {
            this.setState({ clicked: false });
        }, 1000); //resets after 1 second
    }

    render() {
        return (
            <div>
                {/* Add to basket button: */}
                <button onClick={this.handleClick} className="btn-dark">
                    {this.props.label || "Add to basket"}
                </button>

                {/* Customized toast message after clicking: */}
                <Toast message={this.props.toastMessage || "Straight into your basket!"}
                    visible={this.state.clicked}
                />
            </div>
        );
    }
}