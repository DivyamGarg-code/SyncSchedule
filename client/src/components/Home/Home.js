import React from 'react'
import homeIcon from '../../images/home_icon.png'

function Home() {
  return (
    <div className='h-[600px] flex flex-col items-center justify-start'>
      <div className='w-[90vw] h-[500px] bg-purple-600 rounded-lg relative flex flex-col items-center justify-start gap'>
        <span className='font-bold text-2xl text-center'>Unified Timetable Hub: Solve Time Clashes and Sync Schedules</span>
        {/* <span>Welcome To the Time Table</span> */}
        <img src={homeIcon} alt="error" className='pb-3 w-[270px] absolute left-1/2 -translate-x-1/2 top-[330px]' />
      </div>
    </div>
  )
}

export default Home