import React, { useEffect, useState } from 'react'
import { concatinatedString } from '../../utils/constants';
// import { teachers } from '../../utils/teachersData';
import PopUpWrapper from '../common/PopUpWrapper';
import TeacherCreationPopUp from './TeacherCreationPopUp';


function Teachers() {
  const [showTeacherPopUp, setTeacherPopUp] = useState(false);
  const [teachersData,setTeachersData]=useState(null);
  const getTeachersData=async ()=>{
    const data=await fetch("https://script.googleusercontent.com/macros/echo?user_content_key=IztyIXX5KS80R15QcQhlIQsFLds2brTubjy0K9MYTzjKpUe6B6sLBExU8sLSQCUnKdR_0YUJyvLcgcfdbpZAiRPawdLO0K8Hm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnKyNEoUFfSmC6TT-jIe_oZAudcl10Vdp2YXzxsARyzyxzjNlUTV1s66E2kSYCWpeuWaW2obfk9y9tvaYpnnijz33XY3bqlWMbA&lib=MwnkiTel7PLqWF0cD5M9R1azruCaGEwWe");
    const json=await data.json();
    console.log("Teacher's Data",json);
    setTeachersData(json.data);
    setFilteredData(json.data);
  }

  const [filteredData, setFilteredData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  console.log(filteredData);
  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    setFilteredData(teachersData.filter((data) => {
      const concatStr = concatinatedString(data);
      return concatStr.includes(value.trim().toLowerCase());
    }));
  }
  useEffect(()=>{
    getTeachersData();
  },[]);

  return (
    <div className='flex flex-col gap-5'>
      {showTeacherPopUp && <PopUpWrapper isConfirmationPopUp={true} component={<TeacherCreationPopUp openPopUp={setTeacherPopUp} />} openPopUp={setTeacherPopUp} />}
      <div className='flex flex-col gap-2'>
        <span className='font-bold text-xl'>Teachers</span>
        <span>Details of all the teachers of Punjab Engineering College</span>
      </div>
      <div className='flex flex-row gap-4 justify-between items-center'>
        <input className="border-2 p-1" type="text" placeholder={`Search Teachers`} value={searchTerm} onChange={handleSearchChange} />
        <div className='flex flex-row gap-2 items-center'>
          <a className='bg-green-600 p-2 rounded-md text-white cursor-pointer w-fit text-[14px] font-bold hover:bg-green-700' href='https://docs.google.com/spreadsheets/d/1Rz_7nrgRnCemnRll3sHw8NE041uoJYrpTIlXacdJtjQ/edit#gid=0' target="_blank">Update Excel</a>
          <div className='bg-purple-600 p-2 rounded-md text-white cursor-pointer w-fit text-[14px] font-bold hover:bg-purple-700' onClick={() => setTeacherPopUp(true)}>Add Teacher</div>
        </div>
      </div>
      {filteredData===null?<div className='text-center'>Loading...</div>:filteredData.length === 0 ? <div className='italic px-4 py-2 text-center'>No Search Results</div>
        : <div className="overflow-x-auto h-[400px] overflow-y-auto">
          <table className="table-auto w-full">
            <thead className="sticky top-0 bg-white">
              <tr className="">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Designation</th>
                <th className="px-4 py-2">Department</th>
                <th className="px-4 py-2"></th> {/* Empty column for edit */}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((teacher, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2 text-center">{teacher.name}</td>
                  <td className="border px-4 py-2 text-center">{teacher.designation}</td>
                  <td className="border px-4 py-2 text-center">{teacher.department}</td>
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

export default Teachers
