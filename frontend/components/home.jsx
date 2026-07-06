import React, { useEffect } from 'react'
import Navbar2 from './navbar2.jsx'
import Navbar from './navbar.jsx'
import Showcase2 from './showcase2.jsx'
import Details from './details.jsx'
import Footer from './footer.jsx'
import Skills from './skills.jsx'
import Login2 from './login2.jsx'
import { useContext } from 'react';
import { userContext } from './context.jsx';
 



function home() {
 
 
  const{isLoggedIn}=useContext(userContext)
  return (
    <>
    {isLoggedIn?(<Navbar2/>):(<Navbar/>)}
    <Showcase2/>
    <Details/>
    <Skills/>
    <Footer/>

      
    </>
  )
}

export default home
