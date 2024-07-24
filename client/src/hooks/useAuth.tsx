import { createContext, useContext, ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLocalStorage } from './useLocalStorage';

interface AuthContextType {
    user: string | null;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactElement }) => {
    const [user, setUser] = useLocalStorage('user', '');
    const [token, setToken] = useLocalStorage('token', '');
    const navigate = useNavigate();

    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post('http://localhost:8080/api/v1/dashboard/auth/login/admin', {
                email,
                password
            });

            const { user, token } = response.data;
            setUser(user);
            setToken(token);
            navigate('/dashboard', { replace: true });
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        navigate('/auth/login', { replace: true });
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
