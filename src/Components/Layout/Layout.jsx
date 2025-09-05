import React from 'react'
import Style from './Layout.module.css'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <main>
    <Navbar />
    <Outlet />
    </main>
  )
}

export default Layout