import React, { useState, useEffect, useRef } from "react";
import "../styles/EditRequestModal.css";

const EditRequestModal = ({ request, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({ ...request });
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onUpdate(formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box" ref={modalRef}>
        <h3>Edit Request</h3>
        <label>Name</label>
        <input name="name" value={formData.name} onChange={handleChange} />
        <label>Department</label>
        <input
          name="department"
          value={formData.department}
          onChange={handleChange}
        />
        <label>Designation</label>
        <input
          name="designation"
          value={formData.designation}
          onChange={handleChange}
        />
        <label>Folder Name</label>
        <input name="folder" value={formData.folder} onChange={handleChange} />
        <label>File Name</label>
        <input name="file" value={formData.file} onChange={handleChange} />
        <label>Status</label>
        <select
          name="actionStatus"
          value={formData.actionStatus}
          onChange={handleChange}
        >
          <option value="Approve">Approve</option>
          <option value="In Process">In Process</option>
          <option value="Decline">Decline</option>
        </select>

        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="update-btn" onClick={handleSubmit}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditRequestModal;
