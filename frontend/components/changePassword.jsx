import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function changePassword() {
  const navigate = useNavigate();

  const [formdata, setformdata] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showFields, setShowFields] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [error, setError] = useState("");

  const toggleShow = (field) => {
    setShowFields((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formdata.newPassword !== formdata.confirmPassword) {
      setError("New passwords do not match.");
      return;
    }
    try {
      const res = await axios.post(
        `${import.meta.env.RENDER_BACKEND_URL}/users/updatepassword`,
        {
          oldPassword: formdata.oldPassword,
          newPassword: formdata.newPassword,
        },
        { withCredentials: true }
      );
      
      if (res.data.success) {
        navigate("/home");
      }
    } catch (err) {
        console.log(err.response)
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  const EyeIcon = ({ open }) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {open ? (
        <>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        </>
      ) : (
        <>
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
          <line x1="1" y1="1" x2="23" y2="23"/>
        </>
      )}
    </svg>
  );

  const LockIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  );

  const fields = [
    { key: "oldPassword", label: "Current password", placeholder: "Enter current password" },
    { key: "newPassword",     label: "New password",     placeholder: "Enter new password" },
    { key: "confirmPassword", label: "Confirm password", placeholder: "Re-enter new password" },
  ];

  /* strength meter */
  const getStrength = (pwd) => {
    if (!pwd) return 0;
    let score = 0;
    if (pwd.length >= 8)  score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };
  const strength = getStrength(formdata.newPassword);
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = ["", "#ef4444", "#f59e0b", "#6C3FE8", "#00F5D4"][strength];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@400;500;700&display=swap');

        .cp-root {
          min-height: 100vh;
          background: #050509;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Inter', sans-serif;
          overflow: hidden;
          position: relative;
        }

        .cp-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(108,63,232,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(108,63,232,0.07) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
        }

        .cp-blob-1 {
          position: absolute;
          width: 480px;
          height: 480px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(108,63,232,0.25) 0%, transparent 70%);
          top: -100px;
          right: -100px;
          filter: blur(40px);
          animation: blobFloat 8s ease-in-out infinite alternate;
        }
        .cp-blob-2 {
          position: absolute;
          width: 360px;
          height: 360px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,245,212,0.15) 0%, transparent 70%);
          bottom: -80px;
          left: -60px;
          filter: blur(50px);
          animation: blobFloat 10s ease-in-out infinite alternate-reverse;
        }

        @keyframes blobFloat {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(30px, 20px) scale(1.08); }
        }

        .cp-ring {
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          border: 1px solid transparent;
          background: linear-gradient(#050509, #050509) padding-box,
                      conic-gradient(from 180deg, #00F5D4, #6C3FE8, transparent 60%, #00F5D4) border-box;
          animation: ringRotate 7s linear infinite reverse;
          opacity: 0.45;
          pointer-events: none;
        }
        @keyframes ringRotate {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        .cp-card {
          position: relative;
          width: 400px;
          background: rgba(12, 10, 22, 0.85);
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

        .cp-watermark {
          position: absolute;
          top: 10px;
          right: 16px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 68px;
          font-weight: 700;
          color: rgba(0,245,212,0.05);
          letter-spacing: -2px;
          user-select: none;
          pointer-events: none;
          line-height: 1;
        }

        .cp-eyebrow {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 10px;
        }
        .cp-eyebrow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #00F5D4;
          box-shadow: 0 0 8px #00F5D4;
        }
        .cp-eyebrow-text {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 2.5px;
          color: #00F5D4;
          text-transform: uppercase;
        }

        .cp-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 30px;
          font-weight: 700;
          color: #F0ECFF;
          line-height: 1.15;
          letter-spacing: -0.5px;
          margin-bottom: 36px;
        }
        .cp-title span {
          color: #6C3FE8;
        }

        .cp-divider {
          height: 1px;
          background: linear-gradient(90deg, rgba(0,245,212,0.4), transparent);
          margin-bottom: 32px;
          margin-top: -20px;
        }

        /* field */
        .cp-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 20px;
        }
        .cp-label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 1.5px;
          color: #9B8EC4;
          text-transform: uppercase;
        }
        .cp-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }
        .cp-input-bar {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          border-radius: 2px 0 0 2px;
          background: rgba(108,63,232,0.4);
          transition: background 0.3s, box-shadow 0.3s;
          z-index: 1;
        }
        .cp-input-wrap:focus-within .cp-input-bar {
          background: linear-gradient(180deg, #00F5D4, #6C3FE8);
          box-shadow: 0 0 12px rgba(0,245,212,0.4);
        }
        .cp-input {
          flex: 1;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(108,63,232,0.2);
          border-left: none;
          border-radius: 0 8px 8px 0;
          padding: 12px 44px 12px 16px;
          color: #F0ECFF;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          outline: none;
          transition: border-color 0.25s, background 0.25s;
          caret-color: #00F5D4;
          width: 100%;
          box-sizing: border-box;
        }
        .cp-input::placeholder { color: rgba(155,142,196,0.35); }
        .cp-input:focus {
          background: rgba(108,63,232,0.07);
          border-color: rgba(108,63,232,0.5);
        }
        .cp-eye-btn {
          position: absolute;
          right: 12px;
          background: none;
          border: none;
          cursor: pointer;
          color: #9B8EC4;
          padding: 4px;
          display: flex;
          align-items: center;
          transition: color 0.2s;
          z-index: 2;
        }
        .cp-eye-btn:hover { color: #00F5D4; }

        /* strength bar */
        .cp-strength {
          margin-top: -10px;
          margin-bottom: 16px;
        }
        .cp-strength-bars {
          display: flex;
          gap: 4px;
          margin-bottom: 4px;
        }
        .cp-strength-seg {
          flex: 1;
          height: 3px;
          border-radius: 2px;
          background: rgba(255,255,255,0.07);
          transition: background 0.35s;
        }
        .cp-strength-label {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--sl-color, #9B8EC4);
          transition: color 0.35s;
        }

        /* error */
        .cp-error {
          display: flex;
          align-items: center;
          gap: 7px;
          background: rgba(239,68,68,0.08);
          border: 1px solid rgba(239,68,68,0.25);
          border-radius: 8px;
          padding: 10px 14px;
          color: #fca5a5;
          font-size: 13px;
          margin-bottom: 16px;
        }
        .cp-error-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #ef4444;
          flex-shrink: 0;
        }

        /* lock icon badge */
        .cp-icon-badge {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(108,63,232,0.15);
          border: 1px solid rgba(108,63,232,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6C3FE8;
          margin-bottom: 14px;
        }

        /* button */
        .cp-btn {
          position: relative;
          width: 100%;
          margin-top: 8px;
          padding: 14px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.3px;
          color: #F0ECFF;
          background: linear-gradient(135deg, #6C3FE8, #4e25c0);
          box-shadow: 0 4px 24px rgba(108,63,232,0.35);
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .cp-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0,245,212,0.15), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .cp-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(108,63,232,0.55);
        }
        .cp-btn:hover::before { opacity: 1; }
        .cp-btn:active {
          transform: translateY(0);
          box-shadow: 0 4px 16px rgba(108,63,232,0.3);
        }
        .cp-btn-arrow {
          display: inline-block;
          margin-left: 8px;
          transition: transform 0.2s;
        }
        .cp-btn:hover .cp-btn-arrow { transform: translateX(4px); }
      `}</style>

      <div className="cp-root">
        <div className="cp-grid" />
        <div className="cp-blob-1" />
        <div className="cp-blob-2" />
        <div className="cp-ring" />

        <div className="cp-card">
          <div className="cp-watermark">KEY</div>

          <div className="cp-icon-badge">
            <LockIcon />
          </div>

          <div className="cp-eyebrow">
            <div className="cp-eyebrow-dot" />
            <span className="cp-eyebrow-text">Security</span>
          </div>

          <h1 className="cp-title">
            Change your<br />
            <span>password</span>
          </h1>

          <div className="cp-divider" />

          <form onSubmit={handleSubmit}>
            {fields.map(({ key, label, placeholder }) => (
              <div className="cp-field" key={key}>
                <label className="cp-label">{label}</label>
                <div className="cp-input-wrap">
                  <div className="cp-input-bar" />
                  <input
                    className="cp-input"
                    type={showFields[key] ? "text" : "password"}
                    name={key}
                    required
                    value={formdata[key]}
                    onChange={handleChange}
                    placeholder={placeholder}
                  />
                  <button
                    type="button"
                    className="cp-eye-btn"
                    onClick={() => toggleShow(key)}
                    tabIndex={-1}
                  >
                    <EyeIcon open={showFields[key]} />
                  </button>
                </div>

                {/* strength meter only under new password */}
                {key === "newPassword" && formdata.newPassword && (
                  <div className="cp-strength">
                    <div className="cp-strength-bars">
                      {[1, 2, 3, 4].map((n) => (
                        <div
                          key={n}
                          className="cp-strength-seg"
                          style={{
                            background: n <= strength ? strengthColor : undefined,
                          }}
                        />
                      ))}
                    </div>
                    <span
                      className="cp-strength-label"
                      style={{ "--sl-color": strengthColor }}
                    >
                      {strengthLabel}
                    </span>
                  </div>
                )}
              </div>
            ))}

            {error && (
              <div className="cp-error">
                <div className="cp-error-dot" />
                {error}
              </div>
            )}

            <button type="submit" className="cp-btn">
              Update password <span className="cp-btn-arrow">→</span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default changePassword;
