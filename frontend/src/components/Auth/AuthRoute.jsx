
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AuthRoute = ({ children, requiredRole }) => {
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    if (!isAuthenticated) {

        return <Navigate to="/login" />;
    }

    if (requiredRole && user.role !== requiredRole) {
        return <Navigate to="/" />;
    }

    return children;
};

export default AuthRoute;