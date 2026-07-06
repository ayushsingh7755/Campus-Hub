import React from 'react'
import axios from 'axios';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

function footer() {
  const navigate=useNavigate();
  const[navigation,setNavigation]=useState(false);
  const[user,setuser]=useState();
 
 
 
 
 
  return (
    <>
    <div className="bgnav" ></div>
    <div className=" py-9 flex justify-between  z-100 items-center  p-0 5% bg-[rgba(7,6,15,0.75)]
     h-[68px] pr-[5%] pl-[5%] backdrop-blur-[20px] border-b-[1px] solid var(--border) max-[750px]:justify-center max-[750px]:py-[4px] max-[750px]:w-full">
        <div className=" flex gap-2 font-extrabold text-[24px] max-[750px]:text-[14px] font-['Outfit']"><p>Campus</p> <span className='text-[var(--neon)]'>Hub</span> </div>
        <div className='flex gap-4 max-[750px]:gap-1'>
            <div onClick={()=>navigate('/about')} className="cursor-pointer py-[7px] px-[14px] max-[750px]:py-[4px] max-[750px]:px-[9px]  hover:text-[var(--text)] hover:bg-[var(--surface)]   text-[var(--text-muted)] font-['Outfit']  transition-all duration-200 rounded-[8px]">About</div>
            
            <div onClick={()=>{navigation?navigate('/sell'):navigate('/login')}} className="cursor-pointer py-[7px] px-[14px] max-[750px]:py-[4px] max-[750px]:px-[9px]  hover:text-[var(--text)] hover:bg-[var(--surface)]  text-[var(--text-muted)] font-['Outfit']  transition-all duration-200 rounded-[8px]"></div>
        </div>

    
    <div className='flex gap-4 max-[750px]:py-[4px] max-[750px]:gap-[4px] '>
        <a href="https://github.com/ayushsingh7755/ayushsingh7755" className=" hover:text-[var(--text)] hover:border-[rgba(255,255,255,0.2)]  px-[18px] py-2 rounded-[9px] text-[14px] font-medium text-[var(--text-muted)] bg-transparent  cursor-pointer transition-[color,border-color,background] duration-200 font-['Inter',sans-serif]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="currentColor" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6.51734 17.1132C6.91177 17.6905 8.10883 18.9228 9.74168 19.2333M9.86428 22C8.83582 21.8306 2 19.6057 2 12.0926C2 5.06329 8.0019 2 12.0008 2C15.9996 2 22 5.06329 22 12.0926C22 19.6057 15.1642 21.8306 14.1357 22C14.1357 22 13.9267 18.5826 14.0487 17.9969C14.1706 17.4113 13.7552 16.4688 13.7552 16.4688C14.7262 16.1055 16.2043 15.5847 16.7001 14.1874C17.0848 13.1032 17.3268 11.5288 16.2508 10.0489C16.2508 10.0489 16.5318 7.65809 15.9996 7.56548C15.4675 7.47287 13.8998 8.51192 13.8998 8.51192C13.4432 8.38248 12.4243 8.13476 12.0018 8.17939C11.5792 8.13476 10.5568 8.38248 10.1002 8.51192C10.1002 8.51192 8.53249 7.47287 8.00036 7.56548C7.46823 7.65809 7.74917 10.0489 7.74917 10.0489C6.67316 11.5288 6.91516 13.1032 7.2999 14.1874C7.79575 15.5847 9.27384 16.1055 10.2448 16.4688C10.2448 16.4688 9.82944 17.4113 9.95135 17.9969C10.0733 18.5826 9.86428 22 9.86428 22Z"></path>
</svg>
        </a>
        <a href="https://www.linkedin.com/in/ayush-singh-b70525314/" className=" px-[12px]  max-[750px]:px-[9px]  max-[750px]:flex  max-[750px]:items-center rounded-[9px] text-[24px] max-[750px]:text-[18px]   font-semibold text-white bg-blue-600 border border-transparent cursor-pointer shadow-[0_0_20px_rgba(132,85,239,0.5)] transition-[background,box-shadow,transform] duration-200 font-['Inter',sans-serif] hover:bg-[var(--purple-light)] hover:shadow-[0_0_32px_rgba(155,111,245,0.65)] hover:-translate-y-[1px]">in</a>
    </div>
   
    </div>
   
    </>
  )
}

export default footer
