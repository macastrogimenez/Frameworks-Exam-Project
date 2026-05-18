// This hook sends login data to the server and returns the result.
// It can be used in any component that needs to perform login.

export type LoginDetails = {
    email: string;
    password: string;
};

export type LoginUser = {
    firstName?: string;
    lastName?: string;
    email: string;
};

type LoginResult = {
    user: LoginUser | null;
    error: string | null;
};

function useLogin() {
    const loginUser = async (loginValues: LoginDetails): Promise<LoginResult> => {
        try {
        const response = await fetch("http://localhost:3001/users/login", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(loginValues),
        });

        const data = await response.json();

        if (!response.ok) {
            return { user: null, error: data.error ?? "Login failed" };
        }

        return { user: data, error: null };
        } catch (error) {
        return { user: null, error: "Login failed" };
        }
    };

    return loginUser;
}

export default useLogin;