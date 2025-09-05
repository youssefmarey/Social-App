import React from 'react'
import Style from './NotFound.module.css'
import ErrorImage from './../../assets/found page.jpg'

const NotFound = () => {
  return (
    <>
    <img src={ErrorImage} className='w-full' alt="" />
    </>
  )
}

export default NotFound