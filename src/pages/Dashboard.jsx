import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Files from "./files";
import "../styles/Dashboard.css";
import Travel from "./TravelApplication";
import LeaveApplication from "./LeaveApplication";
import Logs from "./LogsPage";
import RolesPage from "./RolesPages";
import UploadModal from "./Uploadmodels";
import RequestAccessPage from "./RequestAccessPage";

const Dashboard = () => {
  const { companyId, folderId } = useParams();
  // const { folderName } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [showUpload, setShowUpload] = useState(false);
  const [companies, setCompanies] = useState([]);

  const [userRole, setUserRole] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // 🔍 global search state

  // ✅ Fetch logged-in user role from API or localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:5000/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserRole(data.role);
      })
      .catch((err) => console.error(err));
  }, []);

  // ✅ Fetch companies
  useEffect(() => {
    fetch("http://localhost:5000/api/companies")
      .then((res) => res.json())
      .then((data) => setCompanies(data))
      .catch((err) => console.error(err));
  }, []);

  // View conditions
  const isDashboardView = location.pathname === "/dashboard";
  // const isFileView =
  //   location.pathname.startsWith("/dashboard/files/") && companyId;
  const isCompanyFilesView =
    companyId && location.pathname.includes(`/dashboard/files/${companyId}`);
  const isAllFilesView = location.pathname === "/dashboard/files";
  const isTravelView = location.pathname === "/dashboard/travel";
  const isLeaveAppView = location.pathname === "/dashboard/leave-application";
  const islog = location.pathname === "/dashboard/logs";

  useEffect(() => {
    setSearchTerm("");
  }, [companyId, folderId]);

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <Header onSearch={setSearchTerm} />
        <main className="dashboard-main">
          <div className="dashboard-container">
            {/* Dashboard Home */}
            {isDashboardView && (
              <>
                <div className="dashboard-heading">
                  <h1 className="dashboard-title">Dashboard</h1>
                </div>
                <div className="dashboard-cards">
                  <div className="card-items">
                    {companies.map((company) => (
                      <div
                        className="dashboard-card"
                        key={company._id}
                        onClick={() =>
                          navigate(`/dashboard/files/${company._id}`)
                        }
                      >
                        <h3>{company.name}</h3>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
            {/* Files View */}
            {isCompanyFilesView && (
              <div className="files-header">
                <Files
                  companyId={companyId}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                />{" "}
                {/* Fetch only selected company files */}
                {showUpload && (
                  <UploadModal
                    companyId={companyId}
                    onClose={() => setShowUpload(false)}
                    onSubmit={() => setShowUpload(false)}
                  />
                )}
              </div>
            )}

            {isAllFilesView && (
              <div className="files-header">
                {/* <h2>All Files</h2>
                {userRole === "Admin" && (
                  <button
                    className="upload-btn"
                    onClick={() => setShowUpload(true)}
                  >
                    <TbCloudUpload size="1.3rem" /> Upload
                  </button>
                )} */}
                <Files searchTerm={searchTerm} setSearchTerm={setSearchTerm} />{" "}
                {/* Fetch all files without company filter */}
              </div>
            )}

            {/* Other Pages */}
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
