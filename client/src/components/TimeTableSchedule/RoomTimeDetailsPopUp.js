import React, { useEffect, useState } from 'react'
import SingleSelectDropdown from '../common/SingleSelectDropdown';
import { departments, getAvailableRooms, getAvailableTimeSlots, isIntervalWithin, rooms, timeSlots, weekDays } from '../../utils/constants';
import { classes } from '../../utils/classesData';
import { roomsData } from '../../utils/roomsData';

function RoomTimeDetailsPopUp() {
    const [activeTab, setActiveTab] = useState("roomNo");
    const toggleTab = (currentTab) => {
        if (activeTab !== currentTab) {
            setActiveTab(currentTab);
        }
    }
    const rooms=roomsData.reduce((acc,room)=>{
        acc.push(room.name);
        return acc;
    },[]);
    console.log("Active Tab ", activeTab);
    return (
        <div className='max-w-[500px] max-h-[450px] overflow-y-auto w-full p-4 border-2 flex flex-col gap-4 rounded-lg bg-white' onClick={(event) => { event.stopPropagation() }}>
            <div className='flex flex-row items-center gap-3 bg-purple-300 p-2 rounded-md font-semibold w-fit'>
                <div className={activeTab === "roomNo" ? 'bg-purple-600 p-2 rounded-md text-white cursor-pointer text-center' : 'cursor-pointer text-center'} onClick={() => { toggleTab("roomNo") }}>Available Rooms</div>
                <div className={activeTab !== "roomNo" ? 'bg-purple-600 p-2 rounded-md text-white cursor-pointer text-center' : 'cursor-pointer text-center'} onClick={() => { toggleTab("timeSlot") }}>Available Time Slots</div>
            </div>
            {activeTab === "roomNo" ? <RoomNumbers departments={departments}/> : <TimeSlots departments={departments} rooms={rooms}/>}
        </div>
    )
}

export default RoomTimeDetailsPopUp


// Here you need to apply filter of department to get department wise rooms data
const TimeSlots = ({departments,rooms}) => {
   
    const [filteredRooms, setFilteredRooms] = useState(rooms); // These are the rooms filtered department wise
    console.log('Filtered Rooms:', filteredRooms);
    const [selectedDepartment, setSelectedDepartment] = useState("");
    console.log('Selected department:', selectedDepartment);
    // ----------------------------------------------------------
    const [selectedRoom, setSelectedRoom] = useState(""); 
    console.log('Selected Room:', selectedRoom);

    const [selectedWeekday, setSelectedWeekday] = useState("");
    console.log('Selected weekday:', selectedWeekday);

    const [filteredWeekdays, setFilteredWeekdays] = useState(weekDays);
    console.log('Filtered weekday:', filteredWeekdays);

    const [filteredData, setFilteredData] = useState(null);
    console.log("Filtered Data", filteredData);
    // const roomsReducedList=()=>{
    //     const temp=roomsData.filter((room)=>room.department===selectedDepartment).reduce((acc,room)=>{
    //         acc.push(room.name);
    //         return acc;
    //     },[]);
    //     console.log(temp);
    // }
    // ------------------------------------------------------------------------------------------
    const allItems = ["9-10", "10-11", "11-12", "12-13", "13-14"];
    const bookedItems = ["9-14"];
    // const isPresent = (item, itemList) => {
    //     for (const bigItem of itemList) {
    //         if (isIntervalWithin(item, bigItem)) {
    //             return true;
    //         }
    //     }
    //     return false; 
    // }
    // console.log("isPresent", isPresent("", bookedItems));
    const result = getAvailableTimeSlots(allItems, bookedItems); // It will return the list of available time slots for that particular room
    console.log("RESULT -> ", result);
    // ------------------------------------------------------------------------------------------
    const setAvailableItems = () => {
        const data = classes.reduce((acc, classItem) => {
            weekDays.forEach((weekday) => {
                acc[weekday] = acc[weekday] || {};
                if (classItem.day === weekday && classItem.roomName === selectedRoom) {
                    acc[weekday][selectedRoom] = acc[weekday][selectedRoom] || [];
                    acc[weekday][selectedRoom].push(classItem.timeSlot);
                }
            })
            return acc;
        }, {});
        console.log("Before filteration", data);
        if(selectedRoom.length!=0){
            weekDays.forEach((weekday) => {
                if (data[weekday][selectedRoom]) {
                    data[weekday][selectedRoom] = getAvailableTimeSlots(timeSlots, data[weekday][selectedRoom]);
                } else {
                    data[weekday][selectedRoom] = timeSlots;
                }
            })
        }
        setFilteredData(data);
    }

    useEffect(() => {
        if (selectedRoom.length !== 0) {
            setAvailableItems(); // Change the structure of data in the desired format ie {weekday:{selectedOption:[...available items list]}} 
        } else {
            setFilteredData(null);
        }
    }, [selectedRoom]);

    useEffect(() => {
        if (selectedWeekday.length !== 0) {
            setFilteredWeekdays([selectedWeekday]);
        } else {
            setFilteredWeekdays(weekDays);
        }
        setAvailableItems();
    }, [selectedWeekday]);
    // useEffect(()=>{
    //     setSelectedRoom("");
    //     if(selectedDepartment.length!=0){
    //         setFilteredRooms(roomsData.filter((room)=>room.department===selectedDepartment).reduce((acc,room)=>{
    //             acc.push(room.name);
    //             return acc;
    //         },[]));
    //     }else{
    //         setFilteredRooms(rooms);
    //     }
    //     setAvailableItems();
    // },[selectedDepartment]);
    // useEffect(()=>{
    //     // ---------- For Room -----------
        
    //     setAvailableItems(); 
    // },[selectedRoom,selectedDepartment,selectedWeekday]);
    // ---------- For department -----------
    // ---------- For weekday -----------
    
    return (
        <div className='flex flex-col gap-2'>
            <div className='flex flex-row gap-2 items-center flex-wrap'>
                <SingleSelectDropdown options={filteredRooms} selectedOption={selectedRoom} setSelectedOption={setSelectedRoom} placeholder={"Select a Room Number"} />
                <SingleSelectDropdown options={weekDays} selectedOption={selectedWeekday} setSelectedOption={setSelectedWeekday} placeholder={"Select day"} />
                {/* <SingleSelectDropdown options={departments} selectedOption={selectedDepartment} setSelectedOption={setSelectedDepartment} placeholder={"Select Department"} /> */}
            </div>
            <div className='h-[2px] bg-gray-300 w-full'></div>
            {filteredData && filteredWeekdays.map((weekday) => {
                return filteredData[weekday] && filteredData[weekday][selectedRoom] ? (
                    filteredData[weekday][selectedRoom].length !== 0 ? (
                        <AvailabilityCard key={weekday} day={weekday} avaliableList={filteredData[weekday][selectedRoom]} />
                    ) : null
                ) : null;
            })}
        </div>
    );
}

const RoomNumbers = ({departments}) => {
   
    const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
    console.log('Selected value:', selectedTimeSlot);
    const [selectedWeekday, setSelectedWeekday] = useState("");
    console.log('Selected weekday:', selectedWeekday);
    const [filteredWeekdays, setFilteredWeekdays] = useState(weekDays);
    console.log('Filtered weekday:', filteredWeekdays);
    const [filteredData, setFilteredData] = useState(null);
    console.log("Filtered Data", filteredData);

    const setAvailableItems = () => {
        const data = classes.reduce((acc, classItem) => {
            weekDays.forEach((weekday) => {
                acc[weekday] = acc[weekday] || {};
                if (classItem.day === weekday && isIntervalWithin(selectedTimeSlot, classItem.timeSlot)) {
                    acc[weekday][selectedTimeSlot] = acc[weekday][selectedTimeSlot] || [];
                    acc[weekday][selectedTimeSlot].push(classItem.roomName);
                }
            })
            return acc;
        }, {});
        weekDays.forEach((weekday) => {
            if (data[weekday][selectedTimeSlot]) {
                data[weekday][selectedTimeSlot] = getAvailableRooms(rooms, data[weekday][selectedTimeSlot]);
            } else {
                data[weekday][selectedTimeSlot] = rooms;
            }
        })
        setFilteredData(data);
    }
    useEffect(() => {
        if (selectedTimeSlot.length !== 0) {
            setAvailableItems(); // Change the structure of data in the desired format ie {weekday:{selectedOption:[...available items list]}} 
        } else {
            setFilteredData(null);
        }
    }, [selectedTimeSlot]);

    useEffect(() => {
        if (selectedWeekday.length !== 0) {
            setFilteredWeekdays([selectedWeekday]);
        } else {
            setFilteredWeekdays(weekDays);
        }
    }, [selectedWeekday]);

    return (
        <div className='flex flex-col gap-2'>
            <div className='flex flex-row gap-2 items-center flex-wrap'>
                <SingleSelectDropdown options={timeSlots} selectedOption={selectedTimeSlot} setSelectedOption={setSelectedTimeSlot} placeholder={"Select a Time Slot"} />
                <SingleSelectDropdown options={weekDays} selectedOption={selectedWeekday} setSelectedOption={setSelectedWeekday} placeholder={"Select day"} />
            </div>
            <div className='h-[2px] bg-gray-300 w-full'></div>
            {filteredData && filteredWeekdays.map((weekday) => {
                return filteredData[weekday] && filteredData[weekday][selectedTimeSlot] ? (
                    filteredData[weekday][selectedTimeSlot].length !== 0 ? (
                        <AvailabilityCard key={weekday} day={weekday} avaliableList={filteredData[weekday][selectedTimeSlot]} />
                    ) : null
                ) : null;
            })}

        </div>
    );
}


const AvailabilityCard = ({ day, avaliableList }) => {
    return (
        <div className='flex flex-col gap-2 shadow-lg p-2'>
            <span className='font-medium'>{day}</span>
            <div className='flex flex-row gap-2 items-center flex-wrap'>
                {avaliableList.map((availableItem) => {
                    return <div key={availableItem} className='border-2 border-purple-600 text-purple-600 rounded-xl px-2 w-fit cursor-pointer hover:text-white hover:bg-purple-600'>{availableItem}</div>
                })}
            </div>
        </div>
    );

}

