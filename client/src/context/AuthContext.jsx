import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState({
        token: sessionStorage.getItem("userInfo") ? JSON.parse(sessionStorage.getItem("userInfo")).token : "",
        role: sessionStorage.getItem("userInfo") ? JSON.parse(sessionStorage.getItem("userInfo")).role : ""
    });

    const setUserDetails = (token, role) => {
        setUser({
            ...user,
            token: token,
            role: role
        });
        window.sessionStorage.setItem("userInfo", JSON.stringify({ token, role }));
    };

    const logoutUser = () => {
        console.log("Logout Success");
        setUser({
            ...user,
            token: "",
            role: ""
        });
        window.sessionStorage.removeItem("userInfo");
    }

    return (
        <AuthContext.Provider value={{
            user, setUserDetails, logoutUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}