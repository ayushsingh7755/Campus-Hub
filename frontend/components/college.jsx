import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar2 from "./navbar2";
import Navbar from "./navbar.jsx";
import Footer from "./footer";
import { useContext } from 'react';
import { userContext } from './context.jsx';

function college() {
  const [colleges, setCollege] = useState([
    "Maharaja Agrasen Institute of Technology (MAIT)",
    "Maharaja Surajmal Institute of Technology (MSIT)",
    "Bharati Vidyapeeth College of Engineering (BVCOE)",
    "University School of Information, Communication and Technology (USICT)",
    "University School of Automation and Robotics (USAR)",
    "Guru Tegh Bahadur Institute of Technology (GTBIT)",
    "HMR Institute of Technology and Management",
    "Delhi Technical Campus (DTC)",
    "JIMS Engineering Management Technical Campus",
    "Vivekananda Institute of Professional Studies (VIPS)",
    "Dr. Akhilesh Das Gupta Institute of Technology (ADGITM)",
    "Northern India Engineering College (NIEC)",
    "Chandigarh School of Business",
    "Ambedkar Institute of Advanced Communication Technologies and Research",
    "BM Institute of Engineering and Technology",
    "Gitarattan International Business School",
    "Trinity Institute of Innovations in Professional Studies",
    "KCC Institute of Technology and Management",
    "Lingaya’s Lalita Devi Institute of Management and Sciences",
    "Institute of Information Technology and Management (IITM)",
    "Rukmini Devi Institute of Advanced Studies",
    "Fairfield Institute of Management and Technology",
    "Tecnia Institute of Advanced Studies",
    "Jagannath International Management School",
    "Kasturi Ram College of Higher Education",
    "Delhi Institute of Advanced Studies",
    "Institute of Innovation in Technology and Management",
    "Army Institute of Management and Technology",
    "Banarsidas Chandiwala Institute of Information Technology",
    "Ideal Institute of Management and Technology",
  ]);
  const [collegeName, setcollegeName] = useState();
  const navigate = useNavigate();
  const handleClick=async()=>{
    navigate(`/college/${collegeName}`)
  }
  const {isLoggedIn}=useContext(userContext);
  return (
    <>
   {isLoggedIn?(<Navbar2/>):(<Navbar/>)}
      <div className="w-full flex flex-col gap-6 justify-center items-center min-h-screen bg-[#0f0f1a] px-6">
         
        <div className="w-full max-w-3xl">
         
          <label className="block text-5xl max-[700px]:text-3xl font-bold  mb-10 tracking-wide text-[rgb(139,92,246)]   tracking-[-0.5px] font-['Outfit']">
            Select Your College
          </label>

          <select
            onChange={(e) => setcollegeName(e.target.value)}
            className="
        w-full
        bg-[#181825]
        text-white
        text-2xl
        max-[700px]:text-[14px]
        px-8
        py-6
        max-[700px]:px-3
        max-[700px]:py-1
        rounded-3xl
        border
        border-[#2f2f45]
        outline-none
        shadow-[0_0_30px_rgba(132,85,239,0.25)]
        transition-all
        duration-300
        hover:border-violet-500
        hover:shadow-[0_0_40px_rgba(132,85,239,0.45)]
        focus:border-violet-500
        focus:shadow-[0_0_50px_rgba(132,85,239,0.55)]
        cursor-pointer
        
      "
          >
            <option value="" >Choose College</option>

            {colleges.map((college, index) => (
              <option value={college} key={index}>
                {college}
              </option>
            ))}
          </select>
         
        </div>
         <button
         onClick={handleClick} className="font-['Outfit'] text-[20px] max-[420px]: text-[15px] font-semibold text-[#0e0f11] bg-purple-600 rounded-[10px] px-[24px] py-[8px] max-[420px]:px-[16px] max-[420px]:py-[4px]  cursor-pointer flex items-center gap-2 tracking-[-0.01em] transition-all duration-200 hover:opacity-90 active:scale-95">
            Next
            <svg
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
      </div>
      <Footer/>
    </>
  );
}

export default college;
