import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { userContext } from './context.jsx';

function Navbar() {

  const navigate = useNavigate();

  const [navigation, setNavigation] = useState(false);
  const {user, setUser} = useContext(userContext);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    if(user?.success){
      setNavigation(true)
    }
  
  }, [user])
      
  
  

  return (
    
    <>
    
      <div className="bgnav"></div>

      
      <div className="sticky top-0 w-full flex justify-between items-center
      h-[68px] px-[5%]
      bg-[rgba(7,6,15,0.75)]
      backdrop-blur-[20px]
      border-b border-[var(--border)]
      z-[120]">

        
        <div className="flex gap-2 font-extrabold text-[27px] max-[420px]:text-[15px] font-['Outfit']">
          <p >Campus</p>
          <span className='text-[var(--neon)]'>Hub</span>
        </div>

        
        <div className='hidden md:flex gap-4'>

          <div
            onClick={() => {
              navigation ? navigate('/home') : navigate('/login')
            }}
            className="cursor-pointer py-[7px] px-[14px]
            hover:text-[var(--text)]
            hover:bg-[var(--surface)]
            text-[var(--text-muted)]
            rounded-[8px]
            transition-all duration-200"
          >
            Home
          </div>

          <div
            onClick={() => navigate("/college")}
            className="cursor-pointer py-[7px] px-[14px]
            hover:text-[var(--text)]
            hover:bg-[var(--surface)]
            text-[var(--text-muted)]
            rounded-[8px]
            transition-all duration-200"
          >
            Marketplace
          </div>

          <div
            onClick={() => {
              navigation ? navigate('/sell') : navigate('/login')
            }}
            className="cursor-pointer py-[7px] px-[14px]
            hover:text-[var(--text)]
            hover:bg-[var(--surface)]
            text-[var(--text-muted)]
            rounded-[8px]
            transition-all duration-200"
          >
            Sell
          </div>

          <div
            onClick={() => navigate("/about")}
            className="cursor-pointer py-[7px] px-[14px]
            hover:text-[var(--text)]
            hover:bg-[var(--surface)]
            text-[var(--text-muted)]
            rounded-[8px]
            transition-all duration-200"
          >
            About
          </div>

        </div>

       
        <div className='hidden md:flex gap-4'>

          <div
            onClick={() => navigate('/login')}
            className="hover:text-[var(--text)]
            hover:border-[rgba(255,255,255,0.2)]
            hover:bg-[var(--surface)]
            px-[18px] py-2 rounded-[9px]
            text-[14px] font-medium
            text-[var(--text-muted)]
            bg-transparent border border-[var(--border)]
            cursor-pointer transition-all duration-200"
          >
            Login
          </div>

          <div
            onClick={() => navigate('/register')}
            className="px-5 py-2 rounded-[9px]
            text-[14px] font-semibold text-white
            bg-[var(--purple)]
            border border-transparent
            cursor-pointer
            shadow-[0_0_20px_rgba(132,85,239,0.5)]
            transition-all duration-200
            hover:bg-[var(--purple-light)]
            hover:shadow-[0_0_32px_rgba(155,111,245,0.65)]
            hover:-translate-y-[1px]"
          >
            Sign Up
          </div>

        </div>

        
        <button
          className="md:hidden text-white text-[30px] z-[200]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

      </div>

      {/* Background Overlay */}
      {
        menuOpen && (
          <div
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 bg-black/40
            backdrop-blur-[2px]
            z-[100] md:hidden"
          />
        )
      }

      
     <div
  className={`fixed top-0 right-0
  h-screen
  w-full max-w-[260px]
  max-[400px]:w-[100%]
  bg-[rgba(10,10,20,0.96)]
  backdrop-blur-[20px]
  border-l border-[rgba(255,255,255,0.1)]
  z-[150]
  transition-all duration-300
  overflow-x-hidden
  ${menuOpen ? "translate-x-0" : "translate-x-full"}
  md:hidden`}
>
        
        <div className="flex justify-between items-center
        p-5 border-b border-[rgba(255,255,255,0.08)]">

          <div className="flex gap-2 font-bold text-[22px]">
            <p>Campus</p>
            <span className="text-[var(--neon)]">Hub</span>
          </div>

          <button
            onClick={() => setMenuOpen(false)}
            className="text-[26px] text-white"
          >
            ✕
          </button>

        </div>

        
        <div className="flex flex-col p-5 gap-3">

          <div
            onClick={() => {
              navigation ? navigate('/home') : navigate('/login')
              setMenuOpen(false)
            }}
            className="cursor-pointer px-4 py-3 rounded-[10px]
            hover:bg-[rgba(255,255,255,0.06)]
            transition-all duration-200"
          >
            Home
          </div>

          <div
            onClick={() => {
              navigate('/college')
              setMenuOpen(false)
            }}
            className="cursor-pointer px-4 py-3 rounded-[10px]
            hover:bg-[rgba(255,255,255,0.06)]
            transition-all duration-200"
          >
            Marketplace
          </div>

          <div
            onClick={() => {
              navigation ? navigate('/sell') : navigate('/login')
              setMenuOpen(false)
            }}
            className="cursor-pointer px-4 py-3 rounded-[10px]
            hover:bg-[rgba(255,255,255,0.06)]
            transition-all duration-200"
          >
            Sell
          </div>

          <div
            onClick={() => {
              navigate('/about')
              setMenuOpen(false)
            }}
            className="cursor-pointer px-4 py-3 rounded-[10px]
            hover:bg-[rgba(255,255,255,0.06)]
            transition-all duration-200"
          >
            About
          </div>

          
          <div className="flex flex-col gap-3 mt-5">

            <button
              onClick={() => {
                navigate('/login')
                setMenuOpen(false)
              }}
              className="w-full py-3 rounded-[10px]
              border border-[rgba(255,255,255,0.12)]
              hover:bg-[rgba(255,255,255,0.05)]
              transition-all duration-200"
            >
              Login
            </button>

            <button
              onClick={() => {
                navigate('/register')
                setMenuOpen(false)
              }}
              className="w-full py-3 rounded-[10px]
              bg-[var(--purple)]
              shadow-[0_0_20px_rgba(132,85,239,0.5)]
              hover:scale-[1.02]
              transition-all duration-200"
            >
              Sign Up
            </button>

          </div>

        </div>

      </div>
    </>
    
  )
}

export default Navbar