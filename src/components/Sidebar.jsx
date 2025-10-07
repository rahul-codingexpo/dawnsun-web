import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Sidebar.css";
import logo from "../assets/dawnsun_logo.png";
import { RiDashboardFill } from "react-icons/ri";
import { MdFileCopy } from "react-icons/md";

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const getActiveItemFromPath = () => {
    if (location.pathname.includes("/dashboard/files")) return "Files";
    if (location.pathname.includes("/dashboard/travel"))
      return "Travel Application";
    if (location.pathname.includes("/dashboard/leave-application"))
      return "Leave Application";
    if (location.pathname.includes("/dashboard/logs")) return "Logs";
    if (location.pathname.includes("/dashboard/roles")) return "Roles";
    if (location.pathname.includes("/dashboard/request"))
      return "Request Access";
    if (location.pathname === "/dashboard") return "Dashboard";
    return "";
  };

  const [activeItem, setActiveItem] = useState(getActiveItemFromPath());

  // Menu items for Admin
  const adminMenuItems = [
    { name: "Dashboard", icon: <RiDashboardFill size="30" /> },
    { name: "Files", icon: <MdFileCopy size="25" /> },
    { name: "Travel Application", icon: <MdFileCopy size="25" /> },
    { name: "Leave Application", icon: <MdFileCopy size="25" /> },
    { name: "Logs", icon: <MdFileCopy size="25" /> },
    { name: "Roles", icon: <MdFileCopy size="25" /> },
    { name: "Request Access", icon: <MdFileCopy size="25" /> },
    { name: "Logout", icon: <MdFileCopy size="25" /> },
  ];

  // Menu items for normal User
  const userMenuItems = [
    { name: "Dashboard", icon: <RiDashboardFill size="30" /> },
    { name: "Files", icon: <MdFileCopy size="25" /> },
    { name: "Logout", icon: <MdFileCopy size="25" /> },
  ];

  // Pick correct menu based on role
  const menuItems = user?.role === "Admin" ? adminMenuItems : userMenuItems;

  const handleMenuClick = (itemName) => {
    setActiveItem(itemName);
    setIsMobileMenuOpen(false);

    switch (itemName) {
      case "Dashboard":
        navigate("/dashboard");
        break;
      case "Files":
        navigate("/dashboard/files");
        break;
      case "Travel Application":
        navigate("/dashboard/travel");
        break;
      case "Leave Application":
        navigate("/dashboard/leave-application");
        break;
      case "Logs":
        navigate("/dashboard/logs");
        break;
      case "Roles":
        navigate("/dashboard/roles");
        break;
      case "Request Access":
        navigate("/dashboard/request");
        break;
      case "Logout":
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
        break;
      default:
        break;
    }
  };

  return (
    <>
      <button
        className={`mobile-menu-button ${isMobileMenuOpen ? "close-btn" : ""}`}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <div className="hamburger-icon">
          {isMobileMenuOpen ? (
            <span className="close-icon">&times;</span>
          ) : (
            <>
              <span />
              <span />
              <span />
            </>
          )}
        </div>
      </button>
      <aside className={`sidebar ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="sidebar-logo">
          <img src={logo} alt="Logo" className="logo-img" />
        </div>
        <nav className="sidebar-menu">
          <ul>
            {menuItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => handleMenuClick(item.name)}
                  className={`menu-item ${
                    activeItem === item.name ? "active" : ""
                  }`}
                >
                  <span className="menu-icon">{item.icon}</span>
                  <span className="icon-name">{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {isMobileMenuOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
