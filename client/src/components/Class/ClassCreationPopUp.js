import React, { useEffect, useState } from 'react';
import SingleSelectDropdown from '../common/SingleSelectDropdown';
import { batches, courseCodes, courseTypes, departments, electiveTypes, rooms, semesters, teacherNames, timeSlots, weekDays, years } from '../../utils/constants';

// function ClassCreationPopUp({openPopUp}) {
//     const [formData, setFormData] = useState({
//         name: "",
//         designation: "",
//         department: ""  
//     });
//     const [selectedDepartment, setSelectedDepartment] = useState('');
//     useEffect(() => {
//         setFormData({
//             ...formData,
//             ["department"]: selectedDepartment
//         })
//     }, [selectedDepartment]);
//     console.log("selectedDepartment", selectedDepartment);
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Here you can handle form submission, such as sending data to a server or performing other actions
//         console.log(formData);
//         // Reset form fields after submission
//         alert("Form Submitted Successfully");
//         openPopUp(false);
//         setFormData({
//             name: "",
//             designation: "",
//             department: ""
//         });

//         setSelectedDepartment('');
//     };

//     return (
//         <div className='max-w-[500px] max-h-[450px] overflow-y-auto w-full p-4 border-2 flex flex-col gap-4 rounded-lg bg-white' onClick={(event) => { event.stopPropagation() }}>
//             <div className='flex flex-row items-center justify-between'>
//             <span className='font-bold'>Add Class Details</span>
//             <span className='font-bold cursor-pointer' onClick={()=>{openPopUp(false)}}>Close</span>
//             </div>
//             <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//                 <div className='flex flex-col gap-2'>
//                     <label htmlFor="name" className="font-semibold">Course Name:</label>
//                     <input type="text" id="name" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="p-2 border border-gray-300 rounded-lg" />
//                 </div>
//                 <div className='flex flex-col gap-2'>
//                     <label htmlFor="designation" className="font-semibold">Designation:</label>
//                     <input type="text" id="designation" name="designation" placeholder="Designation" value={formData.designation} onChange={handleChange} className="p-2 border border-gray-300 rounded-lg" />
//                 </div>
//                 <div className='flex flex-col gap-2'>
//                     <label htmlFor="department" className="font-semibold">Department:</label>
//                     <SingleSelectDropdown options={departments} placeholder={"Select Department"} selectedOption={selectedDepartment} setSelectedOption={setSelectedDepartment} />
//                 </div>
//                 <button type="submit" className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700">Submit</button>
//             </form>
//         </div>
//     );
// }



function ClassCreationPopUp({ openPopUp }) {
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [formData, setFormData] = useState({
        courseCode: "",
        courseName: "",
        courseType: "",
        year: "",
        semester: "",
        department: "",
        electiveType: "",
        batch: "",
        teacherName: "",
        day: "",
        timeSlot: "",
        roomName: "",
    });
    const [courseName, setCourseName] = useState('');
    const [selectedRoomNumber, setSelectedRoomNumber] = useState('');
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
    const [selectedCourseCode, setSelectedCourseCode] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedCourseType, setSelectedCourseType] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedSemester, setSelectedSemester] = useState('');
    const [selectedElectiveType, setSelectedElectiveType] = useState('');
    const [selectedBatch, setSelectedBatch] = useState('');
    const [selectedTeacher, setSelectedTeacher] = useState('');
    const [selectedDay, setSelectedDay] = useState('');
    // useEffect(() => {
    //     setFormData({
    //         ...formData,
    //         ["department"]: selectedDepartment
    //     })
    // }, [selectedDepartment]);
    // console.log("selectedDepartment", selectedDepartment);
    useEffect(() => {
        setErrorMsg(null);
    }, [selectedBatch, selectedCourseCode, selectedCourseType, selectedDay, selectedDepartment, selectedElectiveType, selectedRoomNumber, selectedSemester, selectedTeacher, selectedTimeSlot, selectedYear]);
    const handleChange = (e) => {
        setErrorMsg(null);
        const { name, value } = e.target;
        if (name === "courseName") {
            setCourseName(value);
        }
        // setFormData({
        //     ...formData,
        //     [name]: value
        // });
    };

    async function postData(url = "", options = {}) {
        try {
            const response = await fetch(url, options);
            const data = await response.text();
            return data;
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while making the POST request.");
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can handle form submission, such as sending data to a server or performing other actions
        if (
            selectedCourseCode.length === 0 ||
            courseName.length === 0 ||
            selectedCourseType.length === 0 ||
            selectedYear.length === 0 ||
            selectedSemester.length === 0 ||
            selectedDepartment.length === 0 ||
            selectedElectiveType.length === 0 ||
            selectedBatch.length === 0 ||
            selectedTeacher.length === 0 ||
            selectedDay.length === 0 ||
            selectedTimeSlot.length === 0 ||
            selectedRoomNumber.length === 0
        ) {
            setErrorMsg("Please fill all the details");
            return;
        } else {

            const data = {
                courseCode: selectedCourseCode,
                courseName: courseName,
                courseType: selectedCourseType,
                year: selectedYear,
                semester: selectedSemester,
                department: selectedDepartment,
                electiveType: selectedElectiveType,
                batch: selectedBatch,
                teacherName: selectedTeacher,
                day: selectedDay,
                timeSlot: selectedTimeSlot,
                roomName: selectedRoomNumber,
            }
            console.log("Handle Submit data", data);
            // Reset form fields after submission
            // --------------------------------------------------------------------------
            setLoading(true);
            const requestOptions = {
                method: "POST",
            };
            (async () => {
                try {
                    const url =
                        `https://script.google.com/macros/s/AKfycbyV6mKHkSQRHdzGhzNv4P1Zz7jO45i2X-mXjujaEzHmwWKLHb_9oqffYs8qjD2njyIm/exec?courseCode=${selectedCourseCode}&courseName=${courseName}&courseType=${selectedCourseType}&year=${selectedYear}&semester=${selectedSemester}&department=${selectedDepartment}&electiveType=${selectedElectiveType}&batch=${selectedBatch}&teacherName=${selectedTeacher}&day=${selectedDay}&timeSlot=${selectedTimeSlot}&roomName=${selectedRoomNumber}`;
                    const result = await postData(url, requestOptions);
                    alert("Form Submitted Successfully");
                    console.log(result);
                } catch (error) {
                    alert(error.message);
                }
                openPopUp(false);
            })();
        }
        // --------------------------------------------------------------------------
        // alert("Form Submitted Successfully");
        // openPopUp(false);
        // setFormData({
        //     name: "",
        //     designation: "",
        //     department: ""
        // });
        // setSelectedDepartment('');
    };

    return (
        <div className='max-w-[500px] max-h-[450px] overflow-y-auto w-full p-4 border-2 flex flex-col gap-4 rounded-lg bg-white' onClick={(event) => { event.stopPropagation() }}>
            <div className='flex flex-row items-center justify-between'>
                <span className='font-bold'>Add Class Details</span>
                <span className='font-bold cursor-pointer' onClick={() => { openPopUp(false) }}>Close</span>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* --------------------------------------------------------------------------------------- */}

                <div className="flex flex-col gap-2">
                    <label htmlFor="courseName" className="font-semibold">Course Name:</label>
                    <input type="text" id="courseName" name="courseName" placeholder="Course Name" value={courseName} onChange={handleChange} className="p-2 border border-gray-300 rounded-lg" />
                </div>
                {/* --------------------------------------------------------------------------------------- */}

                <div className='flex flex-row justify-between items-start'>
                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="department" className="font-semibold">Course Code:</label>
                            <SingleSelectDropdown options={courseCodes} placeholder={"Select Course Code"} selectedOption={selectedCourseCode} setSelectedOption={setSelectedCourseCode} />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="department" className="font-semibold">Department:</label>
                            <SingleSelectDropdown options={departments} placeholder={"Select Department"} selectedOption={selectedDepartment} setSelectedOption={setSelectedDepartment} />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="department" className="font-semibold">Course Type:</label>
                            <SingleSelectDropdown options={courseTypes} placeholder={"Select Course Type"} selectedOption={selectedCourseType} setSelectedOption={setSelectedCourseType} />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="electiveType" className="font-semibold">Elective Type:</label>
                            <SingleSelectDropdown options={electiveTypes} placeholder={"Select Elective Type"} selectedOption={selectedElectiveType} setSelectedOption={setSelectedElectiveType} />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="year" className="font-semibold">Year:</label>
                            <SingleSelectDropdown options={years} placeholder={"Select Year"} selectedOption={selectedYear} setSelectedOption={setSelectedYear} />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="semester" className="font-semibold">Semester:</label>
                            <SingleSelectDropdown options={semesters} placeholder={"Select Semester"} selectedOption={selectedSemester} setSelectedOption={setSelectedSemester} />
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>

                        <div className='flex flex-col gap-2'>
                            <label htmlFor="batch" className="font-semibold">Batch:</label>
                            <SingleSelectDropdown options={batches} placeholder={"Select Batch"} selectedOption={selectedBatch} setSelectedOption={setSelectedBatch} />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="teacher" className="font-semibold">Teacher:</label>
                            <SingleSelectDropdown options={teacherNames} placeholder={"Select Teacher"} selectedOption={selectedTeacher} setSelectedOption={setSelectedTeacher} />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="day" className="font-semibold">Day:</label>
                            <SingleSelectDropdown options={weekDays} placeholder={"Select Day"} selectedOption={selectedDay} setSelectedOption={setSelectedDay} />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="roomNumber" className="font-semibold">Room Number:</label>
                            <SingleSelectDropdown options={rooms} placeholder={"Select Room Number"} selectedOption={selectedRoomNumber} setSelectedOption={setSelectedRoomNumber} />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="timeSlot" className="font-semibold">Time Slot:</label>
                            <SingleSelectDropdown options={timeSlots} placeholder={"Select Time Slot"} selectedOption={selectedTimeSlot} setSelectedOption={setSelectedTimeSlot} />
                        </div>
                    </div>
                </div>
                {/* ------------------------------------------------------------------------------- */}
                {errorMsg ? <div className='text-red-700 text-[14px]'>{errorMsg}</div> : null}
                {loading ? <div className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 text-center">Loading...</div> :
                    <button type="submit" className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700">Submit</button>}
            </form>
        </div>
    );
}

export default ClassCreationPopUp;
