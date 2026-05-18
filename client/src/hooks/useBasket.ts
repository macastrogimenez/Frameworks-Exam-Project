import { useEffect, useState } from "react";

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

    // Convert basket items to sparse array format for backward compatibility
    function basketItemsToArray(items: BasketItemDetail[]): number[] {
        const basketarray = new Array(productCount).fill(0);
        items.forEach((item) => {
            basketarray[item.productId] = item.quantity;
        });
        return basketarray;
    }

    // Load basket from API on mount
    useEffect(() => {
        // TODO: Replace localStorage with user API authentication when user API is fully implemented
        const username = localStorage.getItem("registeredName");
        setRegisteredName(username);

        if (!username) {
            return;
        }

        fetch(`http://localhost:3001/user/${username}/basket`)
            .then((response) => response.json())
            .then((data: BasketResponse) => setBasketData(data))
            .catch((error) => {
                console.error("Failed to load basket:", error);
                setBasketData(null);
            });
    }, []);


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

    // Place order and clear basket
    //TODO: Make sure the API is updated to handle order placement and not just clear the basket locally
    const placeOrder = (): void => {
        localStorage.removeItem("basketProducts");
        setBasketData(null);
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
