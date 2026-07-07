import React, { useEffect } from 'react'
import Navbar from './navbar.jsx'
import Showcase from './showcase.jsx'
import Details from './details.jsx'
import Popular from './popular.jsx'
import Skills from './skills.jsx'
import Login2 from './login2.jsx'
import Footer from './footer.jsx'
import { useContext } from 'react';
import { userContext } from './context.jsx';


function landing() {
  

  
  return (
    <>
    <Navbar/>
    <Showcase/>
    <Details/>
    <Popular/>
    <Skills/>
    <Login2/>
    <Footer/>

      
    </>
  )
}

export default landing
