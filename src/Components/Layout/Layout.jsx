import React from 'react'
import Style from './Layout.module.css'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <main>
    <Navbar />
    <Outlet />
    <h1 className='text-center text-white text-4xl'>Footer</h1>
    </main>
  )
}

export default Layout