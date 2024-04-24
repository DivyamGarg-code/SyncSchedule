import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../images/logo.png'

function Header() { 
  const [activeTab, setActiveTab] = useState("Home"); // Initialize with "Home" as the default active tab
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div className='flex flex-row px-4 py-3 items-center justify-between shadow-md'>
      <div className='flex flex-row gap-2 items-center'>
        <img src={logo} alt="error" className='w-7 h-7' />
        <Link to="/" className='text-xl font-semibold hover:text-purple-800'>Sync Schedule</Link>
      </div>
      <div className='flex flex-row items-center gap-4'>
        <Link to="/" className={`text-xl font-semibold hover:text-purple-800 ${activeTab==="Home"?'text-purple-600':'text-black'}`} onClick={()=>handleTabClick("Home")}>Home</Link>
        <Link to="/timetable" className={`text-xl font-semibold hover:text-purple-800 ${activeTab==="TimeTable"?'text-purple-600':'text-black'}`} onClick={()=>handleTabClick("TimeTable")}>TimeTable</Link>
        <Link to="/rooms" className={`text-xl font-semibold hover:text-purple-800 ${activeTab==="Rooms"?'text-purple-600':'text-black'}`} onClick={()=>handleTabClick("Rooms")}>Rooms</Link>
        <Link to="/teachers" className={`text-xl font-semibold hover:text-purple-800 ${activeTab==="Teachers"?'text-purple-600':'text-black'}`} onClick={()=>handleTabClick("Teachers")}>Teachers</Link>
        <Link to="/classes" className={`text-xl font-semibold hover:text-purple-800 ${activeTab==="Classes"?'text-purple-600':'text-black'}`} onClick={()=>handleTabClick("Classes")}>Classes</Link>
        <Link to="/courses" className={`text-xl font-semibold hover:text-purple-800 ${activeTab==="Courses"?'text-purple-600':'text-black'}`} onClick={()=>handleTabClick("Courses")}>Courses</Link>
        <Link to="/events" className={`text-xl font-semibold hover:text-purple-800 ${activeTab==="Events"?'text-purple-600':'text-black'}`} onClick={()=>handleTabClick("Events")}>Events</Link>
        <Link to="/permissions" className={`text-xl font-semibold hover:text-purple-800 ${activeTab==="Permissions"?'text-purple-600':'text-black'}`} onClick={()=>handleTabClick("Permissions")}>Permissions</Link>
        <Link to="/login" className={`text-xl font-semibold hover:text-purple-800 ${activeTab==="Login"?'text-purple-600':'text-black'}`} onClick={()=>handleTabClick("Login")}>Login</Link>
      </div>
    </div>
  )
}

export default Header