import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminDashboard from "../scress/dashboard/admin/AdminDashboard";
import { AllUsers, Dashboard } from "../scress";
import BaseLayout from "../layout/BaseLayout";
import GCGUsers from "../pages/superadmin/gcg/GCGUsers";
import Setting from "../pages/superadmin/setting/Setting";
import ClientUser from "../pages/admin/clients/ClientUser";
import AdminSetting from "../pages/admin/setting/AdminSetting";
import Author_Form from "../scress/dashboard/author/Author_Form";
import Summary_Data from "../scress/dashboard/author/questions/Summary_Data";
import Original_Build_Estimate from "../scress/dashboard/author/questions/Original_Build_Estimate";
import Cedar1_0 from "../scress/dashboard/author/container/Cedar1_0";

const PrivateRoutes = ({ children }) => {
    const { user } = useContext(AuthContext);

    const SuperAdminRoute = () => {
        return (
            <Routes>
                <Route element={<BaseLayout userRole="superadmin" />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/clients" element={<AllUsers />} />
                    <Route path="/gcgusers" element={<GCGUsers />} />
                    <Route path="/settings" element={<Setting />} />
                </Route>
            </Routes>
        )
    };

    const AdminRoute = () => {
        return (
            <Routes>
                <Route element={<BaseLayout userRole="admin" />}>
                    <Route path="/" element={<AdminDashboard />} />
                    <Route path="/clients" element={<ClientUser />} />
                    <Route path="/settings" element={<AdminSetting />} />
                </Route>
            </Routes>
        )
    };

    const AuthorRoute = () => {
        return (
            <Routes>
                <Route element={<BaseLayout userRole="author" />}>
                    <Route path="/">
                        <Route path="/" element={<Author_Form />} />
                        <Route path="/cedar1.0" element={<Cedar1_0 />} />
                        <Route path="/original-build-estimate" element={<Original_Build_Estimate />} />
                    </Route>
                </Route>
            </Routes>
        )
    };

    return !user.token ? <Navigate to="/login" /> : (
        user.role === "superadmin" ? <SuperAdminRoute /> : user.role === "admin" ? <AdminRoute /> : <AuthorRoute />
    )
}

export default PrivateRoutes