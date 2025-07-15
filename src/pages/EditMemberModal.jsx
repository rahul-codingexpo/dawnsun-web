import React, { useState, useEffect, useRef } from "react";
import "../styles/EditMemberModal.css";

const EditMemberModal = ({ member, onClose, onUpdate }) => {
  const [formData, setFormData] = useState(member);
  const modalRef = useRef(null);

  useEffect(() => {
    setFormData(member);
  }, [member]);

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
        <h3>Edit Member</h3>
        <label>Name</label>
        <input name="name" value={formData.name} onChange={handleChange} />
        <label>Email</label>
        <input name="email" value={formData.email} onChange={handleChange} />
        <label>Mobile</label>
        <input name="mobile" value={formData.mobile} onChange={handleChange} />
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
        <button onClick={onClose}>Cancel</button>
        <button onClick={handleSubmit}>Update</button>
      </div>
    </div>
  );
};

export default EditMemberModal;
