import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UploadModal from "./Uploadmodels";
import CreateFolderModal from "./CreateFolderModal";
import "../styles/Files.css";
import FolderIcon from "../assets/folder.png";
import FileIcon from "../assets/file.svg";
import FilePreviewModal from "./FilePreviewmodel";
import EditFileModal from "./EditFileModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import AssignMemberModal from "./AssignMemberModal";
import ImageIcon from "../assets/nothing.png";
import VideoIcon from "../assets/viddeo_play.png";
import AudioIcon from "../assets/music-icon.png";
import PdfIcon from "../assets/pdf-icon.png";
import Sheet from "../assets/sheets.png";
import Word from "../assets/word.png";
import ShareWithDepartmentModal from "../components/ShareWithDepartmentModal";
const Files = ({ searchTerm, setSearchTerm }) => {
  const { companyId, folderId } = useParams();
  const [previewFile, setPreviewFile] = useState(null);
  const [editFile, setEditFile] = useState(null);
  const [deleteFile, setDeleteFile] = useState(null);
  const [items, setItems] = useState([]);
  const [currentFolder, setCurrentFolder] = useState(folderId || null);
  const [history, setHistory] = useState([]);
  const [showUpload, setShowUpload] = useState(false);
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [currentFolderName, setCurrentFolderName] = useState("");
  const [assignFile, setAssignFile] = useState(null);

  const [shareDeptModal, setShareDeptModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const openShareDeptModal = (id) => {
    setSelectedItemId(id);
    setShareDeptModal(true);
  };

  const token = localStorage.getItem("token");

  const fetchItems = async (parentId = null) => {
    try {
      const url = new URL("http://localhost:5000/api/items");

      // If companyId exists, fetch company-specific files
      if (companyId) url.searchParams.set("companyId", companyId);

      // Always set parentId for folder navigation
      url.searchParams.set("parentId", parentId ? parentId : "null");

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch items");

      setItems(data);
    } catch (err) {
      console.error("Error fetching items:", err);
    }
  };

  useEffect(() => {
    fetchItems(currentFolder);
  }, [companyId, currentFolder]);

  const [userRole, setUserRole] = useState("");

  const trimName = (name) => {
    if (!name) return "";
    return name.length > 20 ? name.substring(0, 20) + "...." : name;
  };

  // ✅ Fetch logged-in user role from API or localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:5000/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserRole(data.role);
      })
      .catch((err) => console.error(err));
  }, []);

  const checkUserAccess = async (itemId) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/access-request/check/${itemId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      return res.ok && data.hasAccess;
    } catch (err) {
      console.error("Error checking access:", err);
      return false;
    }
  };

  // Send access request
  const requestAccess = async (itemId, itemType) => {
    try {
      const res = await fetch("http://localhost:5000/api/access-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          itemId,
          itemType, // "file" or "folder"
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to send request");
      return true;
    } catch (err) {
      console.error("Error requesting access:", err);
      alert("Failed to send request");
      return false;
    }
  };

  const handleDoubleClick = async (item) => {
    try {
      // ✅ Admin bypass
      if (userRole === "Admin") {
        if (item.type === "folder") {
          setHistory([
            ...history,
            { id: currentFolder, name: currentFolderName },
          ]);
          setCurrentFolder(item._id);
          setCurrentFolderName(item.name);
          setSearchTerm("");
        } else {
          setPreviewFile(item);
        }
        return;
      }

      // ✅ Ask backend if user can open
      const res = await fetch(
        `http://localhost:5000/api/items/${item._id}/open`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();

      if (res.ok && data.allowed) {
        // Access granted
        if (item.type === "folder") {
          setHistory([
            ...history,
            { id: currentFolder, name: currentFolderName },
          ]);
          setCurrentFolder(item._id);
          setCurrentFolderName(item.name);
          setSearchTerm("");
        } else {
          setPreviewFile(item);
        }
      } else {
        // Access denied → ask for request
        if (
          window.confirm("You don’t have access. Do you want to request it?")
        ) {
          await requestAccess(item._id, item.type);
          alert("Request sent to admin. Please wait for approval.");
        }
      }
    } catch (err) {
      console.error("Error opening item:", err);
    }
  };

  const goBack = () => {
    const last = history[history.length - 1];
    if (!last) {
      setCurrentFolder(null);
      setCurrentFolderName(""); // ✅ reset folder name
      setHistory([]);
    } else {
      setCurrentFolder(last.id);
      setCurrentFolderName(last.name); // ✅ restore last folder name
      setHistory(history.slice(0, -1));
    }
  };
  useEffect(() => {
    fetch("http://localhost:5000/api/companies")
      .then((res) => res.json())
      .then((data) => {
        setCompanies(data);
        if (companyId) {
          const activeCompany = data.find((c) => c._id === companyId);
          if (activeCompany) setCompanyName(activeCompany.name);
        } else {
          setCompanyName("All Files/Folder"); // Show All Companies if no company selected
        }
      })
      .catch((err) => console.error(err));
  }, [companyId]);

  const addCompany = async (newCompany) => {
    try {
      const res = await fetch("http://localhost:5000/api/companies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCompany }),
      });
      const data = await res.json();
      if (res.ok) {
        setCompanies((prev) => [...prev, data]);
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditSave = async (updatedFile) => {
    try {
      if (!updatedFile._id) {
        console.error("Missing _id in updatedFile:", updatedFile);
        return;
      }

      const res = await fetch(
        `http://localhost:5000/api/items/${updatedFile._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedFile),
        }
      );

      if (!res.ok) {
        const text = await res.text();
        console.error("Update failed:", text);
        return;
      }

      // Refresh list after update
      fetchItems(currentFolder);
      setEditFile(null);
    } catch (err) {
      console.error("Error updating file:", err);
    }
  };
  // ✅ Delete file/folder
  const handleDeleteConfirm = async () => {
    if (!deleteFile) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/items/${deleteFile._id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) {
        const text = await res.text();
        console.error("Delete failed:", text);
        return;
      }

      // Refresh list after delete
      fetchItems(currentFolder);
      setDeleteFile(null); // close modal
    } catch (err) {
      console.error("Error deleting file:", err);
    }
  };

  const createFolder = async (folderData) => {
    try {
      const res = await fetch("http://localhost:5000/api/items/folders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: folderData.name,
          companyId: companyId,
          parentId: currentFolder,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setItems((prev) => [...prev, data]);
        setShowCreateFolder(false);
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAssignToCompany = async (companyId) => {
    if (!assignFile) return;
    try {
      const res = await fetch(
        `http://localhost:5000/api/items/${assignFile._id}/assign`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ companyId }),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to assign");
      }

      setAssignFile(null); // close modal
      fetchItems(currentFolder); // refresh
      alert("Item assigned successfully!");
    } catch (err) {
      console.error("Error assigning item:", err);
      alert("Failed to assign item.");
    }
  };

  const handleAction = (action, item) => {
    switch (action) {
      case "edit":
        setEditFile(item);
        break;
      case "delete":
        setDeleteFile(item);
        break;
      case "assign":
        setAssignFile(item);
        break;
      case "shareDept":
        openShareDeptModal(item._id); // ✅ open modal
        break;
      default:
        break;
    }
  };

  // Helper function for icons
  const getFileIcon = (file) => {
    if (file.type === "folder") return FolderIcon;
    if (!file.mimeType) return FileIcon;

    if (file.mimeType.startsWith("image/")) return ImageIcon;
    if (file.mimeType.startsWith("video/")) return VideoIcon;
    if (file.mimeType.startsWith("audio/")) return AudioIcon;
    if (file.mimeType === "application/pdf") return PdfIcon;
    if (
      file.mimeType.includes("spreadsheet") ||
      file.mimeType.includes("excel") ||
      file.mimeType.includes("sheet")
    )
      return Sheet;
    if (
      file.mimeType.includes("word") ||
      file.mimeType.includes("officedocument.wordprocessingml")
    )
      return Word;

    return FileIcon; // fallback
  };

  const getDisplayType = (file) => {
    if (file.type === "folder") return "Folder";
    if (!file.mimeType) return "File";
    if (file.mimeType.startsWith("image/")) return "Image";
    if (file.mimeType.startsWith("video/")) return "Video";
    if (file.mimeType.startsWith("audio/")) return "Audio";
    if (file.mimeType === "application/pdf") return "PDF";
    if (
      file.mimeType.includes("spreadsheet") ||
      file.mimeType.includes("excel") ||
      file.mimeType.includes("sheet")
    )
      return "Excel";
    if (
      file.mimeType.includes("word") ||
      file.mimeType.includes("officedocument.wordprocessingml")
    )
      return "Word";
    if (
      file.mimeType.includes("presentation") ||
      file.mimeType.includes("powerpoint")
    )
      return "PowerPoint";

    if (file.mimeType.includes("text")) return "Text";
    return file.mimeType; // fallback
  };

  // const [localSearch, setLocalSearch] = useState("");

  // // reset local search jab folder change ho
  // useEffect(() => {
  //   setLocalSearch("");
  // }, [currentFolder]);
  return (
    <div className="files-page">
      {/* Header */}
      <div className="file-header">
        <div className="file-header-content">
          {/* <h2 className="text-xl font-bold">Files / Folders</h2> */}
          <h2 className="text-xl font-bold">
            {currentFolder
              ? currentFolderName
              : companyName || "Files / Folders"}
          </h2>
          {currentFolder && (
            <button onClick={goBack} className="back-btn">
              ⬅ Back
            </button>
          )}
        </div>
        {userRole === "Admin" && (
          <div className="create-upload-buttons">
            <button onClick={() => setShowUpload(true)} className="upload-btn">
              Upload File/Folder
            </button>
            <button
              className="create-btn"
              onClick={() => setShowCreateFolder(true)}
            >
              + Create Folder
            </button>
          </div>
        )}
      </div>

      {/* ✅ Table View instead of Grid */}
      <div className="table-wrapper">
        <table className="files-table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>TYPE</th>
              <th>ASSOCIATED WITH</th>
              <th>UPLOADED DATE</th>
              <th>Expiry DATE</th>
              {userRole === "Admin" && <th>ACTION</th>}
            </tr>
          </thead>

          {/* <tbody>
          {items.length > 0 ? (
            items.map((item) => {
              // Find company name from companies list
              const company = companies.find((c) => c._id === item.companyId);
              return (
                <tr
                  key={item._id}
                  onDoubleClick={() => handleDoubleClick(item)}
                  className="cursor-pointer"
                >
                  <td className="name-cell">
                    <img
                      // src={item.type === "folder" ? FolderIcon : FileIcon}
                      src={getFileIcon(item)}
                      alt={item.type}
                      className="icon"
                    />
                    {trimName(item.name)}
                  </td>
                  
                  <td>{getDisplayType(item)}</td>
                  <td>{company ? company.name : "N/A"}</td>
                  <td>
                    {new Date(item.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td>
                    {new Date(item.expiryDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                 
                  {userRole === "Admin" && (
                    <td>
                      <select
                        defaultValue=""
                        onChange={(e) => handleAction(e.target.value, item)}
                      >
                        <option value="" disabled>
                          Select
                        </option>
                        <option value="edit">Edit</option>
                        <option value="delete">Delete</option>
                        <option value="assign">Assign to Member</option>
                        <option value="Share with Department">
                          Share with Department
                        </option>
                      </select>
                    </td>
                  )}
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="5" className="empty-row">
                No files or folders here.
              </td>
            </tr>
          )}
        </tbody> */}
          <tbody>
            {items
              .filter((item) =>
                searchTerm
                  ? item.name.toLowerCase().includes(searchTerm.toLowerCase())
                  : true
              )
              .map((item) => {
                const company = companies.find((c) => c._id === item.companyId);
                return (
                  <tr
                    key={item._id}
                    onDoubleClick={() => handleDoubleClick(item)}
                    className="cursor-pointer"
                  >
                    <td className="name-cell">
                      <img
                        src={getFileIcon(item)}
                        alt={item.type}
                        className="icon"
                      />
                      {trimName(item.name)}
                    </td>
                    <td>{getDisplayType(item)}</td>
                    <td>{company ? company.name : "N/A"}</td>
                    <td>
                      {new Date(item.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td>
                      {new Date(item.expiryDate).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    {userRole === "Admin" && (
                      <td>
                        <select
                          defaultValue=""
                          onChange={(e) => handleAction(e.target.value, item)}
                        >
                          <option value="" disabled>
                            Select
                          </option>
                          <option value="edit">Edit</option>
                          <option value="delete">Delete</option>
                          <option value="assign">Assign to Member</option>
                          <option value="shareDept">
                            Share with Department
                          </option>
                        </select>
                      </td>
                    )}
                  </tr>
                );
              })}
            {items.length === 0 && (
              <tr>
                <td colSpan="6" className="empty-row">
                  No files or folders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* File Preview Modal */}
      {previewFile && (
        <FilePreviewModal
          file={previewFile}
          onClose={() => setPreviewFile(null)}
        />
      )}
      {/* Upload Modal */}
      {showUpload && (
        <UploadModal
          onClose={() => setShowUpload(false)}
          parentId={currentFolder}
          companyId={companyId}
          onUploaded={() => fetchItems(currentFolder)}
        />
      )}
      {editFile && (
        <EditFileModal
          file={editFile}
          onClose={() => setEditFile(null)}
          onSave={handleEditSave}
        />
      )}
      {/* Delete Confirmation Modal */}
      {deleteFile && (
        <DeleteConfirmModal
          onClose={() => setDeleteFile(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}

      {/* Create Folder Modal */}
      {showCreateFolder && (
        <CreateFolderModal
          onClose={() => setShowCreateFolder(false)}
          onCreate={createFolder}
          companies={companies}
          addCompany={addCompany}
          parentId={currentFolder}
        />
      )}
      {/* ✅ Assign Member Modal */}
      {assignFile && (
        <AssignMemberModal
          onSelectMember={handleAssignToCompany}
          onClose={() => setAssignFile(null)}
        />
      )}
      {shareDeptModal && (
        <ShareWithDepartmentModal
          show={shareDeptModal}
          onClose={() => setShareDeptModal(false)}
          itemId={selectedItemId}
          companyId={companyId} // ✅ you pass companyId here
          onShared={() => {
            alert("Item shared successfully!");
            fetchItems(); // refresh list
          }}
        />
      )}
    </div>
  );
};

export default Files;

/*updated code*/
