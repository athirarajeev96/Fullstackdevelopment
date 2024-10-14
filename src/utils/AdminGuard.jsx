import React from 'react';
import { Navigate } from 'react-router-dom';

const getUserRole = () => localStorage.getItem('role');

const AdminGuard = ({ children }) => {
  const role = getUserRole();
  return role === 'Admin' ? children : <Navigate to='/login' />;
};

export default AdminGuard;