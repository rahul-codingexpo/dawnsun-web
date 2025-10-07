import React, { useEffect, useState } from "react";
import "../styles/FilePreviewModal.css";
import * as XLSX from "xlsx";
import mammoth from "mammoth";
const FilePreviewModal = ({ file, onClose }) => {
  useEffect(() => {
    const disableRightClick = (e) => e.preventDefault();
    document.addEventListener("contextmenu", disableRightClick);
    return () => document.removeEventListener("contextmenu", disableRightClick);
  }, []);
  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const [excelData, setExcelData] = useState([]);
  const [docText, setDocText] = useState("");

  // Helper to normalize file URL
  const getFileUrl = () => {
    if (!file?.url) return null;
    if (file.url.startsWith("http")) return file.url;
    let normalized = file.url.replace(/^\/?uploads[\\/]/, "");
    normalized = normalized.replace(/\\/g, "/");
    return `http://localhost:5000/uploads/${normalized}`;
  };

  useEffect(() => {
    if (
      file &&
      ["xls", "xlsx"].includes(file.name.split(".").pop().toLowerCase())
    ) {
      fetch(getFileUrl())
        .then((res) => res.arrayBuffer())
        .then((ab) => {
          const wb = XLSX.read(ab, { type: "array" });
          const ws = wb.Sheets[wb.SheetNames[0]];
          const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
          setExcelData(data);
        });
    }
  }, [file]);

  useEffect(() => {
    if (file && ["docx"].includes(file.name.split(".").pop().toLowerCase())) {
      fetch(getFileUrl())
        .then((res) => res.arrayBuffer())
        .then((ab) => {
          mammoth.extractRawText({ arrayBuffer: ab }).then((result) => {
            setDocText(result.value);
          });
        });
    }
  }, [file]);

  if (!file) return null;

  const renderPreview = () => {
    const url = getFileUrl();
    if (!url) return <p>No file available</p>;

    if (file.type === "file") {
      const ext = file.name.split(".").pop().toLowerCase();

      // Images
      if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) {
        return (
          <img
            src={url}
            alt={file.name}
            className="preview-img"
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
          />
        );
      }

      // Videos
      if (["mp4", "webm", "ogg"].includes(ext)) {
        return (
          <video
            src={url}
            controls
            className="preview-video"
            controlsList="nodownload noremoteplayback"
            disablePictureInPicture
            onContextMenu={(e) => e.preventDefault()}
          />
        );
      }

      // Audio
      if (["mp3", "wav", "ogg"].includes(ext)) {
        return (
          <audio
            src={url}
            controls
            controlsList="nodownload noplaybackrate noremoteplayback"
            className="preview-audio"
            onContextMenu={(e) => e.preventDefault()}
          />
        );
      }

      // PDF
      if (ext === "pdf") {
        return (
          <iframe
            src={`${url}#toolbar=0&navpanes=0&scrollbar=0`}
            title={file.name}
            className="preview-pdf"
            allow="clipboard-read; clipboard-write"
            onContextMenu={(e) => e.preventDefault()}
          />
          // <iframe
          //   src={url}
          //   title={file.name}
          //   className="preview-pdf"
          //   onContextMenu={(e) => e.preventDefault()}
          // />
        );
      }
      if (["txt", "csv", "json"].includes(ext)) {
        return (
          <div className="preview-text-box">
            <iframe src={url} title={file.name}></iframe>
          </div>
        );
      }
      if (["xls", "xlsx"].includes(ext)) {
        return (
          <table className="preview-excel">
            <tbody>
              {excelData.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        );
      }
      if (["doc", "docx"].includes(ext)) {
        return (
          <div className="preview-doc">
            <pre>{docText || "Loading document..."}</pre>
          </div>
        );
      }
      return <p>Cannot preview this file type.</p>;
    }

    return <p>Preview not available for folders.</p>;
  };

  return (
    <div className="preview-overlay" onClick={onClose}>
      <div
        className="preview-modal"
        onClick={(e) => e.stopPropagation()} // prevent accidental close
        onContextMenu={(e) => e.preventDefault()} // disable right-click
      >
        <div className="preview-header">
          <h3 title={file.name}>{file.name}</h3>
          <button
            className="close-btn"
            onClick={onClose}
            aria-label="Close Preview"
          >
            ✖
          </button>
        </div>
        <div className="preview-content">{renderPreview()}</div>
      </div>
    </div>
  );
};

export default FilePreviewModal;
