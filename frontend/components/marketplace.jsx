import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react';
import Navbar2 from './navbar2.jsx';
import Footer from './footer.jsx';
import Navbar from './navbar.jsx';
import { useContext } from 'react';
import { userContext } from './context.jsx';

function marketplace() {
  const navigate=useNavigate();
  const[category,setCategory]=useState();
  const {collegeName}=useParams();
  const{isLoggedIn}=useContext(userContext)
  

  return (
    <>
    <div class="bgnav"></div>
    {isLoggedIn?(<Navbar2/>):(<Navbar/>)}
    <div className='h-[600px] flex justify-center  items-center flex-wrap gap-20 max-[700px]:content-center max-[700px]:gap-6'>
        <div onClick={()=>navigate(`/college/${collegeName}/services`)} className='p-37 max-[500px]:p-10 max-[800px]:p-19  max-[315px]:p-7 border-[2px] border-[var(--border)] bg-[var(--bg-3)] rounded-[10px] transition-all duration-180 hover:-translate-y-4 hover:scale-110 hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] hover:bg-[var(--services-dim)] 
        hover:border-[var(--services)] cursor-pointer '>Services</div>
        <div onClick={()=>navigate(`/college/${collegeName}/products`)}  className='p-37 max-[800px]:p-19 max-[500px]:p-10 max-[315px]:p-7 border-[2px] border-[var(--border)] bg-[var(--bg-3)] rounded-[10px] transition-all duration-180 hover:-translate-y-4 hover:scale-110 hover:shadow-[0_0_25px_rgba(168,85,247,0.5)]
        hover:bg-[var(--products-dim)] hover:border-[var(--products)] cursor-pointer'>Products</div>
    </div>
    
      
    </>
  )
}

export default marketplace
