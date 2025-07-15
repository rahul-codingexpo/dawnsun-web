import React, { useEffect, useRef } from "react";
import "../styles/RestrictConfirmationModal.css";

const RestrictConfirmationModal = ({ onSubmit, onIgnore }) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onIgnore();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [onIgnore]);

  return (
    <div className="modal-overlay">
      <div className="restrict-confirm-box" ref={modalRef}>
        <p className="restrict-msg">
          This Document is successfully uploaded, but <b>restricted</b>.
        </p>
        <div className="btn-group">
          <button className="ignore-btn" onClick={onIgnore}>
            Ignore
          </button>
          <button className="submit-btn" onClick={onSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestrictConfirmationModal;
