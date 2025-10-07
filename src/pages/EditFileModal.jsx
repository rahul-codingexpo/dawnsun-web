import React, { useState, useEffect, useRef } from "react";
import "../styles/EditFileModal.css";

const EditFileModal = ({ file, onClose, onSave }) => {
  const modalRef = useRef(null);

  // Helper to format ISO date to YYYY-MM-DD for <input type="date">
  const formatForInput = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Initialize form state safely
  const [formData, setFormData] = useState({
    name: file.name || "",
    uploadedDate: formatForInput(file.uploadedDate),
    expiryDate: formatForInput(file.expiryDate),
  });

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle save
  // const handleSubmit = () => {
  //   const updatedData = {
  //     _id: file._id, // keep original ID
  //     name: formData.name,
  //     uploadedDate: formData.uploadedDate
  //       ? new Date(formData.uploadedDate).toISOString()
  //       : null,
  //     expiryDate: formData.expiryDate
  //       ? new Date(formData.expiryDate).toISOString()
  //       : null,
  //     isFolder: file.isFolder,
  //   };

  //   onSave(updatedData);
  //   onClose();
  // };
  const handleSubmit = () => {
    const updatedData = {
      _id: file._id, // keep original ID
      name: formData.name,
      uploadedDate: formData.uploadedDate
        ? new Date(formData.uploadedDate).toISOString()
        : null,
      expiryDate: formData.expiryDate
        ? new Date(formData.expiryDate).toISOString()
        : null,
      isFolder: file.isFolder,
      url: file.url, // ✅ send the current URL to backend
    };

    onSave(updatedData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="edit-modal" ref={modalRef}>
        <div className="modal-header">
          <h2>Edit</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        <hr />

        <div className="form-group">
          <label>File Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="File Name"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Uploaded Date *</label>
            <input
              type="date"
              name="uploadedDate"
              value={formData.uploadedDate}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Expiry Date *</label>
          <input
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
          />
        </div>

        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="save-btn" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditFileModal;
