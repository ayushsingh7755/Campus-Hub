import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from "axios"
import { useContext } from 'react';
import { userContext } from './context.jsx';

function login() {
  
  const navigate=useNavigate();
  const[errormsg,seterrormsg]=useState("");
  const{ getUser}=useContext(userContext);
  const[formdata,setformdata]=useState({
    fullname:"",
    username:"",
    email:"",
    password:"",



  })
  const handleChange=(e)=>{
    setformdata({...formdata,[e.target.name]:e.target.value})


  }
  const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
      const res=await axios.post('http://localhost:4000/users/login',formdata,{ withCredentials: true})
      
      
      
      if(res.data.success){
        seterrormsg("");
        await getUser();
        navigate('/home')

      }
      
    } catch (error) {
      console.log(error.response)
      
      seterrormsg(error.response.data.message);  
      
      
      
    }
    
    
  }
  
  return (
    <>
    <div className="min-h-screen bg-black relative overflow-hidden">

 
  <div className="absolute inset-0 
      bg-gradient-to-br from-[#0a0a0f] via-[#1a0b2e] to-black">
  </div>

  
  <div className="absolute inset-0 
      bg-[radial-gradient(circle_at_30%_30%,rgba(96,23,197,0.4),transparent_60%)]">
  </div>

  {/* main code above for bg color only */}
  <div className="relative flex gap-34 justify-center h-screen items-center z-1">

    <div className=' rounded-md m-5 bg-[rgb(38,38,38)] w-[380px] h-auto hover:scale-102 transition duration-400'>
        <div className='mb-4 ml-3 '>< p className=' text-amber-50 font-bold text-4xl mb-0.3 mt-9'>Access Node</p> 
        <p className='text-blue-200 '>Verify your identity to enter the platform</p>
        </div>

         <form onSubmit={handleSubmit} className='flex flex-col gap-5 mt-15 py-9 bg-[var(--surface)]' action="post">
            
               <input className=' hover:scale-110 transition duration-300  h-11 ml-3 bg-[var(--bg-input)] text-amber-50 w-[350px] mb-6 h-10 rounded-md p-4' type="text" required={true} name="username" value={formdata.username} onChange={handleChange} placeholder='Username or email'/>
        
        <input className='hover:scale-110 transition duration-300 ml-3  mb-0 h-11 bg-[var(--bg-input)] text-amber-50 w-[350px] h-10  rounded-md p-4' type="password" name="password" required={true} value={formdata.password} onChange={handleChange} placeholder='Password' />  
        {errormsg&&(<p className='text-red-600 text-center'>{errormsg}</p>)}
            
            


        
        <button type="submit" className='ml-3  shadow-[0_0_15px_rgba(186,158,255,0.3)] rounded-[4px] bg-[#8455EF] text-[#390061] w-300px mt-1 mb-0  h-13  w-[350px]  border-2  border-amber-50 cursor-pointer text-[rgb(57,0,140)] font-bold cursor-pointer hover:bg-[#9B6FF5] hover:shadow-[0_0_28px_rgba(186,158,255,0.55)] hover:-translate-y-0.5
    active:bg-[#7040D9]  active:translate-y-0 transition-all duration-200 ease-in-out '>Authorize Access</button>
        

    </form>
    
    </div>
    <div className='h-60 w-[380px]'>
      <h3 className='font-bold text-white text-4xl'>New to the store</h3>
      <p className='text-white ml-1 mt-2'>Join the chain where the trusted products can be buyed and selled in the easiest way ever possible</p>
      <button onClick={()=>navigate('/register')}  className="mt-6 ml-1 p-1 w-full h-[60px] rounded-[4px] bg-[#1A1919] text-[#8455EF] font-['Space_Grotesk'] font-bold text-lg tracking-widest border border-[rgba(120,117,117,0.3)] transition-all duration-200 ease-in-out cursor-pointer
  hover:bg-[#251f38] hover:border-[rgba(132,85,239,0.6)]
  hover:shadow-[0_0_20px_rgba(132,85,239,0.25)] hover:-translate-y-0.5
  active:translate-y-0 active:shadow-none">Initiate Registration</button>
    </div>
  </div>

</div>
        
   
    
    
        
    
    </>
  )
}

export default login
