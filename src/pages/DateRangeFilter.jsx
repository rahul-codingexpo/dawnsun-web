// DateRangeFilter.jsx
import React, { useState, useEffect } from "react";
import "../styles/DateRangeFilter.css";

const DateRangeFilter = ({ onApply, initialRange }) => {
  const [localStart, setLocalStart] = useState("");
  const [localEnd, setLocalEnd] = useState("");

  useEffect(() => {
    if (initialRange) {
      setLocalStart(initialRange.start || "");
      setLocalEnd(initialRange.end || "");
    }
  }, [initialRange]);

  const handleApply = () => {
    onApply({ start: localStart, end: localEnd });
  };

  return (
    <div className="date-filter-popup">
      <h4 style={{ margin: "0px" }}>Date Range:</h4>
      <hr />
      <label>
        Arrival Date:
        <input
          type="date"
          value={localStart}
          onChange={(e) => setLocalStart(e.target.value)}
        />
      </label>
      <label>
        Departure Date:
        <input
          type="date"
          value={localEnd}
          onChange={(e) => setLocalEnd(e.target.value)}
        />
      </label>
      <button className="apply-btn" onClick={handleApply}>
        Apply
      </button>
    </div>
  );
};

export default DateRangeFilter;
