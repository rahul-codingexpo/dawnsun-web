// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/Dashboard.css";

// const FolderList = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="folder-grid">
//       {Array.from({ length: 8 }).map((_, i) => (
//         <div
//           key={i}
//           className="folder-card"
//           onClick={() => navigate(`/dashboard/files/Folder${i + 1}`)}
//         >
//           <img
//             src="https://icons.iconarchive.com/icons/treetog/junior/256/folder-icon.png"
//             alt={`Folder ${i + 1}`}
//             className="folder-icon"
//           />
//           <p>Folder {i + 1}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default FolderList;

/*updated code*/
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/Dashboard.css";
import FolderPng from "../assets/folder.png";

const FolderList = () => {
  const navigate = useNavigate();
  const { companyId, folderId } = useParams(); // URL param → current folder
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch(
          `http://localhost:5000/api/items?parentId=${folderId || "null"}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch items");
        const data = await res.json();
        setItems(data);
      } catch (err) {
        console.error("Error fetching items", err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [folderId]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="folder-grid">
      {items.length === 0 ? (
        <p>No folders or files yet</p>
      ) : (
        items
          .filter((item) => item.type === "folder") // ✅ only folders
          .map((item) => (
            <div
              key={item._id}
              className="folder-card"
              onDoubleClick={
                () => navigate(`/dashboard/files/${companyId}/${item._id}`) // open nested folder
              }
            >
              <img src={FolderPng} alt={item.name} className="folder-icon" />
              <p>
                {item.name.length > 20
                  ? item.name.slice(0, 20) + "...."
                  : item.name}
              </p>
            </div>
          ))
      )}
    </div>
  );
};

export default FolderList;
