import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom';

const SuperAdminRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    return user.role === "superadmin" ? <Outlet /> : <Navigate to="/" />
}

export default SuperAdminRoute