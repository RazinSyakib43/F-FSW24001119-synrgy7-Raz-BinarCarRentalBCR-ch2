import React, { createContext, useState } from 'react';
import axios from 'axios';
import { useLocalStorage } from '../hooks/useLocalStorage';

export interface AuthContextProps {
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    userRole: string | null;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useLocalStorage<string | null>('token', null);
    const [userRole, setUserRole] = useState<string | null>(null);

    const login = async (email: string, password: string) => {
        try {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);

            const response = await axios.post('http://localhost:8080/api/v1/dashboard/auth/login/admin', formData);
            const { token } = response.data.data;

            setToken(token);
            setUserRole('admin'); // You can fetch the user role if needed
        } catch (error) {
            console.error('Login failed', error);
            throw error;
        }
    };

    const logout = () => {
        setToken(null);
        setUserRole(null);
    };

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{ login, logout, isAuthenticated, userRole }}>
            {children}
        </AuthContext.Provider>
    );
}
