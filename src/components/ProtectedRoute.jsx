import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
        Authenticating...
      </div>
    );
  }

  // ✅ Only allow access if user exists and has allowed role
  if (user && allowedRoles.includes(user.role)) {
    return <Outlet />;
  }

  // Otherwise redirect to home (or login)
  return <Navigate to="/" state={{ from: location }} replace />;
};

export default ProtectedRoute;
