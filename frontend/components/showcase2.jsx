import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const showcase2 = () => {
    const navigate=useNavigate();
    const handleClick=async(e)=>{
      try {
        const res=await axios.get(`${import.meta.env.RENDER_BACKEND_URL}/users/getuser`,
          {withCredentials:true})
        
        if(res.data.success===true){
          navigate('/sell')

        }else{
          navigate('/login')

        }
        
      } catch (error) {
        
        if(error.response.data.success===false){
          navigate("/login")
        }
        
      }
      
        
        
}

 

  return (
    <>
    
    <div className="bgnav"></div>
    <div className='pl-[100px] flex  items-center min-h-[92vh] justify-between max-[750px]:justify-center 
    max-[750px]:pl-0 max-[750px]:w-full max-[750px]:min-h-[80vh]
    '>
        <div className='flex flex-col'>
        <h1 className='font-[700] max-[750px]:text-4xl font-bold text-6xl mb-[20px] text-[var(--text)] text-[var(--text)]'>Your Campus
            <br />
            <span className='bg-gradient-to-r from-[#C4A2FF] to-[#7EB8FF] bg-clip-text text-transparent'>Marketplace</span>

        </h1>
        
        <p>Buy, Sell, and Connect with Students Around You
            <br />
                      — all within your trusted college community 

        </p>
         <div className='flex mt-7 gap-10 max-[750px]:gap-4 max-[750px]:mt-5 max-[400px]:flex-col  '>
            <button onClick={()=>navigate('/college')} className="py-[13px] px-[28px] rounded-[var(--radius)] text-[15px] font-semibold text-white bg-[var(--purple)] border-none cursor-pointer shadow-[0_0_28px_rgba(132,85,239,0.55)] transition-[background,box-shadow,transform] duration-200 font-['Inter']
            hover:bg-[#9B6FF5] 
       hover:shadow-[0_0_35px_rgba(132,85,239,0.7)] 
       hover:-translate-y-0.5">Start Exploring</button>
            <button onClick={handleClick} class="py-[13px] px-[28px] rounded-[var(--radius)] 
       text-[15px] font-semibold 
       text-[var(--neon)] 
       bg-[rgba(132,85,239,0.1)] 
       border border-[rgba(132,85,239,0.35)] 
       cursor-pointer 
       transition-[background,border-color,transform] duration-200 
       hover:bg-[rgba(132,85,239,0.2)] 
       hover:border-[rgba(132,85,239,0.6)] 
       hover:-translate-y-0.5 
       font-['Inter']">Sell Your Item</button>

         </div>
        

    </div>

    
    

    </div>
      
    </>
  )
}

export default showcase2
