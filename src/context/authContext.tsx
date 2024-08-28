import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useLocalStorage } from '../hooks/useLocalStorage';

export interface AuthContextProps {
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    userRole: string | null;
    userName: string | null;
    userAvatar: string | null;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useLocalStorage<string | null>('token', null);
    const [userRole, setUserRole] = useState<string | null>(null);
    const [userName, setUserName] = useState<string | null>(null);
    const [userAvatar, setUserAvatar] = useState<string | null>(null);

    const getCurrentUser = async () => {    
        try {
            const response = await axios.get('https://itchy-kass-zeens-e78e4aa6.koyeb.app/api/v1/dashboard/users/me', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const { name, avatar } = response.data.data;
            setUserName(name);
            setUserAvatar(avatar);
        } catch (error) {
            console.error('Failed to fetch user data', error);
            logout();
        }
    };

    useEffect(() => {
        if (token) {
            getCurrentUser();
        }
    }, [token]);

    const login = async (email: string, password: string) => {
        try {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);

            const response = await axios.post('https://itchy-kass-zeens-e78e4aa6.koyeb.app/api/v1/dashboard/auth/login/admin', formData);
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
        setUserAvatar(null);
        setUserRole(null);
    };

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{ login, logout, isAuthenticated, userRole, userName, userAvatar }}>
            {children}
        </AuthContext.Provider>
    );
}
