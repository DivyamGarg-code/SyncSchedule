import React, { useEffect, useMemo, useState } from 'react'
import { classes } from '../../utils/classesData';
import { batches, courseCodes, courseTypes, departments, electiveTypes, isIntervalWithin, semesters, teacherNames, timeSlots, weekDays, years } from '../../utils/constants';
import ClassDetailsPopUp from './ClassDetailsPopUp';
import ClassInfoCard from './ClassInfoCard';
import MultiSelectDropdown from '../common/MultiSelectDropdown';
import { clearFilters, setBatch, setCourseCode, setCourseType, setDepartment, setElectiveType, setSemester, setTeacherName, setYear } from '../../utils/slices/timetableFilterSlice';
import { useSelector, useDispatch } from 'react-redux'
import PopUpWrapper from '../common/PopUpWrapper';

// function WeekdayHourlySchedule() {
//   // const dept = ["CSE", "EE", "ECE", "MECH", "AERO", "META", "CIVIL", "PROD"];
//   // const batches = ["G1","G2","G3","G4","E1","E2","E3","E4","E5"];
//   const dispatch = useDispatch();
//   const [fullClassDetails, setFullClassDetails] = useState({
//     "data": null
//   });
//   const [showClassInfoPopUp, setClassInfoPopUp] = useState(false);
//   // const [classesData,setClassesData]=useState(null);
//   // const filters = {
//   //   "courseCode": [],
//   //   "teacherName": [],
//   //   "department": ["EE", "CSE"],
//   //   "batch": [],
//   //   "year": [],
//   //   "semester": [],
//   //   "courseType": ["Lecture", "Tutorial", "Practical"],
//   //   // "courseName": []
//   // }
//   const filters = useSelector((store) => store.timetableFilter);
//   // console.log("Filterrrs ...", filters);
//   const filteredClasses = useMemo(() => {
//     return classes.reduce((acc, classItem) => {
//       weekDays.forEach(weekDay => {
//         timeSlots.forEach(timeSlot => {
//           if (classItem.day === weekDay && isIntervalWithin(timeSlot, classItem.timeSlot)) {
//             if ((filters.teacherName.length !== 0 && !filters.teacherName.includes(classItem.teacherName)) ||
//               (filters.department.length !== 0 && !filters.department.includes(classItem.department)) ||
//               (filters.batch.length !== 0 && filters.batch !== classItem.batch) ||
//               (filters.year.length !== 0 && !filters.year.includes(classItem.year)) ||
//               (filters.semester.length !== 0 && !filters.semester.includes(classItem.semester)) ||
//               (filters.courseType.length !== 0 && !filters.courseType.includes(classItem.courseType)) ||
//               (filters.courseCode.length !== 0 && !filters.courseCode.includes(classItem.courseCode))
//             ) {
//               return;
//             }
//             acc[weekDay] = acc[weekDay] || {};
//             acc[weekDay][timeSlot] = acc[weekDay][timeSlot] || [];
//             acc[weekDay][timeSlot].push(classItem);
//           }
//         });
//       });
//       return acc;
//     }, {});
//   }, [filters]);
//   console.log(filteredClasses);
//   const handlePrint = () => {
//     window.print();
//   };

//   const clearAllFilters = () => {
//     dispatch(clearFilters());
//   }
//   return (
//     <div className='p-2'>
//       {showClassInfoPopUp && <PopUpWrapper isConfirmationPopUp={false} component={<ClassDetailsPopUp fullClassDetails={fullClassDetails} />} openPopUp={setClassInfoPopUp} />}
//       <div className='flex flex-row flex-wrap gap-2 justify-center items-start p-2'>
//         <MultiSelectDropdown entries={courseCodes} objKey={"courseCode"} func={setCourseCode} name={"Course Code"} />
//         <MultiSelectDropdown entries={teacherNames} objKey={"teacherName"} func={setTeacherName} name={"Teacher Name"} />
//         <MultiSelectDropdown entries={departments} objKey={"department"} func={setDepartment} name={"Department"} />
//         <MultiSelectDropdown entries={batches} objKey={"batch"} func={setBatch} name={"Batch"} />
//         <MultiSelectDropdown entries={years} objKey={"year"} func={setYear} name={"Year"} />
//         <MultiSelectDropdown entries={semesters} objKey={"semester"} func={setSemester} name={"Semester"} />
//         <MultiSelectDropdown entries={courseTypes} objKey={"courseType"} func={setCourseType} name={"Course Type"} />
//         <MultiSelectDropdown entries={electiveTypes} objKey={"electiveType"} func={setElectiveType} name={"Elective Type"} />
//         <button onClick={clearAllFilters} className='p-2 rounded-md font-semibold bg-purple-300 hover:bg-purple-400'>Clear Filters</button>
//         <button onClick={handlePrint} className='p-2 rounded-md font-semibold bg-purple-300 hover:bg-purple-400'>Print</button>
//       </div>
//       <div className="overflow-x-auto p-2 w-[96vw]">
//         <table className="table-auto w-full">
//           <thead>
//             <tr>
//               <th className="px-4 py-2"></th>
//               {timeSlots.map((slot, index) => (
//                 <th key={index} className="px-4 py-2 min-w-[100px] text-nowrap">{slot}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {weekDays.map((weekDay, weekDayIndex) => (
//               <tr key={weekDayIndex}>
//                 <td className="border px-4 py-2 font-bold text-nowrap sticky-room">{weekDay}</td>
//                 {timeSlots.map((timeSlot, slotIndex) => (
//                   <td key={slotIndex} className="border border-gray-300 px-4 py-2">
//                     {filteredClasses[weekDay] && filteredClasses[weekDay][timeSlot] &&
//                       <ClassInfoCard data={filteredClasses[weekDay][timeSlot]} setFullClassDetails={setFullClassDetails} setClassInfoPopUp={setClassInfoPopUp} />}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


// WITH API - Excel Not Filled Properly
function WeekdayHourlySchedule() {
    // const dept = ["CSE", "EE", "ECE", "MECH", "AERO", "META", "CIVIL", "PROD"];
    // const batches = ["G1","G2","G3","G4","E1","E2","E3","E4","E5"];

    const dispatch = useDispatch();
    const [fullClassDetails, setFullClassDetails] = useState({
        "data": null
    });
    const [showClassInfoPopUp, setClassInfoPopUp] = useState(false);
    const [classesData, setClassesData] = useState(null);
    const [filterData, setFilterData] = useState(null);
    console.log("filterData -> ", filterData);
    //   const filtesrs = {
    //     "courseCodes": [],
    //     "teacherNames": [],
    //     "departments": [],
    //     "batches": [],
    //     "years": [],
    //     "semesters": [],
    //     "courseTypes": [],
    //     "courseNames": [],
    //      "electiveTypes":[]
    //   }

    const filters = useSelector((store) => store.timetableFilter);
    // console.log("Filterrrs ...", filters);
    const filteredClasses = useMemo(() => {
        if (classesData === null) {
            return {};
        }
        return classesData.reduce((acc, classItem) => {
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
    }, [filters, classesData]);
    console.log(filteredClasses);
    const handlePrint = () => {
        window.print();
    };

    const clearAllFilters = () => {
        dispatch(clearFilters());
    }
    const getClassesData = async () => {
        const data = await fetch("https://script.googleusercontent.com/macros/echo?user_content_key=d_kGp6mVqAjf6iwy_QC1NRA4HiwkCBzEKnrJc_aiU2Afx4942PgK1UkE7NL9KngA-9otDa3IDjD9Zlv4UGcJwdhr5ef_Pnytm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnKmGVC4Byr33yFeXZ5LPB9M7zQ99r0bsp6H2fIDg6Lo_AI92iVmRSVSKoivfa9svyINqiP68x8AQ80cai_mYmaIiPEj2CuEZfw&lib=MIJX2KtKUwnSC8R4MLDUzqsa0aySdfDvo");
        const json = await data.json();
        console.log("Classes's Data", json);
        setClassesData(json.data);
        // ------------------- Reducing the list of classes into filtered data ------------------
        const reducedData = json.data.reduce((acc, current) => {
            Object.keys(current).forEach(key => {
                // Convert strings to lowercase for case-insensitive uniqueness
                const value = current[key];

                if (!acc[key]) {
                    acc[key] = [];
                }

                // Check if the value already exists in the array
                if (!acc[key].includes(value)) {
                    acc[key].push(value);
                }
            });
            return acc;
        }, {});
        setFilterData(reducedData);
        console.log(reducedData);
        // ------------------------------------------------------------------------------
    }
    useEffect(() => {
        getClassesData();
    }, []);

    if (classesData === null) {
        return (<div>Loading...</div>);
    }
    return (
        <div className='p-2'>
            {showClassInfoPopUp && <PopUpWrapper isConfirmationPopUp={false} component={<ClassDetailsPopUp fullClassDetails={fullClassDetails} />} openPopUp={setClassInfoPopUp} />}
            {filterData?<div className='flex flex-row flex-wrap gap-2 justify-center items-start p-2'>
                <MultiSelectDropdown entries={filterData.courseCode} objKey={"courseCode"} func={setCourseCode} name={"Course Code"} />
                <MultiSelectDropdown entries={filterData.teacherName} objKey={"teacherName"} func={setTeacherName} name={"Teacher Name"} />
                <MultiSelectDropdown entries={filterData.department} objKey={"department"} func={setDepartment} name={"Department"} />
                <MultiSelectDropdown entries={filterData.batch} objKey={"batch"} func={setBatch} name={"Batch"} />
                <MultiSelectDropdown entries={filterData.year} objKey={"year"} func={setYear} name={"Year"} />
                <MultiSelectDropdown entries={filterData.semester} objKey={"semester"} func={setSemester} name={"Semester"} />
                <MultiSelectDropdown entries={filterData.courseType} objKey={"courseType"} func={setCourseType} name={"Course Type"} />
                <MultiSelectDropdown entries={filterData.electiveType} objKey={"electiveType"} func={setElectiveType} name={"Elective Type"} />
                <button onClick={clearAllFilters} className='p-2 rounded-md font-semibold bg-purple-300 hover:bg-purple-400'>Clear Filters</button>
                <button onClick={handlePrint} className='p-2 rounded-md font-semibold bg-purple-300 hover:bg-purple-400'>Print</button>
            </div>:<div>Filters Loading....</div>}
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