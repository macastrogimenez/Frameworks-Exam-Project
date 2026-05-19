export type UserDetails = { firstName?: string; lastName?: string; email: string };

const REGISTERED_NAME_KEY = "registeredName";
const USER_DETAILS_KEY = "userDetails";

export function getCurrentUser(): UserDetails | null {
    const userJson = localStorage.getItem(USER_DETAILS_KEY);
    if (userJson) {
        try {
            const parsedUser = JSON.parse(userJson);
            if (typeof parsedUser?.email !== "string") {
                return null;
            }

            return {
                firstName: parsedUser.firstName,
                lastName: parsedUser.lastName,
                email: parsedUser.email,
            };
        } catch {
            return null;
        }
    }
    const email = localStorage.getItem(REGISTERED_NAME_KEY);
    return email ? { email } : null;
}

export function loginUser(email: string) {
    localStorage.setItem(REGISTERED_NAME_KEY, email);
}

export function saveUserDetails(user: UserDetails) {
    const safeUserDetails: UserDetails = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    };

    localStorage.setItem(USER_DETAILS_KEY, JSON.stringify(safeUserDetails));
}

export function logoutUser() {
    localStorage.removeItem(REGISTERED_NAME_KEY);
    localStorage.removeItem(USER_DETAILS_KEY);
}