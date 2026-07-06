import React from 'react'
import { useNavigate } from 'react-router-dom'

function login2() {
 const navigate=useNavigate();
  return (
    <>
    <div className=" my-[6vh] max-w-[700px] max-[750px]:w-[90vw] max-[750px]:my-[2vh] mx-auto bg-[var(--surface)] border border-[rgba(132,85,239,0.3)] rounded-[var(--radius-xl)] p-[64px_48px] relative overflow-hidden">
    <div className="inline-block px-[14px] py-1 rounded-[100px] bg-[rgba(132,85,239,0.12)] border border-[rgba(132,85,239,0.25)] text-[12px] font-semibold text-[var(--neon)] tracking-[0.08em] uppercase mb-4">Get started today</div>
    <h2 className="text-[clamp(28px,3vw,40px)] font-bold tracking-[-0.025em] text-[var(--text)] mb-[14px] max-[750px]:mb-[10px] max-[750px]:text-2xl">Join Your Campus Marketplace Today</h2>
    <p className="text-[16px] text-[var(--text-muted)] mb-9 leading-[1.6]"></p>
    <div className="flex gap-[14px] justify-center flex-wrap">
      <button onClick={()=>navigate('/register')} className="px-7 py-[13px] hover:bg-[var(--purple-light)] hover:shadow-[0_0_42px_rgba(155,111,245,0.7)] hover:-translate-y-[2px] rounded-[var(--radius)] text-[15px] font-semibold text-white bg-[var(--purple)] border-none cursor-pointer shadow-[0_0_28px_rgba(132,85,239,0.55)] transition-all duration-200 font-['Inter']">Sign Up Free →</button>
      <button onClick={()=>navigate('/college')} className=" hover:bg-[rgba(132,85,239,0.2)] hover:border-[rgba(132,85,239,0.6)] hover:-translate-y-[2px] px-7 py-[13px] rounded-[var(--radius)] text-[15px] font-semibold text-[var(--neon)] bg-[rgba(132,85,239,0.1)] border border-[rgba(132,85,239,0.35)] cursor-pointer transition-all duration-200 font-['Inter']">Explore Listings</button>
    </div>
  </div>
      
    </>
  )
}

export default login2
