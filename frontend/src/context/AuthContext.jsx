// context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return Boolean(localStorage.getItem("token"));
    });
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUserDetails = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/auth/getuser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (data.success) {
                setUser(data.user);
            } else {
                // If token is invalid or expired
                logout();
            }
        } catch (error) {
            console.error("Failed to fetch user:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchUserDetails();
        } else {
            setUser(null);
            setLoading(false);
        }
    }, [isAuthenticated]);

    const login = () => {
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ 
            isAuthenticated, 
            user,
            loading,
            login,
            logout 
        }}>
            {children}
        </AuthContext.Provider>
    );
};

// Create a custom hook for using the context
export const useAuth = () => {
    return useContext(AuthContext);
};