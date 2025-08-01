import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const RoleRoute = ({children, allowedRoute}) => {
    const {user, loading} = useAuth();
    
    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
        </div>;
    }
    
    if(!user) {
        return <Navigate to="/signin" replace />
    }

    if(!allowedRoute.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />
    }

    return children;
}

export {RoleRoute};