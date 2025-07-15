import React, { useRef, useState, useEffect } from "react";
import "../styles/UploadModal.css";
import pdfIcon from "../assets/pdf.png";
import SetFileOptionsModal from "./SetFileOptionsModal";
import CreateFolderModal from "./CreateFolderModal";
import UploadedCloud from "../assets/cloud-add.png";
const UploadModal = ({ onClose, onSubmit, onAddFile }) => {
  const fileInputRef = useRef(null);
  const modalRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const [files, setFiles] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  const [showCreateFolder, setShowCreateFolder] = useState(false);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const filesWithMeta = selectedFiles.map((file) => ({
      file,
      progress: 0,
      status: "uploading",
    }));
    setFiles((prev) => {
      const updated = [...filesWithMeta, ...prev];
      filesWithMeta.forEach((f, idx) => {
        const fileIndex = idx;
        const interval = setInterval(() => {
          updated[fileIndex].progress += 10;
          if (updated[fileIndex].progress >= 100) {
            updated[fileIndex].progress = 100;
            updated[fileIndex].status = "completed";
            clearInterval(interval);
          }
          setFiles([...updated]);
        }, 200);
      });

      return updated;
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    fileInputRef.current.files = e.dataTransfer.files;
    handleFileChange({ target: { files: e.dataTransfer.files } });
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    setShowOptions(true);
  };

  return (
    <>
      {!showOptions ? (
        <div className="modal-overlay">
          <div className="upload-modal" ref={modalRef}>
            <div className="modal-header">
              <div>
                <div className="model-header-span">
                  <span>
                    <img src={UploadedCloud} alt="uploaded" />
                  </span>
                  <h2>Upload files</h2>
                </div>
                <p>Select and upload the files oof your choice</p>
              </div>
              <button className="upload-close-btn" onClick={onClose}>
                ×
              </button>
            </div>
            <hr className="modal-divider" />

            <button
              className="create-folder"
              onClick={() => setShowCreateFolder(true)}
            >
              Create Folder
            </button>

            {showCreateFolder && (
              <CreateFolderModal
                onClose={() => setShowCreateFolder(false)}
                onCreate={(data) => console.log("Created folder data", data)}
              />
            )}

            <div
              className="drop-area"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <span>
                <img src={UploadedCloud} alt="uploaded" />
              </span>
              <h4>Choose a file or drag & drop it here</h4>
              <p>JPEG, PNG, PDG, and MP4 formats, up to 50MB</p>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                multiple
                style={{ display: "none" }}
              />
              <button
                className="browse-btn"
                onClick={() => fileInputRef.current.click()}
              >
                Browse File
              </button>
            </div>

            <div className="file-list">
              {files.map((f, index) => (
                <div
                  className="uploaded-file-container"
                  key={index}
                  style={{
                    background: "#f2f5fa",
                    padding: "16px",
                    borderRadius: "12px",
                    marginBottom: "16px",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                    }}
                  >
                    {/* File Icon or Preview */}
                    <div className="file-preview">
                      {f.file.type && f.file.type.startsWith("image/") ? (
                        <img
                          src={URL.createObjectURL(f.file)}
                          alt="Preview"
                          style={{
                            width: "40px",
                            height: "40px",
                            objectFit: "cover",
                            borderRadius: "6px",
                          }}
                        />
                      ) : (
                        <img
                          src={pdfIcon}
                          alt="pdf"
                          style={{ width: "40px", height: "40px" }}
                        />
                      )}
                    </div>

                    {/* Info: Name, Size, Status */}
                    <div className="file-info" style={{ flex: 1 }}>
                      <div
                        style={{
                          fontWeight: "600",
                          fontSize: "15px",
                          color: "#292D32",
                        }}
                      >
                        {f.file.name}
                      </div>
                      <div
                        style={{
                          fontSize: "14px",
                          color: "#A9ACB4",
                          marginTop: "4px",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        {(f.file.size / 1024).toFixed(0)} KB of{" "}
                        {(f.file.size / 1024).toFixed(0)} KB •
                        {f.status === "uploading" ? (
                          <>
                            <span className="spinner" />
                            <span>Uploading...</span>
                          </>
                        ) : (
                          <>
                            <span
                              style={{
                                color: "#fff",
                                fontWeight: "bold",
                                background: "#3EBF8F",
                                width: "20px",
                                height: "20px",
                                textAlign: "center",
                                "border-radius": "10px",
                              }}
                            >
                              ✓
                            </span>
                            <span
                              style={{
                                color: "#292D32",
                                fontWeight: 500,
                              }}
                            >
                              Completed
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="file-actions">
                      {f.status === "uploading" ? (
                        <button
                          onClick={() => removeFile(index)}
                          className="circle-btn"
                        >
                          ×
                        </button>
                      ) : (
                        <button
                          onClick={() => removeFile(index)}
                          className="trash-btn"
                        >
                          🗑
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div
                    className="progress-container"
                    style={{
                      marginTop: "12px",
                      height: "8px",
                      backgroundColor: "#d4d4d4",
                      borderRadius: "6px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${f.progress}%`,
                        height: "100%",
                        backgroundColor: "#3b82f6",
                        transition: "width 0.3s ease",
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="modal-footer">
              <button className="back-btn" onClick={onClose}>
                Back
              </button>
              <button className="submit-btn" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      ) : (
        // <SetFileOptionsModal onBack={() => setShowOptions(false)} />
        <SetFileOptionsModal
          onBack={() => setShowOptions(false)}
          onSubmitWithOptions={(expiryDate) => {
            console.log("Received expiryDate:", expiryDate);
            if (files.length > 0) {
              const uploadedFile = files[0].file;
              const newFileData = {
                name: uploadedFile.name,
                type: uploadedFile.name.split(".").pop().toUpperCase(),
                uploadedDate: new Date().toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }),
                expiryDate: (() => {
                  if (!expiryDate) return "";
                  const [year, month, day] = expiryDate.split("-");
                  const formattedDate = new Date(year, month - 1, day);
                  return `${day} ${formattedDate.toLocaleString("default", {
                    month: "short",
                  })} ${year}`;
                })(),
                // expiryDate: (() => {
                //   const [year, month, day] = expiryDate.split("-");
                //   return `${day} ${new Date(year, month - 1).toLocaleString(
                //     "default",
                //     {
                //       month: "short",
                //     }
                //   )} ${year}`;
                // })(),
              };
              // onAddFile(newFileData);
              if (typeof onAddFile === "function") {
                onAddFile(newFileData);
              }
            }
            setShowOptions(false);
            onClose();
          }}
        />
      )}
    </>
  );
};

export default UploadModal;
