import React, { useState, useEffect, useRef } from "react";
import "../styles/TravelApplication.css";
import { VscSettings } from "react-icons/vsc";
import DateRangeFilter from "./DateRangeFilter";

const initialData = [
  {
    name: "Christine Brooks",
    email: "christinebrooks@5.com",
    contact: "09876543212",
    department: "Sales",
    designation: "BD",
    arrivalDate: "2 June, 2025",
    departureDate: "3 June, 2025",
    preference: "Flight",
    status: "Decline",
  },
  {
    name: "Christine Brooks",
    email: "christinebrooks@5.com",
    contact: "09876543212",
    department: "Sales",
    designation: "BD",
    arrivalDate: "4 June, 2025",
    departureDate: "5 June, 2025",
    preference: "Flight",
    status: "Decline",
  },
  {
    name: "Christine Brooks",
    email: "christinebrooks@5.com",
    contact: "09876543212",
    department: "Sales",
    designation: "BD",
    arrivalDate: "6 June, 2025",
    departureDate: "8 June, 2025",
    preference: "Flight",
    status: "Decline",
  },
  {
    name: "Christine Brooks",
    email: "christinebrooks@5.com",
    contact: "09876543212",
    department: "Sales",
    designation: "BD",
    arrivalDate: "20 June, 2025",
    departureDate: "21 June, 2025",
    preference: "Flight",
    status: "Decline",
  },
  {
    name: "Christine Brooks",
    email: "christinebrooks@5.com",
    contact: "09876543212",
    department: "Sales",
    designation: "BD",
    arrivalDate: "28 June, 2025",
    departureDate: "29 June, 2025",
    preference: "Flight",
    status: "Decline",
  },
  {
    name: "Christine Brooks",
    email: "christinebrooks@5.com",
    contact: "09876543212",
    department: "Sales",
    designation: "BD",
    arrivalDate: "15 June, 2025",
    departureDate: "16 June, 2025",
    preference: "Flight",
    status: "Decline",
  },
  {
    name: "Christine Brooks",
    email: "christinebrooks@5.com",
    contact: "09876543212",
    department: "Sales",
    designation: "BD",
    arrivalDate: "18 June, 2025",
    departureDate: "19 June, 2025",
    preference: "Flight",
    status: "Decline",
  },
  {
    name: "Christine Brooks",
    email: "christinebrooks@5.com",
    contact: "09876543212",
    department: "Sales",
    designation: "BD",
    arrivalDate: "4 June, 2025",
    departureDate: "5 June, 2025",
    preference: "Flight",
    status: "Decline",
  },
];

const TravelApplication = () => {
  const [travelData, setTravelData] = useState(initialData);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [filterRange, setFilterRange] = useState({ start: "", end: "" });
  const filterRef = useRef();

  const filteredData = travelData.filter((item) => {
    if (!filterRange.start && !filterRange.end) return true;

    const arrival = new Date(item.arrivalDate);
    const start = filterRange.start ? new Date(filterRange.start) : null;
    const end = filterRange.end ? new Date(filterRange.end) : null;

    if (start && arrival < start) return false;
    if (end && arrival > end) return false;

    return true;
  });

  const visibleData = filteredData.slice(0, itemsPerPage);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".status-dropdown-wrapper")) {
        setOpenDropdownIndex(null);
      }
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setShowFilterPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleStatusChange = (index, newStatus) => {
    const updatedData = [...travelData];
    updatedData[index].status = newStatus;
    setTravelData(updatedData);
    setOpenDropdownIndex(null);
  };

  return (
    <div className="travel-page">
      <div className="travel-header">
        <h2>Travel Application</h2>
        <div className="travel-actions">
          <button className="export-btn">Export to Excel</button>
          <div className="filter-wrapper" ref={filterRef}>
            <button
              className="filter-btn"
              onClick={() => setShowFilterPopup(!showFilterPopup)}
            >
              <span>
                <VscSettings />
              </span>
              Filters
            </button>
            {showFilterPopup && (
              <DateRangeFilter
                initialRange={filterRange}
                onApply={(range) => {
                  setFilterRange(range);
                  setShowFilterPopup(false);
                }}
              />
            )}
          </div>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="travel-table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>EMAIL ID</th>
              <th>CONTACT NO.</th>
              <th>DEPARTMENT</th>
              <th>DESIGNATION</th>
              <th>ARRIVAL DATE</th>
              <th>DEPARTURE DATE</th>
              <th>PREFERENCE</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {visibleData.map((item, idx) => (
              <tr key={idx}>
                <td>{item.name}</td>
                <td>
                  <span className="email-chip">{item.email}</span>
                </td>
                <td>{item.contact}</td>
                <td>{item.department}</td>
                <td>{item.designation}</td>
                <td>{item.arrivalDate}</td>
                <td>{item.departureDate}</td>
                <td>{item.preference}</td>
                <td>
                  <div className="status-dropdown-wrapper">
                    <button
                      className={`status-btn ${item.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                      onClick={() =>
                        setOpenDropdownIndex(
                          openDropdownIndex === idx ? null : idx
                        )
                      }
                    >
                      {item.status} ▾
                    </button>
                    {openDropdownIndex === idx && (
                      <div className="status-options">
                        <button
                          onClick={() => handleStatusChange(idx, "Decline")}
                        >
                          Decline
                        </button>
                        <button
                          onClick={() => handleStatusChange(idx, "Approve")}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleStatusChange(idx, "In Process")}
                        >
                          In Process
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <span>Show</span>
        <select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
        >
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
        <span>per page</span>
      </div>
    </div>
  );
};

export default TravelApplication;
