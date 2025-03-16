import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export const PublicRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (user) {
    const userType = user.userType;
    return <Navigate to={userType === 'doctor' ? '/doctor-dashboard' : '/patient-dashboard'} replace />;
  }

  return children;
}; 