import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router'
import Footer from './Footer'

const Landing = () => {
  return (
    <div>
        <Header/>
        <div style={{marginTop:"80px"}}>
        <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}

export default Landing