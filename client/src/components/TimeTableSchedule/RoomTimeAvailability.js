import React, { useMemo, useState, useEffect } from 'react';
import { classes } from '../../utils/classesData';
import { timeSlots, rooms, isIntervalWithin } from '../../utils/constants';
import ClassDetailsPopUp from './ClassDetailsPopUp';
import ClassInfoCard from './ClassInfoCard';
import { clearFilters} from '../../utils/slices/timetableFilterSlice';
import { useSelector, useDispatch } from 'react-redux';
import PopUpWrapper from '../common/PopUpWrapper';
import RoomTimeDetailsPopUp from './RoomTimeDetailsPopUp';

function RoomTimeAvailability() {
  // For Weekday Selection................................
  const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const [selectedDay, setSelectedDay] = useState('');
  const [showClassInfoPopUp, setClassInfoPopUp] = useState(false);
  const [showMoreInfoPopUp, setShowMoreInfoPopUp] = useState(false);
  useEffect(() => {
    // Get the current day (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const currentDate = new Date();
    const currentDayIndex = currentDate.getDay();

    // Set the default selected option to the current day
    setSelectedDay(weekDays[currentDayIndex]);
  }, []); // Run this effect when the options array changes
  // ...........................................................................................

  const dispatch = useDispatch();
  const [fullClassDetails, setFullClassDetails] = useState({
    "data": null
  });

  const filters = useSelector((store) => store.timetableFilter);

  const filteredClasses = useMemo(() => {
    return classes.reduce((acc, classItem) => {
      rooms.forEach(room => {
        timeSlots.forEach(timeSlot => {
          if (classItem.day === selectedDay && classItem.roomName === room && isIntervalWithin(timeSlot, classItem.timeSlot)) {
            if ((filters.teacherName.length !== 0 && !filters.teacherName.includes(classItem.teacherName)) ||
              (filters.department.length !== 0 && !filters.department.includes(classItem.department)) ||
              (filters.batch.length !== 0 && filters.batch !== classItem.batch) ||
              (filters.year.length !== 0 && !filters.year.includes(classItem.year)) ||
              (filters.semester.length !== 0 && !filters.semester.includes(classItem.semester)) ||
              (filters.courseType.length !== 0 && !filters.courseType.includes(classItem.courseType)) ||
              (filters.courseCode.length !== 0 && !filters.courseCode.includes(classItem.courseCode))
            ) {
              return;
            }
            acc[room] = acc[room] || {};
            acc[room][timeSlot] = acc[room][timeSlot] || [];
            acc[room][timeSlot].push(classItem);
          }
        });
      });
      return acc;
    }, {});
  }, [filters, selectedDay]);
  console.log("Room Time Availability ", filteredClasses);
  const handlePrint = () => {
    window.print();
  };

  const clearAllFilters = () => {
    dispatch(clearFilters());
  };

  return (
    <div className='p-2'>
      {showClassInfoPopUp && <PopUpWrapper isConfirmationPopUp={false} component={<ClassDetailsPopUp fullClassDetails={fullClassDetails}/>} openPopUp={setClassInfoPopUp} />}
      <div className='flex flex-row flex-wrap gap-2 justify-center items-center p-2'>
        {/* -------- Select Weekday ------------- */}
        <SingleSelectDropdown weekDays={weekDays} selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
        {/* ----------------------------------------- */}
        <button className='p-2 rounded-md font-semibold bg-purple-300 hover:bg-purple-400' onClick={() => { setShowMoreInfoPopUp(true) }}>More Info</button>
        {showMoreInfoPopUp ? <PopUpWrapper isConfirmationPopUp={false} component={<RoomTimeDetailsPopUp />} openPopUp={setShowMoreInfoPopUp} /> : ""}
        {/* --------------------------------------------------------------------------------------------------------------------------------- */}
        <button onClick={handlePrint} className='p-2 rounded-md font-semibold bg-purple-300 hover:bg-purple-400'>Print</button>
      </div>
      <div className="overflow-auto p-2 max-w-[98vw]">
        <div className="table-wrapper">
          <table className="table-fixed">
            <thead>
              <tr>
                <th className="sticky-room">Room</th>
                {timeSlots.map((slot, index) => (
                  <th key={index} className="sticky-time text-nowrap min-w-[100px]">{slot}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rooms.map((room, roomIndex) => (
                <tr key={roomIndex}>
                  <td className="sticky-room">{room}</td>
                  {timeSlots.map((timeSlot, slotIndex) => (
                    <td key={slotIndex}>
                      {filteredClasses[room] && filteredClasses[room][timeSlot] &&
                        <ClassInfoCard data={filteredClasses[room][timeSlot]} setFullClassDetails={setFullClassDetails} setClassInfoPopUp={setClassInfoPopUp}/>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RoomTimeAvailability;

const SingleSelectDropdown = ({ weekDays, selectedDay, setSelectedDay }) => {
  const handleSelectChange = (event) => {
    setSelectedDay(event.target.value);
    console.log('Selected day:', event.target.value);
  };
  return (
    <div>
      <select className='border-2 p-2 rounded-md cursor-pointer' onChange={handleSelectChange} value={selectedDay}>
        {weekDays.map((weekday) => (
          <option key={weekday} value={weekday}>{weekday}</option>
        ))}
      </select>
    </div>
  );
}

