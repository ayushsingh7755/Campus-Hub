import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar2 from './navbar2';
import { useNavigate,useLocation } from 'react-router-dom';
import Navbar from './navbar.jsx';
import { useContext } from 'react';
import { userContext } from './context.jsx';

function services() {
    const navigate=useNavigate();
    const location=useLocation();
    const[cardData,setCardData]=useState([]);
    const[showOwner,setshowOwner]=useState(-1);
    const[iszeroProduct,setzeroProduct]=useState(false)
    const{collegeName}=useParams();
    useEffect(() => {
        setCards();
    
    }, [collegeName])
    const setCards=async()=>{
        try {
            const serviceData=await axios.get(`http://localhost:4000/product/getProducts/${collegeName}`,{withCredentials:true})
        
            setCardData(serviceData.data)
            
        } catch (error) {
            console.log(error.response)
            if(error.response.data.message === "No services found"){
                setzeroProduct(true);
            }
            
            
        }
         

    }
     const {isLoggedIn}=useContext(userContext);
    
    

  return (
    <>
    {isLoggedIn?(<Navbar2/>):(<Navbar/>)}
    {iszeroProduct?(<div className='flex items-center justify-center'>No Products Registered for this college</div> ):
    ( <>
    <div  className='flex gap-4 m-5 flex-wrap mt-8 flex-wrap max-[800px]:gap-2 max-[670px]:justify-center'>
         {cardData.map((card,index)=>(
       
            <div key={index}  className='flex flex-col bg-[var(--bg-card)] border-[2px] z-10 w-[280px] max-[800px]:w-[200px] max-[480px]:w-[150px]   border-[var(--purple)] rounded-[16px] transition-all duration-180 hover:-translate-y-2.5 hover:scale-107 hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] hover:border-[var(--purple-light)] hover:bg-[var(--services-dim)]'>
                <div className=''><img className='w-[280px] h-[187px] rounded-t-[16px] max-[800px]:w-[200px] max-[480px]:w-[150px]  max-[800px]:h-[110px] max-[480px]:h-[80px] ' src={card.productImage[0]} alt="" /></div>
            
                <div className='flex justify-between items-center'>
                    <h3 className="text-[rgb(244,244,245)] ml-2 text-[16.5px] max-[700px]:text-[12px] max-[480px]:text-[9px] font-bold mb-[5px] max-[800px]:text-[12px] max-[800px]:mt-[3px]   font-['Outfit']">{card.productName}</h3>
                <p className="text-[rgb(139,92,246)] text-[16px] font-extrabold tracking-[-0.5px] font-['Outfit'] mr-2 max-[800px]:text-[12px] max-[480px]:text-[9px]  ">Rs {card.productPrice}</p>
                </div>
                <p className='text-[14px] ml-2 text-[var(--text-muted)] max-[800px]:text-[10px] max-[480px]:text-[7px]  '>{card.productDescription}</p>
                <div className='flex justify-between mb-3 mt-2 items-center'>
                     <p onClick={()=>setshowOwner(index)} className=" cursor-pointer ml-2 font-['Outfit']  "> <img className="h-[30px] w-[30px] rounded-full" src={card.productOwner.avatar} alt="" /></p>
                     <button onClick={()=>navigate(`${location.pathname}/${card._id}`)}  className=" font-['Outfit'] mr-2 px-[20px] max-[800px]:px-[14px] max-[480px]:text-[12px] max-[480px]:px-[10px] py-3 max-[800px]:py-1 max-[480px]:py-[3px] border border-[var(--services)] rounded-[19px] bg-[var(--bg2)] z-20 cursor-pointer
                     transition-all duration-150 hover:bg-[var(--purple)] font-bold hover:scale-y-115 ">Get</button>

                </div>
               

        
            </div>
       

    ))}
   
     </div>
     {
        showOwner >=0 && (
        <div className=' fixed flex backdrop-blur-md bg-black/60 inset-0 z-50 items-center justify-center '>
            <div className='bg-zinc-900 mx-4 p-6  w-[50vw] max-[750px]:w-[260px] items-center rounded-2xl border border-purple-600 flex max-[750px]:flex-col justify-between'>

                <div className='max-[750px]:flex max-[750px]:justify-end max-[750px]:flex '> <button onClick={()=>setshowOwner(-1)} className='cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="currentColor" fill="none">
    <path d="M11.998 1.75C14.2157 1.75 15.9545 1.74854 17.3095 1.93066C18.6862 2.11575 19.7785 2.50313 20.6367 3.36133C21.4949 4.21953 21.8822 5.31182 22.0673 6.68848C22.2495 8.0435 22.248 9.78227 22.248 12C22.248 14.2177 22.2495 15.9565 22.0673 17.3115C21.8822 18.6882 21.4949 19.7805 20.6367 20.6387C19.7785 21.4969 18.6862 21.8842 17.3095 22.0693C15.9545 22.2515 14.2157 22.25 11.998 22.25C9.78032 22.25 8.04155 22.2515 6.68653 22.0693C5.30987 21.8842 4.21758 21.4969 3.35938 20.6387C2.50118 19.7805 2.1138 18.6882 1.92871 17.3115C1.74659 15.9565 1.74805 14.2177 1.74805 12C1.74805 9.78227 1.74659 8.0435 1.92871 6.68848C2.1138 5.31182 2.50118 4.21953 3.35938 3.36133C4.21758 2.50313 5.30987 2.11575 6.68653 1.93066C8.04155 1.74854 9.78032 1.75 11.998 1.75ZM11.998 3.25C9.73768 3.25 8.11765 3.25137 6.88575 3.41699C5.67552 3.57972 4.95295 3.88885 4.41993 4.42188C3.8869 4.9549 3.57777 5.67747 3.41504 6.8877C3.24942 8.1196 3.24805 9.73963 3.24805 12C3.24805 14.2604 3.24942 15.8804 3.41504 17.1123C3.57777 18.3225 3.88691 19.0451 4.41993 19.5781C4.95295 20.1111 5.67552 20.4203 6.88575 20.583C8.11765 20.7486 9.73768 20.75 11.998 20.75C14.2584 20.75 15.8784 20.7486 17.1103 20.583C18.3205 20.4203 19.0431 20.1111 19.5761 19.5781C20.1091 19.0451 20.4183 18.3225 20.581 17.1123C20.7466 15.8804 20.748 14.2604 20.748 12C20.748 9.73963 20.7466 8.1196 20.581 6.8877C20.4183 5.67747 20.1091 4.9549 19.5761 4.42188C19.0431 3.88886 18.3205 3.57972 17.1103 3.41699C15.8784 3.25137 14.2584 3.25 11.998 3.25ZM14.4677 8.46973C14.7606 8.1769 15.2354 8.17686 15.5283 8.46973C15.821 8.76262 15.8211 9.23742 15.5283 9.53027L13.0585 12L15.5283 14.4697C15.821 14.7626 15.8211 15.2374 15.5283 15.5303C15.2354 15.8231 14.7606 15.823 14.4677 15.5303L11.998 13.0605L9.52832 15.5303C9.23552 15.8229 8.76063 15.8228 8.46778 15.5303C8.17496 15.2374 8.17509 14.7626 8.46778 14.4697L10.9375 12L8.46778 9.53027C8.17509 9.23737 8.17496 8.76256 8.46778 8.46973C8.76062 8.17715 9.23549 8.17711 9.52832 8.46973L11.998 10.9395L14.4677 8.46973Z" fill="currentColor" />
</svg></button>
                    <img className=' border- border-violet-500/30  shadow-[0_0_25px_rgba(168,85,247,0.25)] rounded-full h-[200px] max-[750px]:h-[40px] w-[200px] max-[750px]:w-[40px]' src={cardData[showOwner].productOwner.avatar} alt="No Profile Image" /></div>
                <div className="text-[rgb(91,158,229)] text-[19px] font-normal tracking-[-0.5px] font-['Outfit']">
                    <h3 className='max-[750px]:text-[14px]'>Name: {cardData[showOwner].productOwner.fullname}</h3>
                    <p className='max-[750px]:text-[14px]'>Username: {cardData[showOwner].productOwner.username}</p>
                    <p className='max-[750px]:text-[14px]'> Email:  {cardData[showOwner].productOwner.email}</p>
                    
                </div>


            </div>
            

        </div> )
     }
     </>
 ) 
 }
   
   
    
    
      
    </>
  )
}

export default services
