import React, { useState, useEffect, useRef } from "react";
import "../styles/EditFileModal.css";

const EditFileModal = ({ file, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...file });

  const modalRef = useRef(null);

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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const formatDate = (dateStr) => {
      return new Date(dateStr).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    };

    const updatedData = {
      ...formData,
      uploadedDate: formatDate(formData.uploadedDate),
      expiryDate: formatDate(formData.expiryDate),
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
            <label>Type *</label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              placeholder="Type"
            />
          </div>
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
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditFileModal;
