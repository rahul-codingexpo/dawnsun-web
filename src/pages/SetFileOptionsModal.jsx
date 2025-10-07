import React, { useState } from "react";
import CalendarModal from "./ExpiryCalendarModal";
import AssignMemberModal from "./AssignMemberModal";
import RestrictConfirmationModal from "./RestrictConfirmationModal";
import "../styles/SetFileOptionModal.css";

const departments = ["Sales", "HR", "Management", "Development", "All", "None"];

const SetFileOptionsModal = ({
  selectedCompany,
  setSelectedCompany,
  onBack,
  onSubmitWithOptions,
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [expiryDate, setExpiryDate] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [showAssignPopup, setShowAssignPopup] = useState(false);
  const [showRestrictConfirm, setShowRestrictConfirm] = useState(false);
  const [lifetime, setLifetime] = useState(false);

  const [selectedDept, setSelectedDept] = useState("none");

  const handleFinalSubmit = (date) => {
    setExpiryDate(date);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onSubmitWithOptions(date, lifetime, selectedDept); // 🔹 pass dept to parent
    }, 1000);
  };

  return (
    <div className="modal-overlay">
      <div className="setFile-modal">
        {!submitted ? (
          <>
            {!showAssignPopup && !showCalendar && !showRestrictConfirm && (
              <>
                {/* Department Dropdown */}
                {/* <label className="dept-label">Select Department Access:</label> */}
                <select
                  className="dept-dropdown"
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                >
                  <option value="none" disabled>
                    Select Department
                  </option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept.toLowerCase()}>
                      {dept}
                    </option>
                  ))}
                </select>

                <button
                  className="option-btn"
                  onClick={() => setShowAssignPopup(true)}
                >
                  Assign to
                </button>
                {/* <button
                  className="option-btn"
                  onClick={() => setShowCalendar(true)}
                >
                  Set Expiry Date
                </button> */}

                {/* <button
                  className="option-btn"
                  onClick={() => {
                    setLifetime(true);
                    handleFinalSubmit(null);
                  }}
                >
                  Set without Expiry
                </button> */}

                <button
                  className="option-btn"
                  onClick={() => setShowRestrictConfirm(true)}
                >
                  Restrict
                </button>
                <button className="back-red" onClick={onBack}>
                  Back
                </button>
              </>
            )}

            {showAssignPopup && (
              <AssignMemberModal
                onSelectMember={(companyId) => {
                  setSelectedCompany(companyId);
                  setShowAssignPopup(false);
                  setShowCalendar(true); // open expiry calendar after selecting member
                }}
                onClose={() => setShowAssignPopup(false)}
              />
            )}

            {showCalendar && (
              <CalendarModal
                onBack={() => setShowCalendar(false)}
                onSubmit={(date) => handleFinalSubmit(date)}
              />
            )}
          </>
        ) : (
          <div className="success-popup">
            <div className="check-circle">✔</div>
            <h3>Submitted Successfully</h3>
            <p>Your files have been uploaded</p>
          </div>
        )}

        {showRestrictConfirm && (
          <RestrictConfirmationModal
            onSubmit={() => {
              setShowRestrictConfirm(false);
              handleFinalSubmit(expiryDate);
            }}
            onIgnore={() => setShowRestrictConfirm(false)}
          />
        )}
      </div>
    </div>
  );
};

export default SetFileOptionsModal;
