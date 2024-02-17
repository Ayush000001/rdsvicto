import React, { useContext } from "react";
import "./_header.scss";
import { Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from "@mui/material"
import { Settings, Logout, Person } from "@mui/icons-material";
import { FaBars } from "react-icons/fa";

import { MDBBtn } from "mdb-react-ui-kit";
import { SidebarContext } from "../../context/SidebarContext";
import { AuthContext } from "../../context/AuthContext";

import MLogo from "../../assets/images/M-logo.png"

const Header = ({ data, heading }) => {
    const { openSidebar } = useContext(SidebarContext);
    const { logoutUser } = useContext(AuthContext);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        setAnchorEl(null);
        logoutUser();
    }

    return (
        <header className="header">
            {/* Toggle Button */}
            <MDBBtn color="none" className="header-toggle-button" onClick={openSidebar}>
                <FaBars />
            </MDBBtn>

            {/* Heading Role */}
            <h4 className="mb-0 heading">
                {heading}
                {data.role === "admin" && (
                    <Tooltip className="" title="Microsoft">
                        <IconButton
                            size="small"
                            sx={{ ml: 2 }}
                        >
                            <img src={MLogo} style={{ width: "32px", height: "32px", borderRadius: "50%" }} alt="Logo" />
                        </IconButton>
                    </Tooltip>
                )}
            </h4>

            <div className="d-flex align-items-center avatar">
                <h5 className="mb-0">Sumit Ganju</h5>
                {/* Avatar */}
                <Tooltip className="" title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 32, height: 32 }}>S</Avatar>
                    </IconButton>
                </Tooltip>
            </div>

            {/* Menu */}
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Person fontSize="small" />
                    </ListItemIcon>
                    Profile
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </header>
    )
}

export default Header