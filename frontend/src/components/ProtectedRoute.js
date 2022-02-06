import React from 'react';
import { useNavigate } from 'react-router-dom';
import { hasValidAccessToken } from '../api/TokenHandler';
import { Navigate, Outlet } from 'react-router';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = hasValidAccessToken();
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to="/login" />;
};
export default ProtectedRoute;
