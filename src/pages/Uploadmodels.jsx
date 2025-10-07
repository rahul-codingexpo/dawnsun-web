import React, { useRef, useState, useEffect } from "react";
import "../styles/UploadModal.css";
import pdfIcon from "../assets/pdf.png";
import SetFileOptionsModal from "./SetFileOptionsModal";
import UploadedCloud from "../assets/cloud-add.png";

const UploadModal = ({ onClose, onAddFile, parentId = null }) => {
  const fileInputRef = useRef(null);
  const folderInputRef = useRef(null);
  const modalRef = useRef();

  const [files, setFiles] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState("");

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // Revoke object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      files.forEach((f) => {
        if (f.preview) URL.revokeObjectURL(f.preview);
      });
    };
  }, [files]);

  // Handle file select
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const filesWithMeta = selectedFiles.map((file) => ({
      file,
      relativePath: file.webkitRelativePath || file.name,
      preview: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : null,
      progress: 0,
      status: "pending",
    }));
    setFiles((prev) => [...prev, ...filesWithMeta]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFileChange({ target: { files: e.dataTransfer.files } });
  };

  const removeFile = (index) => {
    const fileToRemove = files[index];
    if (fileToRemove.preview) URL.revokeObjectURL(fileToRemove.preview);
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // const uploadFiles = async (expiryDate, lifetime) => {
  //   if (!files.length) {
  //     alert("Please select files/folders");
  //     return;
  //   }

  //   const token = localStorage.getItem("token");
  //   const formData = new FormData();

  //   // Append parentId or companyId
  //   if (parentId) {
  //     formData.append("parentId", parentId);
  //   } else {
  //     if (!selectedCompany) {
  //       alert("Please select a company before uploading");
  //       return;
  //     }
  //     formData.append("companyId", selectedCompany);
  //   }

  //   if (lifetime) formData.append("lifetime", true);
  //   else if (expiryDate) formData.append("expiryDate", expiryDate);

  //   files.forEach((f) => {
  //     formData.append("files", f.file, f.relativePath);
  //   });

  //   formData.append(
  //     "relativePaths",
  //     JSON.stringify(files.map((f) => f.relativePath))
  //   );

  //   try {
  //     const res = await fetch("http://localhost:5000/api/items/upload", {
  //       method: "POST",
  //       headers: { Authorization: `Bearer ${token}` },
  //       body: formData,
  //     });

  //     const data = await res.json();
  //     if (!res.ok) throw new Error(data.message || "Upload failed");

  //     if (typeof onAddFile === "function") onAddFile(data.items);
  //   } catch (err) {
  //     console.error(err);
  //     alert(err.message);
  //   }

  //   onClose();
  // };

  const uploadFiles = async (expiryDate, lifetime, department) => {
    if (!files.length) {
      alert("Please select files/folders");
      return;
    }

    const token = localStorage.getItem("token");
    const formData = new FormData();

    // Append parentId or companyId
    if (parentId) {
      formData.append("parentId", parentId);
    } else {
      if (!selectedCompany) {
        alert("Please select a company before uploading");
        return;
      }
      formData.append("companyId", selectedCompany);
    }

    if (lifetime) formData.append("lifetime", true);
    else if (expiryDate) formData.append("expiryDate", expiryDate);

    // 🔹 Add department here
    if (department) formData.append("department", department);

    files.forEach((f) => {
      formData.append("files", f.file, f.relativePath);
    });

    formData.append(
      "relativePaths",
      JSON.stringify(files.map((f) => f.relativePath))
    );

    try {
      const res = await fetch("http://localhost:5000/api/items/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload failed");

      if (typeof onAddFile === "function") onAddFile(data.items);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }

    onClose();
  };

  return (
    <>
      {!showOptions ? (
        <div className="modal-overlay">
          <div className="upload-modal" ref={modalRef}>
            <div className="modal-header">
              <div className="model-header-span">
                <span>
                  <img src={UploadedCloud} alt="uploaded" />
                </span>
                <h2>Upload files/folders</h2>
              </div>
              <button className="upload-close-btn" onClick={onClose}>
                ×
              </button>
            </div>

            {/* Upload area */}
            <div
              className="drop-area"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <span>
                <img src={UploadedCloud} alt="uploaded" />
              </span>
              <h4>Choose files/folders</h4>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                multiple
                style={{ display: "none" }}
              />
              <input
                type="file"
                ref={folderInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
                webkitdirectory="true"
                directory="true"
              />
              <div className="browse-button-group">
                <button
                  className="browse-btn"
                  onClick={() => fileInputRef.current.click()}
                >
                  Browse Files
                </button>
                <button
                  className="browse-btn"
                  onClick={() => folderInputRef.current.click()}
                >
                  Browse Folder
                </button>
              </div>
            </div>
            {/* File List */}
            <div className="file-list">
              {files.map((f, index) => (
                <div className="uploaded-file-container" key={index}>
                  <div className="file-info">
                    <img
                      src={f.preview || pdfIcon}
                      alt="file"
                      style={{ width: "40px", height: "40px" }}
                    />
                    <div>
                      <div>{f.file.name}</div>
                      <small>{(f.file.size / 1024).toFixed(0)} KB</small>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="bin-button"
                  >
                    🗑
                  </button>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="modal-footer">
              <button className="back-btn" onClick={onClose}>
                Cancel
              </button>
              <button
                className="submit-btn"
                onClick={() => setShowOptions(true)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      ) : (
        <SetFileOptionsModal
          selectedCompany={selectedCompany}
          setSelectedCompany={setSelectedCompany}
          showCompanySelection={!parentId} // Hide if uploading inside folder
          onBack={() => setShowOptions(false)}
          onSubmitWithOptions={uploadFiles}
        />
      )}
    </>
  );
};

export default UploadModal;
