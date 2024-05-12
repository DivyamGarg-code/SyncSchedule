import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../images/logo.png'

function Header() {
  const urlParam=window.location.pathname.split("/")[1].length!==0?window.location.pathname.split("/")[1]:"Home";
  console.log("Url Param",urlParam);
  const [activeTab, setActiveTab] = useState(urlParam); // Initialize with "Home" as the default active tab
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  // useEffect(() => {
  //   const param = urlParams.get('paramName'); // Replace 'paramName' with the actual parameter name

  //   console.log(`Current parameter: ${param}`);
  // }, []); // Log on component mount (adjust as needed)
  return (
    <div className='flex flex-row px-4 py-3 items-center justify-between shadow-md'>
      <div className='flex flex-row gap-2 items-center'>
        <img src={logo} alt="error" className='w-7 h-7' />
        <Link to="/" className='text-xl font-semibold hover:text-purple-800'>Sync Schedule</Link>
      </div>
      <div className='flex flex-row items-center gap-4'>
        <Link to="/" className={`text-xl font-semibold hover:text-purple-800 ${activeTab === "home" ? 'text-purple-600' : 'text-black'}`} onClick={() => handleTabClick("home")}>Home</Link>
        <Link to="/timetable" className={`text-xl font-semibold hover:text-purple-800 ${activeTab === "timetable" ? 'text-purple-600' : 'text-black'}`} onClick={() => handleTabClick("timetable")}>TimeTable</Link>
        <Link to="/rooms" className={`text-xl font-semibold hover:text-purple-800 ${activeTab === "rooms" ? 'text-purple-600' : 'text-black'}`} onClick={() => handleTabClick("rooms")}>Rooms</Link>
        <Link to="/teachers" className={`text-xl font-semibold hover:text-purple-800 ${activeTab === "teachers" ? 'text-purple-600' : 'text-black'}`} onClick={() => handleTabClick("teachers")}>Teachers</Link>
        <Link to="/classes" className={`text-xl font-semibold hover:text-purple-800 ${activeTab === "classes" ? 'text-purple-600' : 'text-black'}`} onClick={() => handleTabClick("classes")}>Classes</Link>
        <Link to="/courses" className={`text-xl font-semibold hover:text-purple-800 ${activeTab === "courses" ? 'text-purple-600' : 'text-black'}`} onClick={() => handleTabClick("courses")}>Courses</Link>
        <Link to="/events" className={`text-xl font-semibold hover:text-purple-800 ${activeTab === "events" ? 'text-purple-600' : 'text-black'}`} onClick={() => handleTabClick("events")}>Events</Link>
        <Link to="/permissions" className={`text-xl font-semibold hover:text-purple-800 ${activeTab === "permissions" ? 'text-purple-600' : 'text-black'}`} onClick={() => handleTabClick("permissions")}>Permissions</Link>
        <Link to="/login" className={`text-xl font-semibold hover:text-purple-800 ${activeTab === "login" ? 'text-purple-600' : 'text-black'}`} onClick={() => handleTabClick("login")}>Login</Link>
      </div>
    </div>
  )
}

export default Header