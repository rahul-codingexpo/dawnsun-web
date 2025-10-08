import React, { useState, useEffect } from "react";
import "../styles/TravelApplication.css";

const TravelApplication = () => {
  const [travelData, setTravelData] = useState([]);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          // "http://localhost:5000/api/travel"
          "http://139.59.68.77:5000/api/travel"
        );
        const data = await res.json();
        setTravelData(data);
      } catch (err) {
        console.error("Error fetching travel applications:", err);
      }
    };
    fetchData();
  }, []);

  const filteredData = travelData.filter((item) => {
    const values = Object.values(item).join(" ").toLowerCase();
    return values.includes(searchText.toLowerCase());
  });

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".status-dropdown-wrapper")) {
        setOpenDropdownIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleStatusChange = async (index, newStatus) => {
    const id = travelData[index]._id;
    try {
      const res = await fetch(`http://localhost:5000/api/travel/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        const updated = await res.json();
        const updatedData = [...travelData];
        updatedData[index] = updated;
        setTravelData(updatedData);
      }
    } catch (err) {
      console.error("Error updating status:", err);
    } finally {
      setOpenDropdownIndex(null);
    }
  };

  // ✅ Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="travel-page">
      <div className="travel-header">
        <h2>Travel Application</h2>
        <div className="travel-actions">
          <button className="export-btn">Export to Excel</button>
          <div className="search-wrapper">
            <input
              type="text"
              className="search-input"
              placeholder="Search here..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button
              className="search-btn"
              onClick={() => setSearchText(searchText)}
            >
              Search
            </button>
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
              <tr key={item._id || idx}>
                <td>{item.clientName}</td>
                <td>
                  <span className="email-chip">{item.email}</span>
                </td>
                <td>{item.contact}</td>
                <td>{item.department}</td>
                <td>{item.designation}</td>
                <td>
                  {new Date(item.arrivalDate).toLocaleDateString("en-GB")}
                </td>
                <td>
                  {new Date(item.departureDate).toLocaleDateString("en-GB")}
                </td>
                <td>{item.preference}</td>
                <td>
                  <div className="status-dropdown-wrapper">
                    <button
                      className={`status-btn ${item.status
                        ?.toLowerCase()
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
                          onClick={() => handleStatusChange(idx, "Approve")}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleStatusChange(idx, "In Process")}
                        >
                          In Process
                        </button>
                        <button
                          onClick={() => handleStatusChange(idx, "Decline")}
                        >
                          Decline
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
        <div className="page-controls">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            ◀ Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next ▶
          </button>
        </div>
      </div>
    </div>
  );
};

export default TravelApplication;
