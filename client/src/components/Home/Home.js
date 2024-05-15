import React from 'react'
import homeIcon from '../../images/home_icon.png'

function Home() {
  return (
    <div className='h-[590px] flex flex-col items-center justify-start'>
      <div className='w-[90vw] h-[440px] bg-purple-600 rounded-lg relative flex flex-col items-center justify-start'>
        <div className='flex flex-col gap-6 p-2 text-white mt-10'> 
          <span className='font-bold text-3xl text-center tracking-wider'>Solve <span className='highlight'>Time Clashes</span> and <span className='highlight'>Sync Schedules</span></span>
          <span className='text-2xl text-center max-w-[1200px] tracking-widest leading-9'>Streamline your college experience with our scheduler, where you can effortlessly resolve time clashes and access a centralized timetable for all branches and years. Stay organized, avoid conflicts, and optimize your academic journey with greater ease.</span>
        </div>
        <img src={homeIcon} alt="error" className='pb-3 w-[270px] absolute left-1/2 -translate-x-1/2 top-[280px]' />
      </div>
    </div>
  )
}

export default Home