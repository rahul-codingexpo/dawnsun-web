import React, { useState, useEffect, useRef } from "react";
import "../styles/CreateFolderModal.css";

const CreateFolderModal = ({
  onClose,
  parentId = null,
  companies,
  addCompany,
}) => {
  const modalRef = useRef();
  const [folderName, setFolderName] = useState("");
  const [department, setDepartment] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [newCompany, setNewCompany] = useState("");

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let companyIdToAssign = assignedTo;

    // If creating new company
    if (assignedTo === "new" && newCompany.trim()) {
      const createdCompany = await addCompany(newCompany);
      // ✅ ensure addCompany returns { _id, name }
      companyIdToAssign = createdCompany._id;
    }

    if (!companyIdToAssign) {
      alert("Please select or create a company");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        // "http://localhost:5000/api/items/folder",
        "http://139.59.68.77:5000/api/items/folder",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: folderName,
            companyId: companyIdToAssign, // send ObjectId
            department: department.toLowerCase(),
            expiryDate: expiryDate || null,
            parentId: parentId || null,
          }),
        }
      );

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Failed to create folder");
      }

      const data = await response.json();
      console.log("✅ Folder created:", data);

      window.location.reload();
      onClose();
    } catch (error) {
      console.error("❌ Error creating folder:", error);
      alert("Error creating folder: " + error.message);
    }
  };

  return (
    <div className="folder-modal-overlay">
      <div className="folder-modal" ref={modalRef}>
        <div className="modal-header">
          <h2>Create Folder</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        <hr className="modal-divider" />

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              Folder Name <span>*</span>
            </label>
            <input
              type="text"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group" style={{ flex: 1 }}>
              <label>
                Department <span>*</span>
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
              >
                <option value="">Select Department</option>
                <option value="All">All</option>
                <option value="Sales">Sales</option>
                <option value="HR">HR</option>
                <option value="Management">Management</option>
                <option value="Development">Development</option>
                <option value="None">None</option>
              </select>
            </div>

            <div className="form-group" style={{ flex: 1 }}>
              <label>Expiry Date</label>
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Assign To</label>
            <select
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
            >
              <option key="default" value="">
                Select Company
              </option>
              {companies.map((c, idx) => {
                const companyId = c._id || c; // fallback if it's just a string
                const companyName = c.name || c; // fallback if it's just a string
                return (
                  <option key={companyId || `company-${idx}`} value={companyId}>
                    {companyName}
                  </option>
                );
              })}
              <option key="new" value="new">
                + Create New Company
              </option>
            </select>
          </div>

          {assignedTo === "new" && (
            <div className="form-group">
              <label>New Company Name</label>
              <input
                type="text"
                value={newCompany}
                onChange={(e) => setNewCompany(e.target.value)}
                required
              />
            </div>
          )}

          <div className="modal-footer">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="create-btn">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFolderModal;
