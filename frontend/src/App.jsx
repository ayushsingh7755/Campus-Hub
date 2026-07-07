import React from "react";
import axios from 'axios'

import './App.css';
import { useEffect,useState, } from "react";
import Login from "../components/login.jsx";
import Register from "../components/registration.jsx"
import Navbar from "../components/navbar.jsx";
import Showcase from "../components/showcase.jsx";
import Landing from '../components/landing.jsx';
import Home from "../components/home.jsx";
import Product from "../components/product.jsx";
import Marketplace from "../components/marketplace.jsx";
import Services from "../components/services.jsx";
import College from "../components/college.jsx";
import About from "../components/about.jsx";
import AboutPage from "../components/AboutPage_1.jsx";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Products from "../components/products.jsx";
import Account from "../components/account.jsx";
import { userContext } from "../components/context.jsx";
import Navbar2 from "../components/navbar2.jsx";
import Update from "../components/updateDetails.jsx";
import Userproducts from "../components/userProducts.jsx";
import Password from "../components/changePassword.jsx";
import Avatar from "../components/changeAvatar.jsx";
import ProductDetails from "../components/productDetails.jsx";
import OwnerProfile from "../components/ownerProfile.jsx";
import IncomingBids from "../components/incomingBids.jsx";
import MyBids from "../components/myBids.jsx";
import Outgoingbuys from "../components/outgoingbuyRequests.jsx";
import Incomingbuys from "../components/incomingbuyRequests.jsx";
import ContactForBuy from "../components/contactForBuy.jsx";
import ContactForBid from "../components/contactForBid.jsx";

function App() {
  const [user,setUser]=useState();
  const[isLoggedIn,setLogin]=useState(false);
  useEffect(() => {
    getUser();
  }, [])

  const getUser = async () => {
    try {

      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/users/getuser`,
        { withCredentials: true }
      )

      if (res.data.success) {
        
        setUser(res.data)
        setLogin(true)
        
      }

    } catch (error) {
      console.log(error.response)
      setLogin(false);
    }
  }
  
 
  return (
    <userContext.Provider value={{user,setUser,getUser,isLoggedIn}}>
    <>
    
    <Router>
      <Routes>
        
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        
        <Route path="/show" element={<Showcase/>}/>
         
        
        <Route path="/" element={<Landing/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/sell" element={<Product/>}/>
        <Route path="/college" element={<College/>}/>
        <Route path="/college/:collegeName/" element={<Marketplace/>}/>
        <Route path="/college/:collegeName/services" element={<Services/>}/>
        <Route path="/college/:collegeName/products" element={<Products/>}/>
        <Route path="/about" element={<AboutPage/>}/>
         <Route path="/update" element={<Update/>}/>
         <Route path="/user/products" element={<Userproducts/>}/>
         <Route path="/changepassword" element={<Password/>}/>
          <Route path="/changeavatar" element={<Avatar/>}/>
          <Route path="/college/:collegeName/products/:productId" element={<ProductDetails/>}/>
          <Route path="/college/:collegeName/services/:productId" element={<ProductDetails/>}/>
          <Route path="/owner/:ownerId" element={<OwnerProfile/>}/>
          <Route path="/bid/incomingbids" element={<IncomingBids/>}/>
          <Route path="/bid/mybids" element={<MyBids/>}/>
          <Route path="/buy/mybuys" element={<Outgoingbuys/>}/>
          <Route path="/buy/incomingbuys" element={<Incomingbuys/>}/>
          <Route path="/contact-for-buy/:buyId" element={<ContactForBuy/>}/>
          <Route path="/contact-for-bid/:bidId" element={<ContactForBid/>}/>


       






        
        

      </Routes>
    </Router>
      
    </>
    </userContext.Provider>
  )
}

export default App

