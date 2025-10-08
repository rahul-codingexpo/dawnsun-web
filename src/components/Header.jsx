import React, { useState, useEffect, useRef } from "react";
import "../styles/Header.css";
import Avtar from "../assets/avtar.png";
import bell from "../assets/bell-icon.png";

const Header = ({ onSearch, searchTerm }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // const [searchText, setSearchText] = useState("");
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const dropdownRef = useRef(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Fetch access requests (only for Admins)
  useEffect(() => {
    const fetchRequests = async () => {
      if (!user || user.role !== "Admin") return; // only Admin sees requests
      try {
        const res = await fetch("http://localhost:5000/api/access-request", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        const sorted = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        if (Array.isArray(data)) {
          // show only pending/in process requests as "notifications"
          setNotifications(
            sorted.filter(
              (req) => req.status !== "approved" && req.status !== "denied"
            )
          );
        } else {
          setNotifications([]);
        }
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    };

    fetchRequests();
  }, [user, token]);

  // Handle Approve/Deny from dropdown
  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/access-request/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      if (res.ok) {
        setNotifications((prev) =>
          prev.map((n) => (n._id === id ? { ...n, status } : n))
        );
      }
    } catch (err) {
      console.error("Error updating request:", err);
    }
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  // const handleInputChange = (e) => {
  //   const value = e.target.value;
  //   setSearchText(value);
  //   if (onSearch) {
  //     onSearch(value.trim());
  //   }
  // };
  const handleInputChange = (e) => {
    const value = e.target.value;
    onSearch(value.trim()); // call parent
  };
  const trimName = (name) => {
    if (!name) return "";
    return name.length > 20 ? name.substring(0, 20) + "...." : name;
  };

  return (
    <header className="header">
      <div className="header-wrapper">
        {/* 🔍 Global Search Bar */}
        <div className="global-search">
          <input
            type="text"
            placeholder="Search...."
            value={searchTerm}
            onChange={handleInputChange}
            // onChange={(e) => handleInputChange(e.target.value)}
            className="global-search-input"
          />
        </div>

        <div className="header-content">
          {/* Notification */}
          {user?.role === "Admin" && (
            <div className="notification-wrapper">
              <div
                className="notification-icon"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <img src={bell} alt="Notifications" className="icon-img" />
                <span className="notification-badge">
                  {notifications.length}
                </span>
              </div>

              {dropdownOpen && (
                <div className="notification-dropdown" ref={dropdownRef}>
                  <div className="notification-top-header">
                    <h3 style={{ margin: 0, padding: 0 }}>Latest Requests</h3>
                    <button
                      className="circle-btn"
                      onClick={() => setDropdownOpen(false)}
                    >
                      ×
                    </button>
                  </div>
                  <hr className="modal-divider" />
                  {notifications.length === 0 ? (
                    <p className="notification-empty">No new requests</p>
                  ) : (
                    notifications.map((note) => (
                      <div key={note._id} className="notification-item">
                        <p className="notification-text">
                          {note.user?.name} requested to access{" "}
                          <strong>{trimName(note.item?.name)}</strong>
                        </p>
                        <div className="notification-actions">
                          <button
                            className="btn-accept"
                            onClick={() =>
                              handleUpdateStatus(note._id, "approved")
                            }
                          >
                            Give Access
                          </button>
                          <button
                            className="btn-decline"
                            onClick={() =>
                              handleUpdateStatus(note._id, "denied")
                            }
                          >
                            Decline
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}
          {/* User Profile */}
          <div className="user-profile">
            <img src={Avtar} alt="Profile" className="profile-img" />
            <div className="profile-info">
              <span className="profile-name">{user?.name || "Guest"}</span>
              <span className="profile-role">{user?.role || "Invalid"}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
