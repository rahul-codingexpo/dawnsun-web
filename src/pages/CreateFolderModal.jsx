import React, { useEffect, useRef } from "react";
import "../styles/CreateFolderModal.css";

const CreateFolderModal = ({ onClose, onCreate }) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onCreate();
    onClose();
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
            <input type="text" placeholder="Enter Folder Name" required />
          </div>

          <div className="form-row">
            <div className="form-group" style={{ flex: 1 }}>
              <label>
                Department <span>*</span>
              </label>
              <select required>
                <option value="">Select Department</option>
                <option value="HR">Sales</option>
                <option value="IT">HR</option>
                <option value="IT">Management</option>
                <option value="IT">Development</option>
              </select>
            </div>

            <div className="form-group" style={{ flex: 1 }}>
              <label>
                Expiry Date <span>*</span>
              </label>
              <input type="date" required />
            </div>
          </div>

          <div className="form-group">
            <label>Assign To</label>
            <select>
              <option value="">Select Name</option>
              <option value="John">Downsun Exib</option>
              <option value="Sara">DKAEPL</option>
              <option value="Sara">DMPL</option>
              <option value="Sara">WR</option>
              <option value="Sara">Fisher Tirech</option>
              <option value="Sara">Dawnsun Tirech</option>
            </select>
          </div>

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
