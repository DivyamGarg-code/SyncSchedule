import React, { useEffect, useState } from 'react'
// import { classes } from '../../utils/classesData'
import { concatinatedString } from '../../utils/constants';
import PopUpWrapper from '../common/PopUpWrapper';
import ClassCreationPopUp from './ClassCreationPopUp';

function Classes() {
  const [showClassPopUp,setClassPopUp]=useState(false);
  const [filteredData, setFilteredData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  console.log(filteredData);
  const [classesData,setClassesData]=useState(null);
  const getClassesData = async () => {
    const data = await fetch("https://script.googleusercontent.com/macros/echo?user_content_key=d_kGp6mVqAjf6iwy_QC1NRA4HiwkCBzEKnrJc_aiU2Afx4942PgK1UkE7NL9KngA-9otDa3IDjD9Zlv4UGcJwdhr5ef_Pnytm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnKmGVC4Byr33yFeXZ5LPB9M7zQ99r0bsp6H2fIDg6Lo_AI92iVmRSVSKoivfa9svyINqiP68x8AQ80cai_mYmaIiPEj2CuEZfw&lib=MIJX2KtKUwnSC8R4MLDUzqsa0aySdfDvo");
    const json = await data.json();
    console.log("Classes's Data", json);
    setClassesData(json.data);
    setFilteredData(json.data);
  }

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    setFilteredData(classesData.filter((data) => {
      const concatStr = concatinatedString(data);
      return concatStr.includes(value.trim().toLowerCase());
    }));
  }
  useEffect(()=>{
    getClassesData();
  },[]);
  return (
    <div className='flex flex-col gap-5'>
      {showClassPopUp && <PopUpWrapper isConfirmationPopUp={true} component={<ClassCreationPopUp openPopUp={setClassPopUp} />} openPopUp={setClassPopUp} />}
      <div className='flex flex-col gap-2'>
        <span className='font-bold text-xl'>Classes</span>
        <span>Details of all the classes of Punjab Engineering College</span>
      </div>
      <div className='flex flex-row gap-4 justify-between items-center'>
        <input className="border-2 p-1" type="text" placeholder={`Search Classes `} value={searchTerm} onChange={handleSearchChange} />
        <div className='flex flex-row gap-2 items-center'>
          <a className='bg-green-600 p-2 rounded-md text-white cursor-pointer w-fit text-[14px] font-bold hover:bg-green-700' href='https://docs.google.com/spreadsheets/d/144VqCvBpHWGzOWtBQgFNartPzxuj01U0-J59SNgv37Y/edit#gid=0' target='_blank'>Update Excel</a>
          <div className='bg-purple-600 p-2 rounded-md text-white cursor-pointer w-fit text-[14px] font-bold hover:bg-purple-700' onClick={()=>setClassPopUp(true)}>Add Class</div>
        </div>
      </div>
      <div className='w-full border-2 border-gray-100'></div>
      {filteredData===null?<div className='text-center'>Loading...</div>:filteredData.length === 0 ? <div className='italic px-4 py-2 text-center'>No Search Results</div> :
        <div className="overflow-x-auto h-[400px] overflow-y-auto">
          <table className="table-auto w-full">
            <thead className="sticky top-0 bg-white">
              <tr className="">
                <th className="px-4 py-2">Course Code</th>
                <th className="px-4 py-2">Course Name</th>
                <th className="px-4 py-2">Course Type</th>
                <th className="px-4 py-2">Year</th>
                <th className="px-4 py-2">Semester</th>
                <th className="px-4 py-2">Department</th>
                <th className="px-4 py-2">Elective Type</th>
                <th className="px-4 py-2">Batch</th>
                <th className="px-4 py-2">Teacher Name</th>
                <th className="px-4 py-2">Day</th>
                <th className="px-4 py-2">Time Slot</th>
                <th className="px-4 py-2">Room Name</th>
                <th className="px-4 py-2"></th> {/* Empty column for edit */}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((schedule, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2 text-center">{schedule.courseCode}</td>
                  <td className="border px-4 py-2 text-center">{schedule.courseName}</td>
                  <td className="border px-4 py-2 text-center">{schedule.courseType}</td>
                  <td className="border px-4 py-2 text-center">{schedule.year}</td>
                  <td className="border px-4 py-2 text-center">{schedule.semester}</td>
                  <td className="border px-4 py-2 text-center">{schedule.department}</td>
                  <td className="border px-4 py-2 text-center">{schedule.electiveType}</td>
                  <td className="border px-4 py-2 text-center">{schedule.batch}</td>
                  <td className="border px-4 py-2 text-center">{schedule.teacherName}</td>
                  <td className="border px-4 py-2 text-center">{schedule.day}</td>
                  <td className="border px-4 py-2 text-center">{schedule.timeSlot}</td>
                  <td className="border px-4 py-2 text-center">{schedule.roomName}</td>
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

export default Classes