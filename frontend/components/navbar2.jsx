import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { userContext,accountContext } from './context.jsx';
import Account from './account.jsx';


function Navbar2() {

  const navigate = useNavigate();

  const [navigation, setNavigation] = useState(false);
  const {user, setUser} = useContext(userContext);
  const[accountOpen,setaccountOpen]=useState(false);
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
          <p>Campus</p>
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
            
            className="hover:text-[var(--text)]
            hover:border-[rgba(255,255,255,0.2)]
            hover:bg-[var(--surface)]
            px-[18px] py-2 rounded-[9px]
            text-[14px] font-medium
            text-[var(--text-muted)]
            bg-transparent 
            cursor-pointer transition-all duration-300"
          >
           <img className='cursor-pointer border border-violet-500/30  shadow-[0_0_25px_rgba(168,85,247,0.25)] h-[40px] w-[40px] rounded-full ' onClick={()=>setaccountOpen(!accountOpen)} src={user?.data.avatar} alt="" />
             
          </div>

         

        </div>

        
        <div className='md:hidden flex gap-3 items-center justify-center'>
          <img className='md:hidden cursor-pointer border border-violet-500/30  shadow-[0_0_25px_rgba(168,85,247,0.25)] h-[32px] w-[32px] rounded-full' onClick={()=>setaccountOpen(!accountOpen)} src={user?.data.avatar} alt="" />

          <button
          className="md:hidden text-white text-[30px] z-[200]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
        

        </div>

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

           

          </div>

        </div>

      </div>
      <accountContext.Provider value={{accountOpen,setaccountOpen}}>
        {
        accountOpen && (
          <>
          
          
           <Account  />
           


          </>
         
        )
      }
      </accountContext.Provider>
    </>
    
  )
}

export default Navbar2