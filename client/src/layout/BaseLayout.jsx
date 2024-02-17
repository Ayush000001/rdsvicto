import { Outlet } from "react-router-dom"
import { AdminSidebar, Author_Sidebar, Sidebar, SuperAdminSidebar } from "../components"
import Header from "../components/header/Header"
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const BaseLayout = ({ userRole }) => {
    const { user } = useContext(AuthContext);
    let sidebarComponent;

    switch (userRole) {
        case "superadmin":
            sidebarComponent = <SuperAdminSidebar />;
            break;
        case "admin":
            sidebarComponent = <AdminSidebar />
            break;
        case "author":
            sidebarComponent = <Author_Sidebar />
            break;
        default:
            sidebarComponent = <Sidebar />
    }

    return (
        <main className="page-wrapper">
            {/* Sidebar Component */}
            {sidebarComponent}
            <div className={`content-wrapper ${userRole === "author" && "author"}`}>
                <Header data={user} heading={userRole === "superadmin" ? "Super Admin" : "Admin"} />
                <div className="main-layout">
                    <Outlet />
                </div>
            </div>
        </main>
    )
}

export default BaseLayout