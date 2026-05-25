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
    const { user } = useAuth();

    // Convert basket items to sparse array format for backward compatibility
    function basketItemsToArray(items: BasketItemDetail[] | undefined | null): number[] {
        const basketarray = new Array(productCount).fill(0);
        if (!Array.isArray(items)) {
            items = [];
        }
        items.forEach((item) => {
            basketarray[item.productId] = item.quantity;
        });
        return basketarray;
    }

    // Generate or retrieve guest ID for non-logged-in users
    function getOrCreateGuestId(): string {
        let guestId = localStorage.getItem("guestId");
        if (!guestId) {
            guestId = "guest_" + Math.random().toString(36).substr(2, 9);
            localStorage.setItem("guestId", guestId);
        }
        return guestId;
    }

    // Load basket from API on mount and when user authentication changes
    useEffect(() => {
        // Use authenticated user email or generate a guest ID
        const userId = user?.email || getOrCreateGuestId();
        setRegisteredName(userId);

        fetch(`http://localhost:3001/user/${userId}/basket`)
            .then((response) => response.json())
            .then((data: BasketResponse) => setBasketData(data))
            .catch((error) => {
                console.error("Failed to load basket:", error);
                setBasketData(null);
            });
    }, [user]);


    // Add a product to basket
    const addToBasket = (productId: number, quantity: number = 1): void => {
        if (!registeredName) return;


        fetch(`http://localhost:3001/user/${registeredName}/basket`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ product: [productId, quantity] }),
        })
            .then((response) => response.json())
            .then((data: BasketResponse) => setBasketData(data))
            .catch((error) => console.error("Error adding to basket:", error));
    };

    // Remove one unit of a product from basket
    const removeFromBasket = (productId: number): void => {
        if (!registeredName) return;

        fetch(`http://localhost:3001/user/${registeredName}/basket/${productId}`, {
            method: "DELETE",
        })
            .then((response) => response.json())
            .then((data: BasketResponse) => setBasketData(data))
            .catch((error) => console.error("Error removing from basket:", error));
    };


    // Place order and clear basket, returns a promise for UI feedback
    const placeOrder = async (): Promise<boolean> => {
        if (!registeredName) return false;
        try {
            const response = await fetch(`http://localhost:3001/user/${registeredName}/basket`, {
                method: "DELETE",
            });
            if (!response.ok) throw new Error("Order failed");
            const data: BasketResponse = await response.json();
            setBasketData(data);
            return true;
        } catch (error) {
            console.error("Error placing order:", error);
            return false;
        }
    };

    return {
        basket: basketItemsToArray(basketData?.basket || []),
        registeredName,
        addToBasket,
        removeFromBasket,
        placeOrder,
        basketData,
    };
}

export default useBasket;
