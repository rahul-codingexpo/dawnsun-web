import React, { useState, useEffect } from "react";
import "../styles/RolesPage.css";
import AddMemberModal from "./AddMemberModal";
import EditMemberModal from "./EditMemberModal";
import axios from "axios";

const RolesPage = () => {
  const [data, setData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [openStatusIndex, setOpenStatusIndex] = useState(null);
  const [openActionIndex, setOpenActionIndex] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // 🔹 Fetch all members
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          // "http://localhost:5000/api/auth/members",
          "http://139.59.68.77:5000/api/auth/members",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setData(res.data);
      } catch (err) {
        console.error("Error fetching members:", err);
      }
    };
    fetchMembers();
  }, []);

  const updateStatus = async (index, status) => {
    try {
      const member = data[index];
      const token = localStorage.getItem("token");

      await axios.put(
        // `http://localhost:5000/api/auth/members/${member._id}/status`,
        `http://139.59.68.77:5000/api/auth/members/${member._id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updated = [...data];
      updated[index].status = status;
      setData(updated);
      setOpenStatusIndex(null);
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const deleteMember = async (id, idx) => {
    try {
      const token = localStorage.getItem("token");
      // await axios.delete(`http://localhost:5000/api/auth/members/${id}`,
      await axios.delete(`http://139.59.68.77:5000/api/auth/members/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updated = [...data];
      updated.splice(idx, 1);
      setData(updated);
    } catch (err) {
      console.error("Error deleting member:", err);
    }
  };
  // ✅ Filter by search text
  const filteredData = data.filter((item) =>
    Object.values(item)
      .join(" ")
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  // ✅ Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="roles-page">
      <div className="roles-header">
        <h2>Roles</h2>
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
        <button
          className="add-member-btn"
          onClick={() => setShowAddModal(true)}
        >
          + Add Member
        </button>
      </div>

      <div className="roles-table-wrapper">
        <table className="roles-table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>MOBILE NO.</th>
              <th>DEPARTMENT</th>
              <th>DESIGNATION</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {visibleData.map((item, idx) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>
                  <span className="email-chip">{item.email}</span>
                </td>
                <td>{item.mobile}</td>
                <td>{item.department}</td>
                <td>{item.designation}</td>
                <td>
                  <div className="dropdown-wrapper">
                    <button
                      className={`status-btn ${
                        item.status?.toLowerCase() || "inactive"
                      }`}
                      onClick={() =>
                        setOpenStatusIndex(openStatusIndex === idx ? null : idx)
                      }
                    >
                      {item.status || "inactive"}
                    </button>
                    {openStatusIndex === idx && (
                      <div className="dropdown-options">
                        <button onClick={() => updateStatus(idx, "Active")}>
                          Active
                        </button>
                        <button onClick={() => updateStatus(idx, "Inactive")}>
                          Inactive
                        </button>
                      </div>
                    )}
                  </div>
                </td>
                <td>
                  <div className="dropdown-wrapper">
                    <button
                      className="edit-btn"
                      onClick={() =>
                        setOpenActionIndex(openActionIndex === idx ? null : idx)
                      }
                    >
                      Edit ▾
                    </button>

                    {openActionIndex === idx && (
                      <div className="dropdown-options">
                        <button
                          onClick={() => {
                            setEditIndex(idx);
                            setEditModalVisible(true);
                            setOpenActionIndex(null);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            const confirmed = window.confirm(
                              "Are you sure to delete this member?"
                            );
                            if (confirmed) {
                              deleteMember(item._id, idx);
                            }
                            setOpenActionIndex(null);
                          }}
                        >
                          Remove
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

      {/* Edit Modal */}
      {editModalVisible && (
        <EditMemberModal
          member={data[editIndex]}
          onClose={() => setEditModalVisible(false)}
          onUpdate={(updatedMember) => {
            const updatedData = [...data];
            updatedData[editIndex] = updatedMember;
            setData(updatedData);
            setEditModalVisible(false);
          }}
        />
      )}

      {/* Add Modal */}
      {showAddModal && (
        <AddMemberModal
          onClose={() => setShowAddModal(false)}
          onAdd={(member) => setData((prev) => [member, ...prev])}
        />
      )}

      {/* Pagination */}
      <div className="pagination">
        <span>Show</span>
        <select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="50">50</option>
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

export default RolesPage;
