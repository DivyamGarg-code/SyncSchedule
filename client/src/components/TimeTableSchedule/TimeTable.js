import React, { useState } from 'react'
import WeekdayHourlySchedule from './WeekdayHourlySchedule';
import RoomTimeAvailability from './RoomTimeAvailability';

function TimeTable() {
  const [activeTab, setActiveTab] = useState("weekdayHourlySchedule");
  const toggleTab = (currentTab) => {
    if (activeTab !== currentTab) {
      setActiveTab(currentTab);
    }
  }
  console.log("Active Tab ", activeTab);
  return (
    <div className='flex flex-col items-center gap-5'>
      <div className='flex flex-row items-center gap-3 bg-purple-300 p-2 rounded-md font-semibold'>
        <div className={activeTab === "weekdayHourlySchedule" ? 'bg-purple-600 p-2 rounded-md text-white cursor-pointer' : 'cursor-pointer'} onClick={() => { toggleTab("weekdayHourlySchedule") }}>Weekday Hourly Schedule</div>
        <div className={activeTab !== "weekdayHourlySchedule" ? 'bg-purple-600 p-2 rounded-md text-white cursor-pointer' : 'cursor-pointer'} onClick={() => { toggleTab("roomTimeAvailability") }}>Room Time Availability</div>
      </div>
      {activeTab === "weekdayHourlySchedule" ? <WeekdayHourlySchedule /> : <RoomTimeAvailability />}
    </div>
  )
}

export default TimeTable