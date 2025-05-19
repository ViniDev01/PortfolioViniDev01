import React from 'react';
import { useUser } from './UserContext';
import { Navigate } from 'react-router-dom';

export function ProtectedRoute ( { children }) {
    const user = useUser();
    return user ? children : <Navigate to="/login" />
}

