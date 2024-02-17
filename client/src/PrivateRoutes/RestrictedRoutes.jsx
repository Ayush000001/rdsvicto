import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Navigate, Outlet } from "react-router-dom";

const RestrictedRoutes = () => {
    const { user } = useContext(AuthContext);
    return user.token ? <Navigate to="/" /> : <Outlet />
}

export default RestrictedRoutes