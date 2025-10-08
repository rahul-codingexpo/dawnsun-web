import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import "../styles/AssignMemberModal.css";

const AssignMemberModal = ({ onSelectMember, onClose }) => {
  const modalRef = useRef(null);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [newCompany, setNewCompany] = useState("");

  const token = localStorage.getItem("token");

  // Fetch companies from DB
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        // const res = await axios.get("http://localhost:5000/api/companies", {
        //   headers: { Authorization: `Bearer ${token}` },
        // });
        const res = await axios.get("http://139.59.68.77:5000/api/companies", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCompanies(res.data);
      } catch (err) {
        console.error("Error fetching companies:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, [token]);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // Create new company
  const handleCreateCompany = async () => {
    if (!newCompany.trim()) return;
    try {
      const res = await axios.post(
        "http://localhost:5000/api/companies",
        { name: newCompany },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCompanies([...companies, res.data]);
      setShowCreate(false);
      setNewCompany("");
    } catch (err) {
      console.error("Error creating company:", err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="assign-modal-box" ref={modalRef}>
        <h3>Select Company</h3>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {companies.map((company) => (
              <button
                key={company._id}
                className="member-button"
                onClick={() => onSelectMember(company._id)}
              >
                {company.name}
              </button>
            ))}

            {/* Create new company option */}
            {showCreate ? (
              <div className="create-company">
                <input
                  type="text"
                  placeholder="Enter company name"
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                />
                <button onClick={handleCreateCompany}>Save</button>
                <button onClick={() => setShowCreate(false)}>Cancel</button>
              </div>
            ) : (
              <button
                className="member-button create-btn"
                onClick={() => setShowCreate(true)}
              >
                ➕ Create New Company
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AssignMemberModal;
