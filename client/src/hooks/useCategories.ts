import { useEffect, useState } from "react";

// Category represents a filter category returned by the server.
// `name` is the category key (e.g. "color", "gender") and
// `possibleVals` lists the values available for that category.
export type Category = {
    name: string;
    possibleVals: string[];
};

// Fetch categories from the API endpoint and normalize the response into
// an array of `Category` objects. The server returns a map/object where
// each key is the category name and the value is an array of strings.
export async function fetchCategories(): Promise<Category[]> {
    const url = "http://localhost:3001/products/categories";
    const res = await fetch(url, {
        method: "GET",
        headers: { Accept: "application/json" },
    });

    if (!res.ok) {
        // Let callers handle the error; include the status for easier debugging.
        throw new Error(`Request failed: ${res.status}`);
    }

    // The API shape is Record<string, string[]>, convert to Category[] for UI.
    const data = (await res.json()) as Record<string, string[]>;

    return Object.entries(data).map(([name, possibleVals]) => ({
        name,
        possibleVals,
    }));
}

// React hook that exposes categories, a loading flag, and an error message.
// It fetches data on mount and updates local state accordingly. Consumers
// can use the `categories` array to render filter sections in the UI.
export function useCategories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchCategories()
            .then(setCategories)
            .catch((err: unknown) =>
                setError(err instanceof Error ? err.message : "Unknown error")
            )
            .finally(() => setLoading(false));
    }, []);

    return { categories, loading, error };
}