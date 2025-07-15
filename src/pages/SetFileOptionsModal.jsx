import React, { useState } from "react";
import CalendarModal from "./ExpiryCalendarModal";
import "../styles/SetFileOptionModal.css";
import AssignMemberModal from "./AssignMemberModal";
import RestrictConfirmationModal from "./RestrictConfirmationModal";

const SetFileOptionsModal = ({ onBack, onSubmitWithOptions }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [expiryDate, setExpiryDate] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showAssignPopup, setShowAssignPopup] = useState(false);
  const [showRestrictConfirm, setShowRestrictConfirm] = useState(false);

  const handleSubmit = (date) => {
    setExpiryDate(date);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onSubmitWithOptions(date);
    }, 4000);
  };

  return (
    <div className="modal-overlay">
      <div className="upload-modal">
        {!submitted ? (
          <>
            {!showCalendar ? (
              <>
                <button
                  className="option-btn"
                  onClick={() => setShowCalendar(true)}
                >
                  Set Expiry
                </button>
                <button
                  className="option-btn"
                  onClick={() => setShowRestrictConfirm(true)}
                >
                  Restrict
                </button>
                <button
                  className="option-btn"
                  onClick={() => setShowAssignPopup(true)}
                >
                  Assign to
                </button>
                <button className="back-red" onClick={onBack}>
                  Back
                </button>
              </>
            ) : (
              <CalendarModal
                onBack={() => setShowCalendar(false)}
                onDateSelect={(date) => setExpiryDate(date)}
                onSubmit={handleSubmit}
              />
            )}
          </>
        ) : (
          <div className="success-popup">
            <div className="check-circle">✔</div>
            <h3>Submit Successfully</h3>
            <p>Your submission has been sent</p>
          </div>
        )}
        {showAssignPopup && (
          <AssignMemberModal
            onBack={() => setShowAssignPopup(false)}
            onSelectMember={(member) => {
              setShowAssignPopup(member); // Save selected member
              setShowAssignPopup(false);
              setShowCalendar(true);
            }}
            onClose={() => setShowAssignPopup(false)}
          />
        )}

        {showRestrictConfirm && (
          <RestrictConfirmationModal
            // onSubmit={{ handleSubmit }}
            onSubmit={() => {
              setShowRestrictConfirm(false);
              setSubmitted(true);
              handleSubmit();
              setTimeout(() => {
                setSubmitted(false);
                onBack();
              }, 4000);
            }}
            onIgnore={() => setShowRestrictConfirm(false)}
          />
        )}
      </div>
    </div>
  );
};

export default SetFileOptionsModal;
