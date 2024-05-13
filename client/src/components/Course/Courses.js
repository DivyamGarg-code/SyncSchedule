import React, { useEffect, useState } from 'react'
import { courses } from '../../utils/coursesData'
import { concatinatedString } from '../../utils/constants';
import PopUpWrapper from '../common/PopUpWrapper';
import CourseCreationPopUp from './CourseCreationPopUp';

function Courses() {
  const [showCoursePopUp, setCoursePopUp] = useState(false);
  const [filteredData, setFilteredData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [coursesData,setCoursesData]=useState(null);
  const getCoursesData = async () => {
    const data = await fetch("https://script.googleusercontent.com/macros/echo?user_content_key=Adq6Zaw7hQWS26RLHJx39Qz9BauqFfzWhynmIvazmFZ_6EGFJwPvSwF8pTK34nbC9B3LmBEwwgfYeH3scUUN8K8Lry_GvyOym5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnOJcuMIR7SpaBlTzkahcuonHvAn72L4pg90tfN_yAkX1V4YKJgPiCArNLG9Gpy1dv_pD2wB4eWnOrG7uS8Cu4KSM2oUcuLHqsQ&lib=Mx35x2iKG9PaZ6fDUzJRKEsa0aySdfDvo");
    const json = await data.json();
    console.log("Courses's Data", json);
    setCoursesData(json.data);
    setFilteredData(json.data);
  }

  console.log(filteredData);
  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    setFilteredData(coursesData.filter((data) => {
      const concatStr = concatinatedString(data);
      return concatStr.includes(value.trim().toLowerCase());
    }));
  }
  useEffect(() => {
    getCoursesData();
  }, []);


  return (
    <div className='flex flex-col gap-5'>
      {showCoursePopUp && <PopUpWrapper isConfirmationPopUp={true} component={<CourseCreationPopUp openPopUp={setCoursePopUp} />} openPopUp={setCoursePopUp} />}
      <div className='flex flex-col gap-2'>
        <span className='font-bold text-xl'>Courses</span>
        <span>Details of all the courses of Punjab Engineering College</span>
      </div>
      <div className='flex flex-row gap-4 justify-between items-center'>
        <input className="border-2 p-1" type="text" placeholder={`Search Courses `} value={searchTerm} onChange={handleSearchChange} />
        <div className='flex flex-row gap-2 items-center'>
          <a className='bg-green-600 p-2 rounded-md text-white cursor-pointer w-fit text-[14px] font-bold hover:bg-green-700' href='https://docs.google.com/spreadsheets/d/1QME4D6uIMAybq3sbwNxUyiFvK7vSDWURhsJn1NwyS1Q/edit?usp=sharing ' target='_blank'>Update Excel</a>
          <div className='bg-purple-600 p-2 rounded-md text-white cursor-pointer w-fit text-[14px] font-bold hover:bg-purple-700' onClick={() => setCoursePopUp(true)}>Add Course</div>
        </div>
      </div>
      {filteredData===null?<div className='text-center'>Loading...</div>:filteredData.length === 0 ? <div className='italic px-4 py-2 text-center'>No Search Results</div> :
        <div className="overflow-x-auto h-[400px] overflow-y-auto">
          <table className="table-auto w-full">
            <thead className="sticky top-0 bg-white">
              <tr className="">
                <th className="px-4 py-2">Course Name</th>
                <th className="px-4 py-2">Course Code</th>
                <th className="px-4 py-2">Department</th>
                <th className="px-4 py-2"></th> {/* Empty column for edit */}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((course, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2 text-center">{course.name}</td>
                  <td className="border px-4 py-2 text-center">{course.code}</td>
                  <td className="border px-4 py-2 text-center">{course.department}</td>
                  <td className="border px-4 py-2 text-center">
                    <div className='flex flex-row gap-4 items-center justify-center'>
                      <button className="text-blue-500 hover:text-blue-800">Edit</button>
                      <button className="text-blue-500 hover:text-blue-800">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>}
    </div>
  )
}

export default Courses