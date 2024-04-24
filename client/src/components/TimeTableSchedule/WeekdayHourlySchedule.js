import React, { useMemo, useState } from 'react'
import { classes } from '../../utils/classesData';
import { batches, courseCodes, courseTypes, departments, isIntervalWithin, semesters, teacherNames, timeSlots, weekDays, years } from '../../utils/constants';
import ClassDetailsPopUp from './ClassDetailsPopUp';
import ClassInfoCard from './ClassInfoCard';
import MultiSelectDropdown from '../common/MultiSelectDropdown';
import { clearFilters, setBatch, setCourseCode, setCourseType, setDepartment, setSemester, setTeacherName, setYear } from '../../utils/slices/timetableFilterSlice';
import { useSelector, useDispatch } from 'react-redux'
import PopUpWrapper from '../common/PopUpWrapper';

function WeekdayHourlySchedule() {
  // const dept = ["CSE", "EE", "ECE", "MECH", "AERO", "META", "CIVIL", "PROD"];
  // const batches = ["G1","G2","G3","G4","E1","E2","E3","E4","E5"];
  const dispatch = useDispatch();
  const [fullClassDetails, setFullClassDetails] = useState({
    "data": null
  });
  const [showClassInfoPopUp, setClassInfoPopUp] = useState(false);
  // const filters = {
  //   "courseCode": [],
  //   "teacherName": [],
  //   "department": ["EE", "CSE"],
  //   "batch": [],
  //   "year": [],
  //   "semester": [],
  //   "courseType": ["Lecture", "Tutorial", "Practical"],
  //   // "courseName": []
  // }
  const filters = useSelector((store) => store.timetableFilter);
  // console.log("Filterrrs ...", filters);
  const filteredClasses = useMemo(() => {
    return classes.reduce((acc, classItem) => {
      weekDays.forEach(weekDay => {
        timeSlots.forEach(timeSlot => {
          if (classItem.day === weekDay && isIntervalWithin(timeSlot, classItem.timeSlot)) {
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
            acc[weekDay] = acc[weekDay] || {};
            acc[weekDay][timeSlot] = acc[weekDay][timeSlot] || [];
            acc[weekDay][timeSlot].push(classItem);
          }
        });
      });
      return acc;
    }, {});
  }, [filters]);
  console.log(filteredClasses);
  const handlePrint = () => {
    window.print();
  };

  const clearAllFilters = () => {
    dispatch(clearFilters());
  }
  return (
    <div className='p-2'>
      {showClassInfoPopUp && <PopUpWrapper isConfirmationPopUp={false} component={<ClassDetailsPopUp fullClassDetails={fullClassDetails} />} openPopUp={setClassInfoPopUp} />}
      <div className='flex flex-row flex-wrap gap-2 justify-center items-start p-2'>
        <MultiSelectDropdown entries={courseCodes} objKey={"courseCode"} func={setCourseCode} name={"Course Code"} />
        <MultiSelectDropdown entries={teacherNames} objKey={"teacherName"} func={setTeacherName} name={"Teacher Name"} />
        <MultiSelectDropdown entries={departments} objKey={"department"} func={setDepartment} name={"Department"} />
        <MultiSelectDropdown entries={batches} objKey={"batch"} func={setBatch} name={"Batch"} />
        <MultiSelectDropdown entries={years} objKey={"year"} func={setYear} name={"Year"} />
        <MultiSelectDropdown entries={semesters} objKey={"semester"} func={setSemester} name={"Semester"} />
        <MultiSelectDropdown entries={courseTypes} objKey={"courseType"} func={setCourseType} name={"Course Type"} />
        <button onClick={clearAllFilters} className='p-2 rounded-md font-semibold bg-purple-300 hover:bg-purple-400'>Clear Filters</button>
        <button onClick={handlePrint} className='p-2 rounded-md font-semibold bg-purple-300 hover:bg-purple-400'>Print</button>
      </div>
      <div className="overflow-x-auto p-2 w-[96vw]">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2"></th>
              {timeSlots.map((slot, index) => (
                <th key={index} className="px-4 py-2 min-w-[100px] text-nowrap">{slot}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {weekDays.map((weekDay, weekDayIndex) => (
              <tr key={weekDayIndex}>
                <td className="border px-4 py-2 font-bold text-nowrap sticky-room">{weekDay}</td>
                {timeSlots.map((timeSlot, slotIndex) => (
                  <td key={slotIndex} className="border border-gray-300 px-4 py-2">
                    {filteredClasses[weekDay] && filteredClasses[weekDay][timeSlot] &&
                      <ClassInfoCard data={filteredClasses[weekDay][timeSlot]} setFullClassDetails={setFullClassDetails} setClassInfoPopUp={setClassInfoPopUp} />}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default WeekdayHourlySchedule