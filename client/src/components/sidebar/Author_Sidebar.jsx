import { useContext, useEffect, useRef } from "react"
import "./Sidebar.scss"
import logo from "../../assets/images/logo.jpeg"
import { MdOutlineClose } from "react-icons/md"
import { SidebarContext } from "../../context/SidebarContext";

import { NavLink } from "react-router-dom";

// React Pro Sidebar Libraries
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { PiDotOutlineFill } from "react-icons/pi";

const Author_Sidebar = () => {
    const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
    const navbarRef = useRef(null);

    // closing the navbar when clicked outside the sidebar area
    const handleClickOutside = (event) => {
        if (
            navbarRef.current &&
            !navbarRef.current.contains(event.target) &&
            event.target.className !== "sidebar-oepn-btn"
        ) {
            closeSidebar();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <nav className={`sidebar author_sidebar ${isSidebarOpen ? "sidebar-show" : ""}`} ref={navbarRef}>
            <div className="sidebar-top">
                <div className="sidebar-brand">
                    <img src={logo} className="w-100" alt="logo" />
                    {/* <span className="sidebar-brand-text">tabernam.</span> */}
                </div>

                <button className="sidebar-close-btn" onClick={closeSidebar}>
                    <MdOutlineClose size={24} />
                </button>
            </div>

            <div className="sidebar-body">
                <div className="sidebar-menu">
                    <ul className="menu-list">
                        <li className="menu-item">
                            <Sidebar className="w-100 author_menu_container">
                                <Menu menuItemStyles={{
                                    button: {
                                        [`&.active`]: {
                                            backgroundColor: '#eaffed2e',
                                            color: '#004D09',
                                            fontWeight: "600"
                                        },
                                    },
                                }} transitionDuration={500}>
                                    <SubMenu label="Forms" className="parent_span">
                                        {/* <SubMenu className="parent_inner_span" label="CEDAR v1.0">
                                            <MenuItem icon={<PiDotOutlineFill />} component={<NavLink to="/summary-data" />} className="child_span">Summary Data</MenuItem>
                                            <MenuItem icon={<PiDotOutlineFill />} component={<NavLink to="/original-build-estimate" />} className="child_span">Original Build Estimate</MenuItem>
                                            <MenuItem icon={<PiDotOutlineFill />} className="child_span">Full Assessment</MenuItem>
                                            <MenuItem icon={<PiDotOutlineFill />} className="child_span">People, Travel & Tools</MenuItem>
                                            <MenuItem icon={<PiDotOutlineFill />} className="child_span">End of Life Assessment</MenuItem>
                                        </SubMenu> 
                                        <SubMenu className="parent_inner_span" label="ROSEWOOD v1.0"></SubMenu> */}

                                        <MenuItem icon={<PiDotOutlineFill />} component={<NavLink to="/cedar1.0" />} className="child_span">CEDAR v1.0</MenuItem>
                                        <MenuItem icon={<PiDotOutlineFill />} className="child_span">ROSEWOOD v1.0</MenuItem>
                                    </SubMenu>
                                </Menu>
                            </Sidebar>

                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Author_Sidebar