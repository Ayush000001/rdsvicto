import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Navigate, Outlet } from "react-router-dom";


const AdminRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    console.log(user.role)

    return user?.role === "admin" ? <Outlet /> : <Navigate to="/" />
}

export default AdminRoute