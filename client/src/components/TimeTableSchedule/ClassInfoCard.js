import React, { memo } from 'react'
import { useDispatch } from 'react-redux'
import { togglePopUp } from '../../utils/slices/popupSlice';
import { concatenateFirstLetters } from '../../utils/constants';
// function ClassInfoCard({ data, setFullClassDetails }) {
//     const { courseCode, roomName, courseType } = data[0];
//     const showClassDetails = () => {
//         setFullClassDetails({ "show": true, "data": data })
//     }
//     const courseColor=courseType === "Lecture" ? "bg-green-300" : courseType === "Practical" ? "bg-blue-300" : "bg-red-300";
//     // const courseColor=courseType === "Lecture" ? "green" : courseType === "Practical" ? "blue" : "red";
//     console.log("Course Type ",courseType,courseColor);
//     return (
//         <div className='flex flex-col gap-2 items-center'>
//             <div onClick={()=>{setFullClassDetails({ "show": true, "data": [data[0]] })}} className={`flex flex-col gap-2 items-center rounded-md p-2 cursor-pointer ${courseColor}`} title={courseType}>
//                 <div className='text-nowrap'>{courseCode + " (" + courseType.charAt(0) + ")"}</div>
//                 <div className='flex flex-row justify-between items-center w-full text-xs font-semibold'>
//                     <div>{roomName}</div>
//                     <div>BS</div>
//                 </div>
//             </div>
//             {data.length > 1 ? <div className='text-[10px] text-purple-800 font-bold cursor-pointer' onClick={showClassDetails}>Show More</div> : ""}
//         </div>
//     )
// }

function ClassInfoCard({ data, setFullClassDetails,setClassInfoPopUp }) {
    const { courseCode, roomName, courseType,teacherName } = data[0];
    const dispatch = useDispatch();
    console.log("Class Info Card ", data);
    const showClassDetails = (data) => {
        setFullClassDetails({ "data": data });
        dispatch(togglePopUp(true));
    }
    const courseColor = courseType === "Lecture" ? "bg-green-300" : courseType === "Practical" ? "bg-blue-300" : "bg-red-300";
    console.log("Course Type ", courseType, courseColor);
    return (
        <div className='flex flex-col gap-2 items-center'>
            <div onClick={() => { showClassDetails([data[0]]);setClassInfoPopUp(true) }} className={`flex flex-col gap-2 items-center rounded-md p-2 cursor-pointer ${courseColor}`} title={courseType}>
                <div className='text-nowrap'>{courseCode + " (" + courseType.charAt(0) + ")"}</div>
                <div className='flex flex-row justify-between items-center w-full text-xs font-semibold gap-3'>
                    <div>{roomName}</div>
                    <div>{concatenateFirstLetters(teacherName)}</div>
                </div>
            </div>
            {data.length > 1 ? <div className='text-[10px] text-purple-800 font-bold cursor-pointer' onClick={() => { showClassDetails(data);setClassInfoPopUp(true)  }}>Show More</div> : ""}
        </div>
    )
}

export default memo(ClassInfoCard);