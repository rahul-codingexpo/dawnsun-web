import React, { useRef, useEffect } from "react";
import "../styles/DeleteConfirmModal.css";

const DeleteConfirmModal = ({ onClose, onConfirm }) => {
  const modalRef = useRef(null);

  // Close on outside click
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

  return (
    <div className="modal-overlay">
      <div className="delete-modal" ref={modalRef}>
        <h3>Do you want to delete?</h3>
        <div className="modal-actions">
          <button className="yes-btn" onClick={onConfirm}>
            Yes
          </button>
          <button className="no-btn" onClick={onClose}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
