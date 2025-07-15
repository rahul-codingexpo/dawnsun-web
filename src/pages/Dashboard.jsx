import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Files from "./files";
import { VscSettings } from "react-icons/vsc";
import "../styles/Dashboard.css";
import folder from "../assets/folder.png";
import { RiArrowDropDownLine } from "react-icons/ri";
import Travel from "./TravelApplication";
import LeaveApplication from "./LeaveApplication";
import Logs from "./LogsPage";
import RolesPage from "./RolesPages";
import UploadModal from "./Uploadmodels";
import { TbCloudUpload } from "react-icons/tb";
import RequestAccessPage from "./RequestAccessPage";
const Dashboard = () => {
  const { cardName } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedPerson, setSelectedPerson] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".custom-dropdown")) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const personOptions = [
    { label: "Rohan Sharma (HR Department)", value: "rohan" },
    { label: "Neha Verma (Finance Department)", value: "neha" },
    { label: "Pooja Singh (Travel Desk)", value: "pooja" },
    { label: "Vikas Mehta (IT Department)", value: "vikas" },
    { label: "Anuj Jain (Accounts)", value: "anuj" },
  ];

  const [showUpload, setShowUpload] = useState(false);

  const cardItems = ["Dawnsun Exib", "Fisher Tirech", "Wire and Cables"];

  const isFolderListView = location.pathname === "/dashboard/files";

  const isFileView =
    location.pathname.startsWith("/dashboard/files/") && cardName;

  const isDashboardView = location.pathname === "/dashboard";
  const isTravelView = location.pathname === "/dashboard/travel";
  const isLeaveAppView = location.pathname === "/dashboard/leave-application";
  const islog = location.pathname === "/dashboard/logs";

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <Header />
        <main className="dashboard-main">
          <div className="dashboard-container">
            {isDashboardView && (
              <>
                <div className="dashboard-heading">
                  <h1 className="dashboard-title">Dashboard</h1>
                </div>
                <div className="filter-dropdown">
                  <div className="custom-dropdown">
                    <button
                      className="dropdown-toggle"
                      onClick={() => setDropdownOpen((prev) => !prev)}
                    >
                      <span
                        style={{ paddingRight: "10px", paddingLeft: "0px" }}
                      >
                        <VscSettings />
                      </span>
                      <span>
                        {personOptions.find(
                          (opt) => opt.value === selectedPerson
                        )?.label || "Filter by Department"}
                      </span>

                      <span>
                        <RiArrowDropDownLine size="2em" />
                      </span>
                    </button>

                    {dropdownOpen && (
                      <ul className="dropdown-menu">
                        {personOptions.map((option) => (
                          <li
                            key={option.value}
                            onClick={() => {
                              setSelectedPerson(option.value);
                              setDropdownOpen(false);
                            }}
                            className={`dropdown-item ${
                              selectedPerson === option.value ? "selected" : ""
                            }`}
                          >
                            {option.label}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </>
            )}

            {isDashboardView && (
              <div className="dashboard-cards">
                <div className="card-items">
                  {cardItems.map((name, idx) => (
                    <div
                      className="dashboard-card"
                      key={idx}
                      onClick={() =>
                        navigate(`/dashboard/files/${encodeURIComponent(name)}`)
                      }
                    >
                      <h3>{name}</h3>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {isFolderListView && (
              <>
                <div className="files-header">
                  <h2>Files</h2>
                  <button
                    className="upload-btn"
                    onClick={() => setShowUpload(true)}
                  >
                    <i className="fas fa-upload">
                      <TbCloudUpload size="1.3rem" />
                    </i>{" "}
                    Upload
                  </button>
                  {showUpload && (
                    <UploadModal
                      onClose={() => setShowUpload(false)}
                      onSubmit={() => {
                        setShowUpload(false);
                      }}
                    />
                  )}
                </div>

                <div className="folder-grid">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="folder-card"
                      onClick={() =>
                        navigate(`/dashboard/files/Folder${i + 1}`)
                      }
                    >
                      <img
                        src={folder}
                        alt={`Folder ${i + 1}`}
                        className="folder-icon"
                      />
                      <p>Folder {i + 1}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Files */}
            {isFileView && (
              <Files
                cardName={decodeURIComponent(cardName)}
                goBack={() => navigate("/dashboard/files")}
              />
            )}

            {isTravelView && <Travel />}
            {isLeaveAppView && <LeaveApplication />}
            {islog && <Logs />}
            {location.pathname === "/dashboard/roles" && <RolesPage />}
            {location.pathname === "/dashboard/request" && (
              <RequestAccessPage />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
