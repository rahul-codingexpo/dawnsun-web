import React, { useState, useEffect } from "react";
import axios from "axios";
// import "../styles/Modal.css";

const ShareWithDepartmentModal = ({
  show,
  onClose,
  itemId,
  companyId,
  onShared,
}) => {
  const [departments, setDepartments] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (show) {
      fetchDepartments();
    }
  }, [show]);

  //   const fetchDepartments = async () => {
  //     try {
  //       const res = await axios.get(`/api/departments?companyId=${companyId}`);
  //       setDepartments(res.data || []);
  //     } catch (err) {
  //       console.error("Error fetching departments:", err);
  //     }
  //   };
  const fetchDepartments = async () => {
    try {
      if (!companyId) {
        console.error("Missing companyId");
        return;
      }

      const res = await axios.get(
        // `http://localhost:5000/api/items/departments?companyId=${companyId}`
        `http://139.59.68.77:5000/api/items/departments?companyId=${companyId}`
      );
      setDepartments(res.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const handleSelect = (dept) => {
    setSelected((prev) =>
      prev.includes(dept) ? prev.filter((d) => d !== dept) : [...prev, dept]
    );
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await axios.put(`/api/items/${itemId}/share-departments`, {
        departments: selected,
      });
      onShared();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error sharing with departments");
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Share with Departments</h3>
        <div className="dept-list">
          {departments.map((dept) => (
            <label key={dept}>
              <input
                type="checkbox"
                value={dept}
                checked={selected.includes(dept)}
                onChange={() => handleSelect(dept)}
              />
              {dept.charAt(0).toUpperCase() + dept.slice(1)}
            </label>
          ))}
        </div>
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSubmit} disabled={loading || !selected.length}>
            {loading ? "Sharing..." : "Share"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareWithDepartmentModal;
