import React, { useRef, useEffect } from "react";
import "../styles/AssignMemberModal.css";

const members = [
  "Dawnsun Exib",
  "DKAEPL",
  "DMPL",
  "WR",
  "Fisher Tirech",
  "Dawnsun Tirech",
];

const AssignMemberModal = ({ onSelectMember, onClose }) => {
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

  return (
    <div className="modal-overlay">
      <div className="assign-modal-box" ref={modalRef}>
        {members.map((member, idx) => (
          <button
            key={idx}
            className="member-button"
            onClick={() => onSelectMember(member)}
          >
            {member}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AssignMemberModal;
