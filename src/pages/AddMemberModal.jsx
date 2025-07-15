import React, { useState, useEffect, useRef } from "react";
import "../styles/AddMemberModal.css";

const AddMemberModal = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    department: "",
    designation: "",
    role: "",
    password: "",
  });

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
    onAdd(formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="add-member-modal" ref={modalRef}>
        <div className="modal-header">
          <h3>Add Member</h3>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label>
              Full Name <span>*</span>
            </label>
            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>
                Email <span>*</span>
              </label>
              <input name="email" placeholder="Email" onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>
                Mobile Number <span>*</span>
              </label>
              <input
                name="mobile"
                placeholder="Mobile Number"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>
                Department <span>*</span>
              </label>
              <select name="department" onChange={handleChange}>
                <option value="">Value</option>
                <option value="Sales">Sales</option>
                <option value="HR">HR</option>
                <option value="IT">IT</option>
              </select>
            </div>
            <div className="form-group">
              <label>
                Designation <span>*</span>
              </label>
              <select name="designation" onChange={handleChange}>
                <option value="">Value</option>
                <option value="BD">BD</option>
                <option value="Manager">Manager</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>
                Role Type <span>*</span>
              </label>
              <select name="role" onChange={handleChange}>
                <option value="">Value</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
            </div>
            <div className="form-group">
              <label>Set Password</label>
              <input
                name="password"
                placeholder="123***"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="add-btn" onClick={handleSubmit}>
            Add Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMemberModal;
