import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from 'react'
import { userContext } from './context.jsx'

function changeAvatar() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const {getUser}=useContext(userContext);

  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFile = (f) => {
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      setError("Only image files are allowed.");
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      setError("File must be under 5 MB.");
      return;
    }
    setError("");
    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(f);
  };

  const handleInputChange = (e) => handleFile(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => { e.preventDefault(); setDragging(true); };
  const handleDragLeave = () => setDragging(false);

  const handleRemove = () => {
    setPreview(null);
    setFile(null);
    setError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) { setError("Please select an image first."); return; }
    setUploading(true);
    try {
      const data = new FormData();
      data.append("avatar", file);
      const res = await axios.post(
        "http://localhost:4000/users/changeavatar",
        data,
        { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true }
      );
      if (res.data.success){
        await getUser();
        navigate("/home");

      }
    } catch (err) {
        console.log(err.response)
      setError(err.response?.data?.message || "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const ImageIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="3"/>
      <circle cx="8.5" cy="8.5" r="1.5"/>
      <polyline points="21 15 16 10 5 21"/>
    </svg>
  );

  const UserIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );

  const TrashIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6l-1 14H6L5 6"/>
      <path d="M10 11v6M14 11v6"/>
      <path d="M9 6V4h6v2"/>
    </svg>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@400;500;700&display=swap');

        .ca-root {
          min-height: 100vh;
          background: #050509;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Inter', sans-serif;
          overflow: hidden;
          position: relative;
        }

        .ca-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(108,63,232,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(108,63,232,0.07) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
        }

        .ca-blob-1 {
          position: absolute;
          width: 480px; height: 480px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(108,63,232,0.22) 0%, transparent 70%);
          bottom: -120px; left: -80px;
          filter: blur(40px);
          animation: caBlob 9s ease-in-out infinite alternate;
        }
        .ca-blob-2 {
          position: absolute;
          width: 340px; height: 340px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,245,212,0.13) 0%, transparent 70%);
          top: -60px; right: -60px;
          filter: blur(50px);
          animation: caBlob 11s ease-in-out infinite alternate-reverse;
        }

        @keyframes caBlob {
          from { transform: translate(0,0) scale(1); }
          to   { transform: translate(25px,18px) scale(1.07); }
        }

        .ca-ring {
          position: absolute;
          width: 520px; height: 520px;
          border-radius: 50%;
          border: 1px solid transparent;
          background: linear-gradient(#050509, #050509) padding-box,
                      conic-gradient(from 90deg, #6C3FE8, transparent 50%, #00F5D4, transparent 80%, #6C3FE8) border-box;
          animation: caRing 9s linear infinite;
          opacity: 0.4;
          pointer-events: none;
        }
        @keyframes caRing { to { transform: rotate(360deg); } }

        /* card */
        .ca-card {
          position: relative;
          width: 400px;
          background: rgba(12,10,22,0.85);
          border: 1px solid rgba(108,63,232,0.3);
          border-radius: 20px;
          padding: 44px 40px 48px;
          backdrop-filter: blur(20px);
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.03),
            0 32px 80px rgba(0,0,0,0.6),
            inset 0 1px 0 rgba(255,255,255,0.06);
          z-index: 10;
        }

        .ca-watermark {
          position: absolute;
          top: 10px; right: 16px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 68px; font-weight: 700;
          color: rgba(108,63,232,0.055);
          letter-spacing: -2px;
          user-select: none; pointer-events: none;
          line-height: 1;
        }

        /* eyebrow */
        .ca-eyebrow {
          display: flex; align-items: center; gap: 8px;
          margin-bottom: 10px;
        }
        .ca-eyebrow-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #00F5D4;
          box-shadow: 0 0 8px #00F5D4;
        }
        .ca-eyebrow-text {
          font-size: 11px; font-weight: 500;
          letter-spacing: 2.5px; color: #00F5D4;
          text-transform: uppercase;
        }

        /* icon badge */
        .ca-icon-badge {
          width: 40px; height: 40px; border-radius: 10px;
          background: rgba(108,63,232,0.15);
          border: 1px solid rgba(108,63,232,0.3);
          display: flex; align-items: center; justify-content: center;
          color: #6C3FE8; margin-bottom: 14px;
        }

        .ca-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 30px; font-weight: 700;
          color: #F0ECFF; line-height: 1.15;
          letter-spacing: -0.5px; margin-bottom: 36px;
        }
        .ca-title span { color: #6C3FE8; }

        .ca-divider {
          height: 1px;
          background: linear-gradient(90deg, rgba(108,63,232,0.5), transparent);
          margin-bottom: 28px; margin-top: -20px;
        }

        /* avatar preview ring */
        .ca-avatar-area {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 24px;
        }
        .ca-avatar-ring {
          position: relative;
          width: 112px; height: 112px;
          border-radius: 50%;
          padding: 3px;
          background: conic-gradient(from 0deg, #6C3FE8, #00F5D4, #6C3FE8);
          animation: caRing 4s linear infinite;
          margin-bottom: 14px;
        }
        .ca-avatar-ring-inner {
          width: 100%; height: 100%;
          border-radius: 50%;
          background: #050509;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
        }
        .ca-avatar-img {
          width: 100%; height: 100%;
          object-fit: cover; border-radius: 50%;
        }
        .ca-avatar-placeholder {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          color: rgba(155,142,196,0.35);
          gap: 6px;
        }
        .ca-avatar-placeholder span {
          font-size: 10px; letter-spacing: 1px;
          text-transform: uppercase; color: rgba(155,142,196,0.3);
        }

        /* remove pill */
        .ca-remove-btn {
          display: flex; align-items: center; gap: 5px;
          background: rgba(239,68,68,0.08);
          border: 1px solid rgba(239,68,68,0.2);
          border-radius: 20px;
          padding: 5px 12px;
          color: #fca5a5; font-size: 11px;
          font-weight: 500; letter-spacing: 0.5px;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
          font-family: 'Inter', sans-serif;
          margin-top: 2px;
        }
        .ca-remove-btn:hover {
          background: rgba(239,68,68,0.15);
          border-color: rgba(239,68,68,0.4);
        }

        /* drop zone */
        .ca-dropzone {
          position: relative;
          border: 1.5px dashed rgba(108,63,232,0.35);
          border-radius: 12px;
          padding: 28px 20px;
          text-align: center;
          cursor: pointer;
          background: rgba(108,63,232,0.04);
          transition: border-color 0.25s, background 0.25s;
          margin-bottom: 20px;
        }
        .ca-dropzone.dragging {
          border-color: #00F5D4;
          background: rgba(0,245,212,0.05);
        }
        .ca-dropzone:hover {
          border-color: rgba(108,63,232,0.6);
          background: rgba(108,63,232,0.07);
        }
        .ca-dropzone-icon {
          color: rgba(108,63,232,0.55);
          margin-bottom: 10px;
          display: flex; justify-content: center;
          transition: color 0.25s;
        }
        .ca-dropzone.dragging .ca-dropzone-icon { color: #00F5D4; }
        .ca-dropzone-main {
          font-size: 13px; color: #9B8EC4; margin-bottom: 4px;
        }
        .ca-dropzone-main strong {
          color: #6C3FE8; font-weight: 600;
          text-decoration: underline; text-underline-offset: 2px;
        }
        .ca-dropzone-sub {
          font-size: 11px; color: rgba(155,142,196,0.45);
          letter-spacing: 0.3px;
        }
        .ca-hidden-input {
          position: absolute; inset: 0;
          opacity: 0; cursor: pointer; width: 100%; height: 100%;
        }

        /* file chip */
        .ca-file-chip {
          display: flex; align-items: center; gap: 10px;
          background: rgba(0,245,212,0.06);
          border: 1px solid rgba(0,245,212,0.2);
          border-radius: 8px; padding: 10px 14px;
          margin-bottom: 20px;
        }
        .ca-file-chip-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #00F5D4;
          box-shadow: 0 0 8px #00F5D4;
          flex-shrink: 0;
        }
        .ca-file-chip-name {
          flex: 1; font-size: 13px;
          color: #F0ECFF; white-space: nowrap;
          overflow: hidden; text-overflow: ellipsis;
        }
        .ca-file-chip-size {
          font-size: 11px; color: #9B8EC4; flex-shrink: 0;
        }

        /* error */
        .ca-error {
          display: flex; align-items: center; gap: 7px;
          background: rgba(239,68,68,0.08);
          border: 1px solid rgba(239,68,68,0.25);
          border-radius: 8px; padding: 10px 14px;
          color: #fca5a5; font-size: 13px;
          margin-bottom: 16px;
        }
        .ca-error-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #ef4444; flex-shrink: 0;
        }

        /* button */
        .ca-btn {
          position: relative; width: 100%;
          margin-top: 4px; padding: 14px;
          border-radius: 10px; border: none; cursor: pointer;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 15px; font-weight: 600;
          letter-spacing: 0.3px; color: #F0ECFF;
          background: linear-gradient(135deg, #6C3FE8, #4e25c0);
          box-shadow: 0 4px 24px rgba(108,63,232,0.35);
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
        }
        .ca-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(0,245,212,0.15), transparent);
          opacity: 0; transition: opacity 0.3s;
        }
        .ca-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(108,63,232,0.55); }
        .ca-btn:hover:not(:disabled)::before { opacity: 1; }
        .ca-btn:active:not(:disabled) { transform: translateY(0); }
        .ca-btn:disabled { opacity: 0.55; cursor: not-allowed; }

        .ca-btn-arrow {
          display: inline-block; margin-left: 8px;
          transition: transform 0.2s;
        }
        .ca-btn:hover:not(:disabled) .ca-btn-arrow { transform: translateX(4px); }

        /* spinner */
        .ca-spinner {
          display: inline-block; width: 14px; height: 14px;
          border: 2px solid rgba(240,236,255,0.3);
          border-top-color: #F0ECFF;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          margin-right: 8px; vertical-align: middle;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="ca-root">
        <div className="ca-grid" />
        <div className="ca-blob-1" />
        <div className="ca-blob-2" />
        <div className="ca-ring" />

        <div className="ca-card">
          <div className="ca-watermark">IMG</div>

          <div className="ca-icon-badge">
            <UserIcon />
          </div>

          <div className="ca-eyebrow">
            <div className="ca-eyebrow-dot" />
            <span className="ca-eyebrow-text">Profile</span>
          </div>

          <h1 className="ca-title">
            Update your<br />
            <span>avatar</span>
          </h1>

          <div className="ca-divider" />

          {/* live avatar preview */}
          <div className="ca-avatar-area">
            <div className="ca-avatar-ring">
              <div className="ca-avatar-ring-inner">
                {preview ? (
                  <img src={preview} alt="preview" className="ca-avatar-img" />
                ) : (
                  <div className="ca-avatar-placeholder">
                    <ImageIcon />
                    <span>Preview</span>
                  </div>
                )}
              </div>
            </div>
            {preview && (
              <button type="button" className="ca-remove-btn" onClick={handleRemove}>
                <TrashIcon /> Remove
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit}>
            {/* drop zone */}
            <div
              className={`ca-dropzone${dragging ? " dragging" : ""}`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="ca-hidden-input"
                onChange={handleInputChange}
              />
              <div className="ca-dropzone-icon"><ImageIcon /></div>
              <p className="ca-dropzone-main">
                Drop image here or <strong>browse</strong>
              </p>
              <p className="ca-dropzone-sub">PNG, JPG, WEBP · max 5 MB</p>
            </div>

            {/* selected file chip */}
            {file && (
              <div className="ca-file-chip">
                <div className="ca-file-chip-dot" />
                <span className="ca-file-chip-name">{file.name}</span>
                <span className="ca-file-chip-size">
                  {(file.size / 1024).toFixed(0)} KB
                </span>
              </div>
            )}

            {error && (
              <div className="ca-error">
                <div className="ca-error-dot" />
                {error}
              </div>
            )}

            <button type="submit" className="ca-btn" disabled={uploading || !file}>
              {uploading && <span className="ca-spinner" />}
              {uploading ? "Uploading…" : <>Upload avatar <span className="ca-btn-arrow">→</span></>}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default changeAvatar;
