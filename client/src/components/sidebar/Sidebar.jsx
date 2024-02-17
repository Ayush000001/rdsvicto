import { useContext, useEffect, useRef, useState } from "react"
import { Link, NavLink } from "react-router-dom";
import "./Sidebar.scss"
import logo from "../../assets/images/logo.jpeg"
import { MdOutlineClose, MdOutlineGridView, MdOutlineLogout, MdOutlineSettings } from "react-icons/md"
import { SidebarContext } from "../../context/SidebarContext";
import { BiSolidUserRectangle, BiSolidUser } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  const navbarRef = useRef(null);
  const [isUserOpen, setIsUserOpen] = useState(false);

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
    <nav className={`sidebar ${isSidebarOpen ? "sidebar-show" : ""}`} ref={navbarRef}>
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
              <NavLink to="/" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlineGridView size={18} />
                </span>
                <span className="menu-link-text">Dashboard</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink className="menu-link" to="/clients">
                <span className="menu-link-icon">
                  <BiSolidUserRectangle size={20} />
                </span>
                <span className="menu-link-text">Clients</span>
              </NavLink>
              {/* <Collapse in={isUserOpen} className="" timeout="auto" unmountOnExit>
                <ul className="menu-item-submenu">
                  <li>
                    <NavLink to="/lists">
                      <span className="menu-link-icon">
                        <GoDotFill size={10} />
                      </span>
                      <span className="menu-link-text">List</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/add-admin">
                      <span className="menu-link-icon">
                        <GoDotFill size={10} />
                      </span>
                      <span className="menu-link-text">Create</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/edit-admin">
                      <span className="menu-link-icon">
                        <GoDotFill size={10} />
                      </span>
                      <span className="menu-link-text">Edit</span>
                    </NavLink>
                  </li>
                </ul>
              </Collapse> */}
            </li>
            <li className="menu-item">
              <NavLink className="menu-link" to="/gcgusers">
                <span className="menu-link-icon">
                  <BiSolidUser size={20} />
                </span>
                <span className="menu-link-text">GCG Users</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink className="menu-link" to="/settings">
                <span className="menu-link-icon">
                  <IoMdSettings size={20} />
                </span>
                <span className="menu-link-text">Setting</span>
              </NavLink>
            </li>
          </ul>
        </div>

        {/* <div className="sidebar-menu sidebar-menu2">
          <ul className="menu-list">
            <li className="menu-item">
              <Link to="/" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlineSettings size={20} />
                </span>
                <span className="menu-link-text">Settings</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlineLogout size={20} />
                </span>
                <span className="menu-link-text">Logout</span>
              </Link>
            </li>
          </ul>
        </div> */}
      </div>
    </nav>
  )
}

export default Sidebar