import React, { createContext, useContext, useEffect, useState } from "react";
import * as auth from "../utils/auth";

type AuthContextType = {
    user: auth.UserDetails | null;
    isLoggedIn: boolean;
    login: (email: string) => void;
    saveDetails: (u: auth.UserDetails) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<auth.UserDetails | null>(auth.getCurrentUser());

    useEffect(() => {
        const onStorage = () => setUser(auth.getCurrentUser());
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);

    const login = (email: string) => { auth.loginUser(email); setUser({ email }); };
    const saveDetails = (u: auth.UserDetails) => { auth.saveUserDetails(u); setUser(u); };
    const logout = () => { auth.logoutUser(); setUser(null); };

    return (
        <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, saveDetails, logout }}>
        {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}