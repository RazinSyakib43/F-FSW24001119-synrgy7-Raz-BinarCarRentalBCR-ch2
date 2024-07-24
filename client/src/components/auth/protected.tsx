import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface ProtectedProps {
    children: React.ReactElement;
}

const Protected = ({ children }: ProtectedProps) => {
    const { token } = useAuth();

    if (!token) {
        return <Navigate to="/auth/login" replace />;
    }

    return children;
};

export default Protected;
