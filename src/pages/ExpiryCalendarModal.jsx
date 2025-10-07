// import React, { useState, useEffect, useRef } from "react";
// import "../styles/ExpiryCalendarModal.css";

// const ExpiryCalendarModal = ({ onBack, onSubmit }) => {
//   const [selectedDate, setSelectedDate] = useState("");
//   const modalRef = useRef(null);

//   // Close on outside click
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (modalRef.current && !modalRef.current.contains(e.target)) {
//         onBack();
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [onBack]);

//   const handleSubmit = () => {
//     if (selectedDate) {
//       const formattedDate = new Date(selectedDate).toLocaleDateString("en-GB", {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//       });
//       onSubmit(formattedDate);
//     }
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="calendar-modal-box" ref={modalRef}>
//         <div className="calendar-header">
//           <h3>📅 Set Expiry Date</h3>
//           <button className="close-btn" onClick={onBack}>
//             ×
//           </button>
//         </div>

//         <div className="calendar-body">
//           <input
//             type="date"
//             className="native-calendar"
//             value={selectedDate}
//             onChange={(e) => setSelectedDate(e.target.value)}
//           />
//         </div>

//         <div className="calendar-actions">
//           <button className="calendar-back" onClick={onBack}>
//             Cancel
//           </button>
//           <button
//             className="calendar-submit"
//             onClick={handleSubmit}
//             disabled={!selectedDate}
//           >
//             Set Date
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ExpiryCalendarModal;

/*updated code*/

import React, { useState, useEffect, useRef } from "react";
import "../styles/ExpiryCalendarModal.css";

const ExpiryCalendarModal = ({ onBack, onSubmit }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const modalRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onBack();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onBack]);

  const handleSubmit = () => {
    if (selectedDate) {
      const formattedDate = new Date(selectedDate).toISOString(); // store ISO for backend
      onSubmit(formattedDate);
    }
  };

  const handleLifetime = () => {
    onSubmit(null); // null expiry means lifetime access
  };

  return (
    <div className="modal-overlay">
      <div className="calendar-modal-box" ref={modalRef}>
        <div className="calendar-header">
          <h3>📅 Set Expiry Date</h3>
          <button className="close-btn" onClick={onBack}>
            ×
          </button>
        </div>

        <div className="calendar-body">
          <input
            type="date"
            className="native-calendar"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        <div className="calendar-actions">
          <button className="calendar-back" onClick={onBack}>
            Cancel
          </button>
          <button
            className="calendar-submit"
            onClick={handleSubmit}
            disabled={!selectedDate}
          >
            Set Date
          </button>
          <button className="calendar-lifetime" onClick={handleLifetime}>
            Without Expiry (Lifetime)
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpiryCalendarModal;
