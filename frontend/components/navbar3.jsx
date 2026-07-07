import React from 'react'
import axios from 'axios';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

function navbar3() {
  const navigate=useNavigate();
  const[navigation,setNavigation]=useState(false);
  const[user,setuser]=useState();
  useEffect(() => {
    getUser();
    
  
  }, [])
  const getUser=async()=>{
    try {
      const res=await axios.get(`${import.meta.env.RENDER_BACKEND_URL}/users/getuser`,{withCredentials:true})
    
    
      if(res.data.success){
        setNavigation(true)
        setuser(res.data)
      }
      
    } catch (error) {
      console.log(error.response)
      
    }
  }
 
 
 
 
  return (
    <>
    <div className="bgnav" ></div>
    <div className=" sticky  flex justify-between  z-100 items-center  p-0 5% bg-[rgba(7,6,15,0.75)]
     h-[68px] pr-[5%] pl-[5%] backdrop-blur-[20px] border-b-[1px] solid var(--border)">
        <div className=" flex gap-2 font-extrabold text-[27px] font-['Outfit']"><p>Campus</p> <span className='text-[var(--neon)]'>Hub</span> </div>
        <div className='flex gap-4'>
            <div onClick={()=>{navigation?navigate('/home'):navigate('/login')}} className="cursor-pointer py-[7px] px-[14px]  hover:text-[var(--text)] hover:bg-[var(--surface)]   text-[var(--text-muted)] font-['Outfit']  transition-all duration-200 rounded-[8px]">Home</div>
            <div onClick={()=>navigate("/college")} className="cursor-pointer py-[7px] px-[14px]  hover:text-[var(--text)] hover:bg-[var(--surface)] text-[var(--text-muted)] font-['Outfit']  transition-all duration-200 rounded-[8px]">Marketplace</div>
            <div onClick={()=>{navigation?navigate('/sell'):navigate('/login')}} className="cursor-pointer py-[7px] px-[14px]  hover:text-[var(--text)] hover:bg-[var(--surface)]  text-[var(--text-muted)] font-['Outfit']  transition-all duration-200 rounded-[8px]">Sell</div>
            <div onClick={()=>navigate("/about")} className="cursor-pointer py-[7px] px-[14px]  hover:text-[var(--text)] hover:bg-[var(--surface)] text-[var(--text-muted)] font-['Outfit']  transition-all duration-200 rounded-[8px]">About</div>

        </div>

    
   
    </div>
      
    </>
  )
}

export default navbar3
