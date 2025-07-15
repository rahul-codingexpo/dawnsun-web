import React, { useState, useEffect, useRef } from "react";
import "../styles/Header.css";
import Avtar from "../assets/avtar.png";
// import bell from "../assets/bell-icon.svg";
import bell from "../assets/bell-icon.png";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const notifications = [
    { id: 1, message: "Priya requested to access Employee-Handbook.pdf" },
    { id: 2, message: "Priya requested to access Quarterly-Report.docx" },
    { id: 3, message: "Priya requested to access Training-Schedule.xlsx" },
    { id: 2, message: "Priya requested to access Quarterly-Report.docx" },
    { id: 3, message: "Priya requested to access Training-Schedule.xlsx" },
  ];

  const handleAccept = (id) => {
    console.log("Accepted request:", id);
  };

  const handleDecline = (id) => {
    console.log("Declined request:", id);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <header className="header">
      <div className="header-content">
        {/* Notification Icon */}
        <div className="notification-wrapper">
          <div
            className="notification-icon"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <img src={bell} alt="Notifications" className="icon-img" />
            <span className="notification-badge">{notifications.length}</span>
          </div>

          {dropdownOpen && (
            <div className="notification-dropdown" ref={dropdownRef}>
              <div className="notification-top-header">
                <h3 style={{ margin: "0px", padding: "0px" }}>Latest Update</h3>
                <button
                  className="circle-btn"
                  onClick={() => setDropdownOpen(false)}
                >
                  ×
                </button>
              </div>
              <hr className="modal-divider" />
              {notifications.map((note) => (
                <div key={note.id} className="notification-item">
                  <p className="notification-text">{note.message}</p>
                  <div className="notification-actions">
                    <button
                      className="btn-accept"
                      onClick={() => handleAccept(note.id)}
                    >
                      Accept
                    </button>
                    <button
                      className="btn-decline"
                      onClick={() => handleDecline(note.id)}
                    >
                      Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="user-profile">
          <img src={Avtar} alt="Profile" className="profile-img" />
          <div className="profile-info">
            <span className="profile-name">Rohit Singh</span>
            <span className="profile-role">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
