import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

// This hook fetches basket data from the server and manages basket state.
// The hook returns the basket data and functions to manipulate it.

export type BasketItemDetail = {
    productId: number;
    productName: string;
    quantity: number;
    unitPrice: number;
    discount: number;
};

export type BasketResponse = {
    username: string;
    basket: BasketItemDetail[];
    totalPrice: string;
};

function useBasket(productCount: number) {
    const [basketData, setBasketData] = useState<BasketResponse | null>(null);
    const [registeredName, setRegisteredName] = useState<string | null>(null);
    const { user } = useAuth(); // For handling authenticated users and guests.

    // Convert basket items to sparse array format for backward compatibility
    function basketItemsToArray(items: BasketItemDetail[] | undefined | null): number[] {
        const basketarray = new Array(productCount).fill(0); // Fill array with zeros based on product count
        if (!Array.isArray(items)) { // Guard clause for missing or invalid items data
            items = [];
        }
        items.forEach((item) => { // Loop over each item and populate the corresponding index with quantity.
            basketarray[item.productId] = item.quantity;
        });
        return basketarray;
    }

    // Generate or retrieve guest ID for non-logged-in users
    function getOrCreateGuestId(): string {
        let guestId = localStorage.getItem("guestId");
        if (!guestId) {
            guestId = "guest_" + Math.random().toString(36).substr(2, 9); // Math.random() generate decimal number. toString convert to base 36 (letters + numbers), substr extract substring for shorter ID.
            localStorage.setItem("guestId", guestId);
        }
        return guestId;
    }

    // Load basket from API
    useEffect(() => {
        // Use authenticated user email or generate a guest ID
        const userId = user?.email || getOrCreateGuestId();
        setRegisteredName(userId);

        fetch(`http://localhost:3001/user/${userId}/basket`) //HTTP GET request. Asynchronous operation.
            .then((response) => response.json()) // convert to json
            .then((data: BasketResponse) => setBasketData(data))  //updates basketData state with the fetched data.
            .catch((error) => {
                console.error("Failed to load basket:", error);
                setBasketData(null); // Error handling.
            });
    }, [user]); // Dependency array. Syncs basket with user changes.


    // Add a product to basket
    const addToBasket = (productId: number, quantity: number = 1): void => {
        if (!registeredName) return; // Guard clause.


        fetch(`http://localhost:3001/user/${registeredName}/basket`, { //HTTP PUT Method.
            method: "PUT",
            headers: {
                "Content-Type": "application/json", // sending json data
            },
            body: JSON.stringify({ product: [productId, quantity] }), // match with backend's format
        })
            .then((response) => response.json())
            .then((data: BasketResponse) => setBasketData(data))
            .catch((error) => console.error("Error adding to basket:", error));
    };

    // Remove one unit of a product from basket
    const removeFromBasket = (productId: number): void => {
        if (!registeredName) return;

        fetch(`http://localhost:3001/user/${registeredName}/basket/${productId}`, { //HTTP DELETE Method.
            method: "DELETE",
        })
            .then((response) => response.json())
            .then((data: BasketResponse) => setBasketData(data))
            .catch((error) => console.error("Error removing from basket:", error));
    };


    // Place order and clear basket, returns a promise for UI feedback. Asynchronous operation.
    const placeOrder = async (): Promise<boolean> => { //order success or order failed
        if (!registeredName) return false;
        try { //try block
            const response = await fetch(`http://localhost:3001/user/${registeredName}/basket`, {
                method: "DELETE",
            }); // HTTP DELETE method
            if (!response.ok) throw new Error("Order failed"); // jump to catch block if response is not ok
            const data: BasketResponse = await response.json(); // parse server repsonse as basketresponse object (should be empty)
            setBasketData(data);
            return true;
        } catch (error) {
            console.error("Error placing order:", error);
            return false; // error handling used in BasketPage to show toast message.
        }
    };

    return { // The hook returns an object with the following properties for the parent components to use:
        basket: basketItemsToArray(basketData?.basket || []),
        registeredName,
        addToBasket,
        removeFromBasket,
        placeOrder,
        basketData,
    };
}

export default useBasket;
