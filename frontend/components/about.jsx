import React from 'react'

function about() {
  return (
    <>
     <div className='bg-[var(--bg)] py-[90px] py-[5%]'>
      <div className='  flex flex-col justify-center items-center  gap-5 mb-[50px]'>
        <p className=" bg-[rgba(132,85,239,.12)] text-[12px] font-semibold border border-[rgba(132,85,239,0.25)] rounded-[100px] pt-[4px] pb-[4px] pl-[14px] pr-[14px]">Our Story</p>
        <div className='flex flex-col justify-center'>
          <h2 className="text-4xl font-extrabold text-[var(--text)] font-['Space_Grotesk',sans-serif] ">Built for the students, by a student </h2>
          
        </div>
        <div className='text-[var(--text-muted)]  flex flex-col gap-5 justify-center '>
          <p className=' text-[20px] leading-2  text-center'>CampusHub was born by just seeing and experiencing a simple problem of buying and selling on campus,students  face problems</p> 
          <p className=' text-[20px] leading-2  text-center'>on finding the things that they need in their academics and selling what they no longer need. </p>
        </div>
       
       
    </div>
    <div className='flex flex-col  items-center' >
      <div className='flex flex-col w-[50vw] bg-[var(--bg3)] rounded-[8px] items-center p-10 '>
        
          <p className="w-[100px] bg-[rgba(132,85,239,.12)]  text-[12px] font-semibold border border-[rgba(132,85,239,0.25)] rounded-[100px] pt-[4px] pb-[4px] pl-[14px] pr-[14px]">
          Our Mission</p>
          
             <h2 className="text-4xl font-extrabold text-[var(--text)] font-['Space_Grotesk',sans-serif] ">Empowering every  </h2>
           <h2 className="text-4xl font-extrabold text-[var(--text)] font-['Space_Grotesk',sans-serif] ">campus community  </h2>
         

         

        
         
          
          
        
        
          <p className='text-[var(--text-muted)] text-[20px]   text-center'>We believe every college campus is a self-sufficient ecosystem. Students have what others need — textbooks, gadgets, skills, time. CampusHub connects them in a safe, verified environment where trust isn't just promised, it's built into the platform.

Our goal is to make every campus financially smarter — helping students earn from what they no longer need, save on what they're looking for, and build meaningful professional connections before they graduate.</p> 
          
       


        
      </div>

    </div>
      
    </div>
    
      
    </>
  )
}

export default about
