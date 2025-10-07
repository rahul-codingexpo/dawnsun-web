/*updated code*/

import React, { useState, useEffect } from "react";
import "../styles/RequestAccess.css";
import EditRequestModal from "./EditRequestModal";

const RequestAccessPage = () => {
  const [data, setData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingData, setEditingData] = useState(null);
  const [searchText, setSearchText] = useState("");
  const token = localStorage.getItem("token");

  // ✅ Fetch access requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/access-request", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await res.json();
        const sorted = result.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setData(sorted);
      } catch (err) {
        console.error("Error fetching requests:", err);
      }
    };
    fetchRequests();
  }, [token]);

  const updateStatus = async (id, status, index) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/access-request/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      if (res.ok) {
        const updated = [...data];
        updated[index].status = status;
        setData(updated);
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
    setOpenDropdownIndex(null);
  };

  // ✅ Filter by search text
  const filteredData = data.filter((item) => {
    const search = searchText.toLowerCase();
    return (
      item.user?.name?.toLowerCase().includes(search) ||
      item.user?.email?.toLowerCase().includes(search) ||
      item.user?.department?.toLowerCase().includes(search) ||
      item.itemType?.toLowerCase().includes(search) ||
      item.item?.name?.toLowerCase().includes(search) ||
      item.status?.toLowerCase().includes(search)
    );
  });

  // ✅ Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest(".dropdown-wrapper")) {
        setOpenDropdownIndex(null);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const trimName = (name) => {
    if (!name) return "";
    return name.length > 20 ? name.substring(0, 15) + "...." : name;
  };

  return (
    <div className="request-access-page">
      <div className="request-header">
        <h2>Request Access</h2>
        <div className="search-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Search here..."
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setCurrentPage(1); // reset to first page after search
            }}
          />
          <button className="search-btn">Search</button>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="access-table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>Department</th>
              <th>TYPE</th>
              <th>FOLDER / FILE</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {visibleData.map((item, idx) => (
              <tr key={item._id}>
                <td>{item.user?.name}</td>
                <td>{item.user?.email}</td>
                <td>{item.user?.department}</td>
                <td>{item.itemType} </td>
                <td>{trimName(item.item?.name) || "N/A"}</td>
                <td>
                  <div className="dropdown-wrapper">
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
                          onClick={() =>
                            updateStatus(item._id, "approved", idx)
                          }
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => updateStatus(item._id, "pending", idx)}
                        >
                          pending
                        </button>
                        <button
                          onClick={() => updateStatus(item._id, "denied", idx)}
                        >
                          Denied
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {visibleData.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editingData && (
        <EditRequestModal
          request={editingData}
          onClose={() => setEditingData(null)}
          onUpdate={(updatedItem) => {
            const newData = [...data];
            newData[editingIndex] = updatedItem;
            setData(newData);
          }}
        />
      )}

      {/* ✅ Pagination Controls */}
      <div className="pagination">
        <span>Show</span>
        <select
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1); // reset when items per page changes
          }}
        >
          <option value="2">2</option>
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

export default RequestAccessPage;
