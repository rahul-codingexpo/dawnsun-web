import React, { useState, useRef, useEffect } from "react";
import "../styles/Files.css";
import { TbCloudUpload } from "react-icons/tb";
import UploadModal from "./Uploadmodels";
import EditFileModal from "./EditFileModal";
import AssignMemberModal from "./AssignMemberModal";
import ExpiryCalendarModal from "./ExpiryCalendarModal";
const Files = ({ cardName }) => {
  const [showUpload, setShowUpload] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assignIndex, setAssignIndex] = useState(null);
  const [showExpiryCalendar, setShowExpiryCalendar] = useState(false);
  const [assignedMember, setAssignedMember] = useState(null);

  const [showExpiryModal, setShowExpiryModal] = useState(false);
  const [selectedFileIndex, setSelectedFileIndex] = useState(null);

  const handleSetExpiry = (newDate) => {
    const formattedDate = new Date(newDate).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    setFileData((prev) => {
      const updated = [...prev];
      updated[selectedFileIndex].expiryDate = formattedDate;
      return updated;
    });
    setShowExpiryModal(false);
    setSelectedFileIndex(null);
  };

  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpenIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const [fileData, setFileData] = useState([
    {
      name: "Employee-Handbook-2024.pdf",
      type: "PDF",
      uploadedDate: "31 Jul 2025",
      expiryDate: "31 Jul 2026",
    },
    {
      name: "Quarterly-Sales-Report-Q1.xlsx",
      type: "PDF",
      uploadedDate: "31 Jul 2025",
      expiryDate: "31 Jul 2026",
    },
    {
      name: "Training-Schedule.docx",
      type: "PDF",
      uploadedDate: "31 Jul 2025",
      expiryDate: "31 Jul 2026",
    },
    {
      name: "Company-Policy-Guidelines.pdf",
      type: "PDF",
      uploadedDate: "31 Jul 2025",
      expiryDate: "31 Jul 2026",
    },
    {
      name: "Another-File.docx",
      type: "DOCX",
      uploadedDate: "31 Jul 2025",
      expiryDate: "31 Jul 2026",
    },
    {
      name: "Extra-File.xlsx",
      type: "XLSX",
      uploadedDate: "31 Jul 2025",
      expiryDate: "31 Jul 2026",
    },
    {
      name: "Extra-File.xlsx",
      type: "XLSX",
      uploadedDate: "31 Jul 2025",
      expiryDate: "31 Jul 2026",
    },
  ]);
  const [dropdownOpenIndex, setDropdownOpenIndex] = useState(null);
  const handleAddFile = (newFile) => {
    setFileData((prev) => [newFile, ...prev]);
  };

  const handleChangeItemsPerPage = (e) => {
    setItemsPerPage(parseInt(e.target.value));
  };
  const handleEdit = (index) => {
    setEditIndex(index);
    setShowEditModal(true);
    setDropdownOpenIndex(null);
  };

  const handleDelete = (index) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this file?"
    );
    if (confirmed) {
      setFileData((prev) => prev.filter((_, i) => i !== index));
    }
    setDropdownOpenIndex(null);
  };

  const handleAssign = (index) => {
    setAssignIndex(index);
    setShowAssignModal(true);
    setDropdownOpenIndex(null);
  };

  const paginatedData = fileData.slice(0, itemsPerPage);

  return (
    <div className="files-page">
      <div className="files-header">
        <h2>Files</h2>
        <button className="upload-btn" onClick={() => setShowUpload(true)}>
          <i className="fas fa-upload">
            <TbCloudUpload size="1.3rem" />
          </i>{" "}
          Upload
        </button>
        {showUpload && (
          <UploadModal
            onClose={() => setShowUpload(false)}
            onSubmit={() => setShowUpload(false)}
            onAddFile={handleAddFile}
          />
        )}
      </div>
      <div className="table-wrapper">
        <table className="files-table">
          <thead>
            <tr>
              <th>FILE NAME</th>
              <th>TYPE</th>
              <th>UPLOADED DATE</th>
              <th>EXPIRY DATE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((file, idx) => (
              <tr key={idx}>
                <td>{file.name}</td>
                <td>{file.type}</td>
                <td>{file.uploadedDate}</td>
                <td>{file.expiryDate}</td>
                <td style={{ position: "relative" }}>
                  <button
                    className="edit-btn"
                    onClick={() =>
                      setDropdownOpenIndex(
                        dropdownOpenIndex === idx ? null : idx
                      )
                    }
                  >
                    Edit
                  </button>

                  {dropdownOpenIndex === idx && (
                    <div className="action-dropdown" ref={dropdownRef}>
                      <button onClick={() => handleEdit(idx)}>Edit</button>
                      <button onClick={() => handleDelete(idx)}>Delete</button>
                      <button onClick={() => handleAssign(idx)}>
                        Assign to Member
                      </button>
                      <button
                        onClick={() => {
                          setSelectedFileIndex(idx);
                          setShowExpiryModal(true);
                          setDropdownOpenIndex(null);
                        }}
                      >
                        Set Expiry Date
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showEditModal && (
        <EditFileModal
          file={fileData[editIndex]}
          onClose={() => setShowEditModal(false)}
          onSave={(updatedFile) => {
            const updated = [...fileData];
            updated[editIndex] = updatedFile;
            setFileData(updated);
          }}
        />
      )}

      {showAssignModal && (
        <AssignMemberModal
          onClose={() => setShowAssignModal(false)}
          onSelectMember={(member) => {
            setAssignedMember(member);
            setShowAssignModal(false);
            setShowExpiryCalendar(true);
          }}
        />
      )}

      {showExpiryCalendar && (
        <ExpiryCalendarModal
          onBack={() => setShowExpiryCalendar(false)}
          onSubmit={(newDate) => {
            const updatedFiles = [...fileData];
            updatedFiles[assignIndex].expiryDate = newDate;
            setFileData(updatedFiles);
            setShowExpiryCalendar(false);
          }}
        />
      )}

      {showExpiryModal && (
        <ExpiryCalendarModal
          onBack={() => setShowExpiryModal(false)}
          onSubmit={handleSetExpiry}
        />
      )}

      <div className="pagination-footer">
        <span>Show</span>
        <select
          value={itemsPerPage}
          onChange={handleChangeItemsPerPage}
          style={{ "border-radius": "5px" }}
        >
          <option value="1">1</option>
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
        <span>per page</span>
      </div>
    </div>
  );
};

export default Files;
