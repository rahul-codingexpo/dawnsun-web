import React, { useState, useEffect } from "react";
import "../styles/RequestAccess.css";
import EditRequestModal from "./EditRequestModal";

const dummyData = [
  {
    name: "Christine Brooks",
    department: "Sales",
    designation: "Sales",
    actionStatus: "Decline",
    folder: "Employee-pdf",
    file: "Work",
  },
  {
    name: "Christine Brooks",
    department: "Sales",
    designation: "Sales",
    actionStatus: "Decline",
    folder: "Employee-pdf",
    file: "Work",
  },
  {
    name: "Christine Brooks",
    department: "Sales",
    designation: "Sales",
    actionStatus: "In Process",
    folder: "Employee-pdf",
    file: "Work",
  },
];

const RequestAccessPage = () => {
  const [data, setData] = useState(dummyData);
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingData, setEditingData] = useState(null);
  const [searchText, setSearchText] = useState("");

  const filteredData = data.filter((item) =>
    Object.values(item)
      .join(" ")
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  const visibleData = filteredData.slice(0, itemsPerPage);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest(".dropdown-wrapper")) {
        setOpenDropdownIndex(null);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const updateStatus = (index, status) => {
    const updated = [...data];
    updated[index].actionStatus = status;
    setData(updated);
    setOpenDropdownIndex(null);
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

      <div className="table-wrapper">
        <table className="access-table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>DEPARTMENT</th>
              <th>DESIGNATION</th>
              <th>ACTIONS</th>
              <th>FOLDER NAME</th>
              <th>FILE NAME</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {visibleData.map((item, idx) => (
              <tr key={idx}>
                <td>{item.name}</td>
                <td>{item.department}</td>
                <td>{item.designation}</td>
                <td>
                  <div className="dropdown-wrapper">
                    <button
                      className={`status-btn ${item.actionStatus
                        .toLowerCase()
                        .replace(" ", "-")}`}
                      onClick={() =>
                        setOpenDropdownIndex(
                          openDropdownIndex === idx ? null : idx
                        )
                      }
                    >
                      {item.actionStatus} ▾
                    </button>
                    {openDropdownIndex === idx && (
                      <div className="status-options">
                        <button onClick={() => updateStatus(idx, "Approve")}>
                          Approve
                        </button>
                        <button onClick={() => updateStatus(idx, "In Process")}>
                          In Process
                        </button>
                        <button onClick={() => updateStatus(idx, "Decline")}>
                          Decline
                        </button>
                      </div>
                    )}
                  </div>
                </td>
                <td>{item.folder}</td>
                <td>{item.file}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => {
                      setEditingIndex(idx);
                      setEditingData(data[idx]);
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
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

      <div className="pagination">
        <span>Show</span>
        <select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <span>per page</span>
      </div>
    </div>
  );
};

export default RequestAccessPage;
