import React from 'react'
import { Outlet } from 'react-router-dom'
// Navbar and Footer
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'


// Layout For Home Page
const HomeLayout = () => {
  return (
    <>
        <Navbar />
        <Outlet />
        <Footer />
    </>
  )
}

export default HomeLayout