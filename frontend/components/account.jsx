import React from 'react'
import { useContext } from 'react'
import { userContext,accountContext } from './context.jsx'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';




function account() {
  const navigate = useNavigate();
  const {user,setUser,getUser}=useContext(userContext);
  
  const [showPreview, setShowPreview] = useState(false);
  const{accountOpen,setaccountOpen}=useContext(accountContext)
  const handleLogout=async()=>{
    try {
      const res= await axios.post('http://localhost:4000/users/logout',{},
      {withCredentials:true}
      
    )
    
      
    if(res.data.success){
      await setUser(null);
      await getUser();
      navigate('/')
      
        
      }
      
    } catch (error) {
      console.log(error.response)
      
    }

  }
  
  return (
    <>
        <div className=" fixed inset-0 bg-black/30 backdrop-blur-md z-[121]"></div>
        <div className=' fixed top-0 right-0 transtion-all duration-300 backdrop-blur-[20px] z-[123] flex flex-col
        w-[92vw] xs:w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[32vw] xl:w-[25vw]
        max-h-[96vh] overflow-y-auto
        border border-[var(--border)] m-2    gap-4 rounded-[10px]
        [&::-webkit-scrollbar]:w-[4px]
        [&::-webkit-scrollbar-track]:bg-transparent
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-indigo-500/35
        [&::-webkit-scrollbar-thumb:hover]:bg-indigo-400/75'>
            <div className='flex flex-col justify-center  items-center gap-2 '>
                <div className='flex'>
                  <svg onClick={()=>setaccountOpen(!accountOpen)} className='fixed right-2 top-2 cursor-pointer hover:scale-108 transition-all duration-150' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" color="currentColor" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"></path>
                      <path d="M14.9994 15L9 9M9.00064 15L15 9"></path>
                  </svg>
                    <img onClick={()=>setShowPreview(true)} className='cursor-pointer mt-4 border- border-violet-500/30  shadow-[0_0_25px_rgba(168,85,247,0.25)] rounded-full h-[100px] max-[750px]:h-[40px] w-[100px] max-[750px]:w-[40px]' src={user?.data.avatar} alt="No Profile Image" />
                    


                </div>
                <div className='text-blue-600 text-[19px] font-bold text-center px-4'>{user?.data.fullname}</div>
                <div className='text-[var(--text-muted)] text-[15px] text-center px-4 break-all'>{user?.data.username}</div>
                <div className='text-[var(--text-muted)] text-[15px] text-center px-4 break-all'>{user?.data.email}</div>
           
                

                
            </div>
            <span className=' bg-[var(--text-muted)] h-[1px] border border-[var(--bg3)] w-[100%]'></span>
            
            
            <div className='flex flex-col mt-4 gap-4 ml-3 sm:ml-7'>
              <div className="
    flex gap-5 p-3 w-[90%] sm:w-[80%] cursor-pointer
    border border-transparent
    hover:border-white/10
    rounded-[10px]
    transition-colors duration-300 ease-in-out
  " >
              <svg className='hover:scale-120 transition-all duration-200 ease-in-out shrink-0' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="currentColor" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round">
    <path d="M16.4249 4.60509L17.4149 3.6151C18.2351 2.79497 19.5648 2.79497 20.3849 3.6151C21.205 4.43524 21.205 5.76493 20.3849 6.58507L19.3949 7.57506M16.4249 4.60509L9.76558 11.2644C9.25807 11.772 8.89804 12.4078 8.72397 13.1041L8 16L10.8959 15.276C11.5922 15.102 12.228 14.7419 12.7356 14.2344L19.3949 7.57506M16.4249 4.60509L19.3949 7.57506"></path>
    <path d="M18.9999 13.5C18.9999 16.7875 18.9999 18.4312 18.092 19.5376C17.9258 19.7401 17.7401 19.9258 17.5375 20.092C16.4312 21 14.7874 21 11.4999 21H11C7.22876 21 5.34316 21 4.17159 19.8284C3.00003 18.6569 3 16.7712 3 13V12.5C3 9.21252 3 7.56879 3.90794 6.46244C4.07417 6.2599 4.2599 6.07417 4.46244 5.90794C5.56879 5 7.21252 5 10.5 5" stroke-linecap="round"></path>
</svg>
              <div onClick={()=>navigate("/update")} className="font">Update Details</div>
            </div>
           <div className="
    flex gap-5 p-3 w-[90%] sm:w-[80%] cursor-pointer
    border border-transparent
    hover:border-white/10
    rounded-[10px]
    transition-colors duration-300 ease-in-out
  " >
            <svg className='hover:scale-120 transition-all duration-200 ease-in-out shrink-0' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="currentColor" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4.26781 18.8447C4.49269 20.515 5.87613 21.8235 7.55966 21.9009C8.97627 21.966 10.4153 22 12 22C13.5847 22 15.0237 21.966 16.4403 21.9009C18.1239 21.8235 19.5073 20.515 19.7322 18.8447C19.879 17.7547 20 16.6376 20 15.5C20 14.3624 19.879 13.2453 19.7322 12.1553C19.5073 10.485 18.1239 9.17649 16.4403 9.09909C15.0237 9.03397 13.5847 9 12 9C10.4153 9 8.97627 9.03397 7.55966 9.09909C5.87613 9.17649 4.49269 10.485 4.26781 12.1553C4.12105 13.2453 4 14.3624 4 15.5C4 16.6376 4.12105 17.7547 4.26781 18.8447Z"></path>
    <path d="M7.5 9V6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5V9"></path>
    <path d="M12.125 15.5H12M12.25 15.5C12.25 15.6381 12.1381 15.75 12 15.75C11.8619 15.75 11.75 15.6381 11.75 15.5C11.75 15.3619 11.8619 15.25 12 15.25C12.1381 15.25 12.25 15.3619 12.25 15.5Z"></path>
    <path d="M8.125 15.5H8M8.25 15.5C8.25 15.6381 8.13807 15.75 8 15.75C7.86193 15.75 7.75 15.6381 7.75 15.5C7.75 15.3619 7.86193 15.25 8 15.25C8.13807 15.25 8.25 15.3619 8.25 15.5Z"></path>
    <path d="M16.125 15.5H16M16.25 15.5C16.25 15.6381 16.1381 15.75 16 15.75C15.8619 15.75 15.75 15.6381 15.75 15.5C15.75 15.3619 15.8619 15.25 16 15.25C16.1381 15.25 16.25 15.3619 16.25 15.5Z"></path>
</svg>
             
              
              
              <div onClick={()=>navigate('/changepassword')}>Change Password</div>
           </div>
            <div className="
    flex gap-5 p-3 w-[90%] sm:w-[80%] cursor-pointer
    border border-transparent
    hover:border-white/10
    rounded-[10px]
    transition-colors duration-300 ease-in-out
  " >
              <svg className='hover:scale-120 transition-all duration-200 ease-in-out shrink-0' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="currentColor" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 13.6376V10.3624C21 8.71559 21 7.89217 20.6166 7.20744C20.2332 6.52271 19.5317 6.09334 18.1287 5.2346L15.1287 3.39836C13.6056 2.46612 12.8441 2 12 2C11.1559 2 10.3944 2.46612 8.8713 3.39836L5.8713 5.2346C4.46832 6.09334 3.76683 6.52271 3.38341 7.20744C3 7.89217 3 8.71559 3 10.3624V13.6376C3 15.2844 3 16.1078 3.38341 16.7926C3.76683 17.4773 4.46832 17.9067 5.8713 18.7654L8.8713 20.6016C10.3944 21.5339 11.1559 22 12 22C12.8441 22 13.6056 21.5339 15.1287 20.6016L18.1287 18.7654C19.5317 17.9067 20.2332 17.4773 20.6166 16.7926C21 16.1078 21 15.2844 21 13.6376Z"></path>
    <path d="M3.5 7L12 12L20.5 7"></path>
    <path d="M12 12V22"></path>
</svg>
               <div onClick={()=>navigate("/user/products")}>My Products</div> </div>
               <div className="
    flex gap-5 p-3 w-[90%] sm:w-[80%] cursor-pointer
    border border-transparent
    hover:border-white/10
    rounded-[10px]
    transition-colors duration-300 ease-in-out
  " >
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="currentColor" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M8 15C8.91212 16.2144 10.3643 17 12 17C13.6357 17 15.0879 16.2144 16 15"></path>
    <path d="M10 9C10 10.1046 9.10457 11 8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7C9.10457 7 10 7.89543 10 9ZM10 9C10.5602 8.43978 11.1643 8 12 8C12.8357 8 13.4398 8.43978 14 9M21 8H17.7324M6.26756 8H3M14 9C14 10.1046 14.8954 11 16 11C17.1046 11 18 10.1046 18 9C18 7.89543 17.1046 7 16 7C14.8954 7 14 7.89543 14 9Z"></path>
</svg>
               <div onClick={()=>navigate("/changeavatar")}>Change Avatar</div> </div>
               <div className="
    flex gap-5 p-3 w-[90%] sm:w-[80%] cursor-pointer
    border border-transparent
    hover:border-white/10
    rounded-[10px]
    transition-colors duration-300 ease-in-out
  " >
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="currentColor" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 2.99902C4.13281 2.99902 2 7.02846 2 11.999C2 14.0703 2.37034 15.9781 3.37161 17.499C4.63281 19.499 3.99253 21.3324 3 21.999C4.61547 21.999 5.70211 21.4848 6.39239 20.9756C6.88252 20.6141 7.50688 20.4354 8.0984 20.5805C9.20689 20.8524 10.4991 20.999 12 20.999C19.1328 20.999 22 16.9696 22 11.999C22 11.3116 21.9643 10.6422 21.8812 9.99902"></path>
    <path d="M12.1248 11.999H11.9998M16.125 11.999H16M8.125 11.999H8M12.2498 11.999C12.2498 12.1371 12.1379 12.249 11.9998 12.249C11.8618 12.249 11.7498 12.1371 11.7498 11.999C11.7498 11.861 11.8618 11.749 11.9998 11.749C12.1379 11.749 12.2498 11.861 12.2498 11.999ZM16.25 11.999C16.25 12.1371 16.1381 12.249 16 12.249C15.8619 12.249 15.75 12.1371 15.75 11.999C15.75 11.861 15.8619 11.749 16 11.749C16.1381 11.749 16.25 11.861 16.25 11.999ZM8.25 11.999C8.25 12.1371 8.13807 12.249 8 12.249C7.86193 12.249 7.75 12.1371 7.75 11.999C7.75 11.861 7.86193 11.749 8 11.749C8.13807 11.749 8.25 11.861 8.25 11.999Z"></path>
    <path d="M18 2.00098C17.3932 2.59081 15 4.1607 15 5.00098C15 5.84125 17.3932 7.41114 18 8.00098M15.5 5.00098L22 5.00098"></path>
</svg>
               <div onClick={()=>navigate("/bid/incomingbids")}>Incoming Bids</div> </div>
               <div className="
    flex gap-5 p-3 w-[90%] sm:w-[80%] cursor-pointer
    border border-transparent
    hover:border-white/10
    rounded-[10px]
    transition-colors duration-300 ease-in-out
  " >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="currentColor" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21.7109 9.3871C21.8404 9.895 21.9249 10.4215 21.9598 10.9621C22.0134 11.7929 22.0134 12.6533 21.9598 13.4842C21.6856 17.7299 18.3536 21.1118 14.1706 21.3901C12.7435 21.485 11.2536 21.4848 9.8294 21.3901C9.33896 21.3574 8.8044 21.2403 8.34401 21.0505C7.83177 20.8394 7.5756 20.7338 7.44544 20.7498C7.31527 20.7659 7.1264 20.9052 6.74868 21.184C6.08268 21.6755 5.24367 22.0285 3.99943 21.9982C3.37026 21.9829 3.05568 21.9752 2.91484 21.7349C2.77401 21.4946 2.94941 21.1619 3.30021 20.4966C3.78674 19.5739 4.09501 18.5176 3.62791 17.6712C2.82343 16.4623 2.1401 15.0305 2.04024 13.4842C1.98659 12.6533 1.98659 11.7929 2.04024 10.9621C2.31441 6.71638 5.64639 3.33448 9.8294 3.05621C10.2156 3.03051 10.6067 3.01177 11 3"></path>
    <path d="M8.5 15H15.5M8.5 10H12"></path>
    <path d="M22 4.5L14 4.5M22 4.5C22 3.79977 20.0057 2.49153 19.5 2M22 4.5C22 5.20023 20.0057 6.50847 19.5 7"></path>
</svg>
               <div onClick={()=>navigate("/bid/mybids")}>My Bids</div> </div>
               <div className="
    flex gap-5 p-3 w-[90%] sm:w-[80%] cursor-pointer
    border border-transparent
    hover:border-white/10
    rounded-[10px]
    transition-colors duration-300 ease-in-out
  " >
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="currentColor" fill="none" stroke="currentColor" stroke-width="1.5">
    <path d="M14.2644 18.3717C14.5806 17.407 14.7387 16.9247 15.0616 16.593C15.215 16.4354 15.3932 16.3048 15.5887 16.2066C16.0003 16 16.5003 16 17.5002 16C18.5001 16 19.0001 16 19.4116 16.2066C19.6072 16.3048 19.7853 16.4354 19.9388 16.593C20.2617 16.9247 20.4198 17.407 20.736 18.3717L21.0624 19.3675C21.4561 20.5688 21.653 21.1694 21.3587 21.5847C21.0643 22 20.4418 22 19.1966 22H15.8038C14.5586 22 13.936 22 13.6417 21.5847C13.3473 21.1694 13.5442 20.5688 13.938 19.3675L14.2644 18.3717Z"></path>
    <path d="M8.76421 10.3717C9.08041 9.40705 9.23851 8.92471 9.56143 8.59298C9.71485 8.43537 9.89299 8.3048 10.0885 8.20663C10.5001 8 11.0001 8 12 8C12.9999 8 13.4999 8 13.9115 8.20663C14.107 8.3048 14.2851 8.43537 14.4386 8.59298C14.7615 8.92471 14.9196 9.40705 15.2358 10.3717L15.5622 11.3675C15.956 12.5688 16.1528 13.1694 15.8585 13.5847C15.5642 14 14.9416 14 13.6964 14H10.3036C9.05842 14 8.43585 14 8.1415 13.5847C7.84716 13.1694 8.04404 12.5688 8.43779 11.3675L8.76421 10.3717Z"></path>
    <path d="M3.26439 18.3717C3.58059 17.407 3.73869 16.9247 4.06162 16.593C4.21504 16.4354 4.39317 16.3048 4.58872 16.2066C5.00031 16 5.50027 16 6.50018 16C7.5001 16 8.00006 16 8.41165 16.2066C8.6072 16.3048 8.78533 16.4354 8.93875 16.593C9.26167 16.9247 9.41977 17.407 9.73597 18.3717L10.0624 19.3675C10.4561 20.5688 10.653 21.1694 10.3587 21.5847C10.0643 22 9.44176 22 8.19661 22H4.80375C3.5586 22 2.93603 22 2.64169 21.5847C2.34735 21.1694 2.54422 20.5688 2.93797 19.3675L3.26439 18.3717Z"></path>
    <path d="M12 2V4M7.5 3.5L9 5M16.5 3.5L15 5" stroke-linecap="round"></path>
</svg>
               <div onClick={()=>navigate("/buy/incomingbuys")}>Incoming Buys</div> </div>
               <div className="
    flex gap-5 p-3 w-[90%] sm:w-[80%] cursor-pointer
    border border-transparent
    hover:border-white/10
    rounded-[10px]
    transition-colors duration-300 ease-in-out
  " >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="currentColor" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M19 2.5V7M21 4L20.5617 3.4231C19.841 2.47437 19.4806 2 19 2C18.5194 2 18.159 2.47437 17.4383 3.4231L17 4"></path>
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M20 9.87791C20.6667 10.6661 21 11.2926 21 12C21 13.2081 20.0278 14.1803 18.0834 16.1247L16.1247 18.0834C14.1803 20.0278 13.2081 21 12 21C10.7919 21 9.81971 20.0278 7.87531 18.0834L5.9166 16.1247C3.9722 14.1803 3 13.2081 3 12C3 10.7919 3.9722 9.81971 5.9166 7.87531L7.87531 5.9166C9.81971 3.9722 10.7919 3 12 3C12.7074 3 13.3339 3.33333 14.1221 4"></path>
</svg>
               <div onClick={()=>navigate("/buy/mybuys")}>Outgoing Buys</div> </div>
               
            </div>
            <button onClick={handleLogout}
              
              className=" cursor-pointer w-full py-3 text-red-600 font-bold rounded-[10px]
              border border-[rgba(255,255,255,0.12)]
              hover:bg-[rgba(255,255,255,0.05)]
              transition-all duration-200"
            >
              
              Logout
            </button>
            

        </div>
        {showPreview && (
  <div
    className="fixed inset-0 bg-black/80 flex justify-center items-center z-[122]"
    onClick={() => setShowPreview(false)}
  >
    <img
      src={user?.data.avatar}
      alt="Preview"
      className="max-w-[90vw] max-h-[90vh] rounded-lg"
      onClick={(e) => e.stopPropagation()}
      
    />
     <button
      className=" cursor-pointer absolute top-5 left-5 text-white text-3xl z-[122]"
      onClick={() => setShowPreview(false)}
    >
      ✕
    </button>

   
  </div>
)}
        
      
    </>
  )
}

export default account