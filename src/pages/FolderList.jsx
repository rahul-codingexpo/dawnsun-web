import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

const FolderList = () => {
  const navigate = useNavigate();

  return (
    <div className="folder-grid">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="folder-card"
          onClick={() => navigate(`/dashboard/files/Folder${i + 1}`)}
        >
          <img
            src="https://icons.iconarchive.com/icons/treetog/junior/256/folder-icon.png"
            alt={`Folder ${i + 1}`}
            className="folder-icon"
          />
          <p>Folder {i + 1}</p>
        </div>
      ))}
    </div>
  );
};

export default FolderList;
