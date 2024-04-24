import React from 'react'
import Header from '../Navbar/Header'
import { Outlet } from 'react-router-dom'

function Body() {
  return (
    <div className='flex flex-col gap-5 justify-start overflow-x-hidden'>
      <Header />
      <div className='p-4'>
        <Outlet />
      </div>
    </div>
  )
}

export default Body