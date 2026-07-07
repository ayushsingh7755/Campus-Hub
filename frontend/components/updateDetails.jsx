import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function updateDetails() {
  const navigate = useNavigate();

  const [formdata, setformdata] = useState({
    fullname: "",
    username: "",
    email: "",
  });

  const handleChange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
     

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/users/updatedetails`,
         
        formdata,
        { withCredentials:true,
            }
       

      );

      if (res.data.success) {
        navigate("/home");
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@400;500;700&display=swap');

        .ud-root {
          min-height: 100vh;
          background: #050509;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Inter', sans-serif;
          overflow: hidden;
          position: relative;
        }

        /* Background grid */
        .ud-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(108,63,232,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(108,63,232,0.07) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
        }

        /* Ambient blobs */
        .ud-blob-1 {
          position: absolute;
          width: 480px;
          height: 480px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(108,63,232,0.25) 0%, transparent 70%);
          top: -100px;
          left: -100px;
          filter: blur(40px);
          animation: blobFloat 8s ease-in-out infinite alternate;
        }
        .ud-blob-2 {
          position: absolute;
          width: 360px;
          height: 360px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,245,212,0.15) 0%, transparent 70%);
          bottom: -80px;
          right: -60px;
          filter: blur(50px);
          animation: blobFloat 10s ease-in-out infinite alternate-reverse;
        }

        @keyframes blobFloat {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(30px, 20px) scale(1.08); }
        }

        /* Rotating ring */
        .ud-ring {
          position: absolute;
          width: 460px;
          height: 460px;
          border-radius: 50%;
          border: 1px solid transparent;
          background: linear-gradient(#050509, #050509) padding-box,
                      conic-gradient(from 0deg, #6C3FE8, #00F5D4, transparent 60%, #6C3FE8) border-box;
          animation: ringRotate 6s linear infinite;
          opacity: 0.5;
          pointer-events: none;
        }
        @keyframes ringRotate {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        /* Card */
        .ud-card {
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

        /* Watermark */
        .ud-watermark {
          position: absolute;
          top: 12px;
          right: 20px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 72px;
          font-weight: 700;
          color: rgba(108,63,232,0.06);
          letter-spacing: -2px;
          user-select: none;
          pointer-events: none;
          line-height: 1;
        }

        /* Header */
        .ud-eyebrow {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 10px;
        }
        .ud-eyebrow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #00F5D4;
          box-shadow: 0 0 8px #00F5D4;
        }
        .ud-eyebrow-text {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 2.5px;
          color: #00F5D4;
          text-transform: uppercase;
        }

        .ud-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 30px;
          font-weight: 700;
          color: #F0ECFF;
          line-height: 1.15;
          letter-spacing: -0.5px;
          margin-bottom: 36px;
        }
        .ud-title span {
          color: #6C3FE8;
        }

        /* Divider */
        .ud-divider {
          height: 1px;
          background: linear-gradient(90deg, rgba(108,63,232,0.5), transparent);
          margin-bottom: 32px;
          margin-top: -20px;
        }

        /* Field */
        .ud-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 20px;
        }
        .ud-label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 1.5px;
          color: #9B8EC4;
          text-transform: uppercase;
        }
        .ud-input-wrap {
          position: relative;
        }
        .ud-input-bar {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          border-radius: 2px 0 0 2px;
          background: rgba(108,63,232,0.4);
          transition: background 0.3s, box-shadow 0.3s;
        }
        .ud-input {
          width: 100%;
          box-sizing: border-box;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(108,63,232,0.2);
          border-left: none;
          border-radius: 0 8px 8px 0;
          padding: 12px 16px;
          color: #F0ECFF;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 400;
          outline: none;
          transition: border-color 0.25s, background 0.25s;
          caret-color: #00F5D4;
        }
        .ud-input::placeholder {
          color: rgba(155,142,196,0.35);
        }
        .ud-input:focus {
          background: rgba(108,63,232,0.07);
          border-color: rgba(108,63,232,0.5);
        }
        .ud-input:focus + .ud-focus-bar,
        .ud-input-wrap:focus-within .ud-input-bar {
          background: linear-gradient(180deg, #6C3FE8, #00F5D4);
          box-shadow: 0 0 12px rgba(0,245,212,0.4);
        }

        /* Button */
        .ud-btn {
          position: relative;
          width: 100%;
          margin-top: 12px;
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
        .ud-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0,245,212,0.15), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .ud-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(108,63,232,0.55);
        }
        .ud-btn:hover::before {
          opacity: 1;
        }
        .ud-btn:active {
          transform: translateY(0);
          box-shadow: 0 4px 16px rgba(108,63,232,0.3);
        }
        .ud-btn-arrow {
          display: inline-block;
          margin-left: 8px;
          transition: transform 0.2s;
        }
        .ud-btn:hover .ud-btn-arrow {
          transform: translateX(4px);
        }
      `}</style>

      <div className="ud-root">
        <div className="ud-grid" />
        <div className="ud-blob-1" />
        <div className="ud-blob-2" />
        <div className="ud-ring" />

        <div className="ud-card">
          <div className="ud-watermark">EDIT</div>

          <div className="ud-eyebrow">
            <div className="ud-eyebrow-dot" />
            <span className="ud-eyebrow-text">Account</span>
          </div>

          <h1 className="ud-title">
            Update your<br />
            <span>details</span>
          </h1>

          <div className="ud-divider" />

          <form onSubmit={handleSubmit}>
            <div className="ud-field">
              <label className="ud-label">Full name</label>
              <div className="ud-input-wrap">
                <div className="ud-input-bar" />
                <input
                  className="ud-input"
                  type="text"
                  name="fullname"
                  required
                  value={formdata.fullname}
                  onChange={handleChange}
                  placeholder="Jane Doe"
                />
              </div>
            </div>

            <div className="ud-field">
              <label className="ud-label">Email</label>
              <div className="ud-input-wrap">
                <div className="ud-input-bar" />
                <input
                  className="ud-input"
                  type="email"
                  name="email"
                  required
                  value={formdata.email}
                  onChange={handleChange}
                  placeholder="jane@example.com"
                />
              </div>
            </div>

            <div className="ud-field">
              <label className="ud-label">Username</label>
              <div className="ud-input-wrap">
                <div className="ud-input-bar" />
                <input
                  className="ud-input"
                  type="text"
                  name="username"
                  required
                  value={formdata.username}
                  onChange={handleChange}
                  placeholder="@janedoe"
                />
              </div>
            </div>

            <button type="submit" className="ud-btn">
              Save changes <span className="ud-btn-arrow">→</span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default updateDetails;
