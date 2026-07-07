import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar2 from './navbar2';

function userProducts() {
    const[cardData,setCardData]=useState([]);
    const[showOwner,setshowOwner]=useState(-1);
    const[isData,setisData]=useState(0);
    
    useEffect(() => {
        setCards();
    
    }, [])
    const setCards=async()=>{
        try {
            const serviceData=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/product/getUserProducts`,{withCredentials:true})
            console.log(serviceData)
            setCardData(serviceData.data)    
           

            
        } catch (error) {
            console.log(error.response)
             if(error.response.status >=400){
                setisData(1);
            }
            
        }
    }
    
    

  return (
    <>
    <Navbar2/>
     {isData==0 &&(
        <div  className='flex gap-4 m-5 flex-wrap mt-8 flex-wrap max-[800px]:gap-2 max-[670px]:justify-center'>
         {cardData.map((card,index)=>(
       
            <div key={index}  className='flex flex-col bg-[var(--bg-card)] border-[2px] z-10 w-[280px] max-[800px]:w-[200px] max-[480px]:w-[150px]   border-[var(--purple)] rounded-[16px] transition-all duration-180 hover:-translate-y-2.5 hover:scale-107 hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] hover:border-[var(--purple-light)] hover:bg-[var(--services-dim)]'>
                <div className=''><img className='w-[280px] h-[187px] rounded-t-[16px] max-[800px]:w-[200px] max-[480px]:w-[150px]  max-[800px]:h-[110px] max-[480px]:h-[80px] ' src={card.productImage} alt="" /></div>
            
                <div className='flex justify-between items-center'>
                    <h3 className="text-[rgb(244,244,245)] ml-2 text-[16.5px] max-[700px]:text-[12px] max-[480px]:text-[9px] font-bold mb-[5px] max-[800px]:text-[12px] max-[800px]:mt-[3px]   font-['Outfit']">{card.productName}</h3>
                <p className="text-[rgb(139,92,246)] text-[16px] font-extrabold tracking-[-0.5px] font-['Outfit'] mr-2 max-[800px]:text-[12px] max-[480px]:text-[9px]  ">Rs {card.productPrice}</p>
                </div>
                <p className='text-[14px] ml-2 text-[var(--text-muted)] max-[800px]:text-[10px] max-[480px]:text-[7px]  '>{card.productDescription}</p>
                <div className='flex justify-between mb-3 mt-2 items-center'>
                     <p onClick={()=>setshowOwner(index)} className=" cursor-pointer ml-2 font-['Outfit']  "><svg className='max-[800px]:w-[21px] max-[480px]:h-[21px]'  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="33" height="33" color="currentColor" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 17.93 17.93 22.75 12 22.75ZM12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 6.9 17.1 2.75 12 2.75ZM9.52059 11.8127C8.74159 11.1254 8.25 10.1197 8.25 9C8.25 6.93 9.93 5.25 12 5.25C14.07 5.25 15.75 6.93 15.75 9C15.75 10.1197 15.2584 11.1254 14.4794 11.8127C16.4121 12.7404 17.75 14.7172 17.75 17C17.75 17.41 17.41 17.75 17 17.75C16.59 17.75 16.25 17.41 16.25 17C16.25 14.66 14.34 12.75 12 12.75C9.66 12.75 7.75 14.66 7.75 17C7.75 17.41 7.41 17.75 7 17.75C6.59 17.75 6.25 17.41 6.25 17C6.25 14.7172 7.58791 12.7404 9.52059 11.8127ZM12 11.25C13.24 11.25 14.25 10.24 14.25 9C14.25 7.76 13.24 6.75 12 6.75C10.76 6.75 9.75 7.76 9.75 9C9.75 10.24 10.76 11.25 12 11.25Z" fill="currentColor" />
</svg></p>
                     <button  className=" font-['Outfit'] mr-2 px-[20px] max-[800px]:px-[14px] max-[480px]:text-[12px] max-[480px]:px-[10px] py-3 max-[800px]:py-1 max-[480px]:py-[3px] border border-[var(--services)] rounded-[19px] bg-[var(--bg2)] z-20 cursor-pointer
                     transition-all duration-150 hover:bg-[var(--purple)] font-bold hover:scale-y-115 ">Get</button>

                </div>
               

        
            </div>
       

    ))}
   
     </div>
    

    
     )}
     {
        isData==1 && (
            <h4 className='flex justify-center items-center'> No Products Uploaded</h4>
        )
     }
      
    </>
  )
}

export default userProducts
