import React, { memo } from 'react'

function ClassDetailsPopUp({ fullClassDetails, }) {
    console.log("Full Class Details", fullClassDetails);
    const course = {
        "courseCode": "EL2002",
        "courseName": "Power System",
        "courseType": "L",
        "year": 4,
        "semester": 8,
        "department": "EE",
        "electiveType": "DEC1", // DEC1/OE2
        "batch": "G1",
        "teacherName": "Balwinder Singh",
        "day": "Monday",
        "timeSlot": "9-10",
        "roomName": "L-4",
    };
    const classDetails = fullClassDetails.data;
    return (
        <>{classDetails.map((classData, index) => {
            return <CourseCard key={index} classData={classData} />
            
        })}
        </>
    );
}

export default memo(ClassDetailsPopUp)

function CourseCard({ classData }) {
    console.log("Course Card ", classData);
    const { courseName, courseCode, courseType, department, teacherName, roomName, day, timeSlot, electiveType, batch, year, semester } = classData;
    return (
        <div className="max-w-xs rounded overflow-hidden shadow-lg flex flex-col justify-start gap-2 bg-white" onClick={(event) => { event.stopPropagation() }}>
            <div className="px-6 py-4 flex flex-col justify-start gap-1">
                <div className="font-bold text-xl">{courseName}</div>
                <p className="text-gray-700 text-base">{courseCode}</p>
                <p className="text-gray-700 text-base">{department} - {batch}</p>
                <p className="text-gray-700 text-base text-nowrap">Teacher: {teacherName}</p>
                <p className="text-gray-700 text-base">Room: {roomName}</p>
                <p className="text-gray-700 text-base">Year: {year}, Sem: {semester}</p>
                <p className="text-gray-700 text-base">{day}, {timeSlot}</p>
                <div className="flex justify-between text-gray-700 text-base">
                    <span>{courseType}</span>
                    <span>{electiveType}</span>
                </div>
            </div>
        </div>
    );
}