import React, { useState } from 'react'
import { roomsData } from '../../utils/roomsData';
import { concatinatedString } from '../../utils/constants';
import RoomCreationPopUp from './RoomCreationPopUp';
import PopUpWrapper from '../common/PopUpWrapper';


function Rooms() {
  const [showRoomPopUp, setRoomPopUp] = useState(false);
  const [filteredData, setFilteredData] = useState(roomsData);
  const [searchTerm, setSearchTerm] = useState("");
  console.log(filteredData);
  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    setFilteredData(roomsData.filter((data) => {
      const concatStr = concatinatedString(data);
      return concatStr.includes(value.trim().toLowerCase());
    }));
  }

  return (
    <div className='flex flex-col gap-5'>
      {showRoomPopUp && <PopUpWrapper isConfirmationPopUp={true} component={<RoomCreationPopUp openPopUp={setRoomPopUp} />} openPopUp={setRoomPopUp} />}
      <div className='flex flex-col gap-2'>
        <span className='font-bold text-xl'>Rooms</span>
        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, soluta?</span>
      </div>
      <div className='flex flex-row gap-4 justify-between items-center'>
        <input className="border-2 p-1" type="text" placeholder={`Search Rooms `} value={searchTerm} onChange={handleSearchChange} />
        <div className='flex flex-row gap-2 items-center'>
          <div className='bg-green-600 p-2 rounded-md text-white cursor-pointer w-fit text-[14px] font-bold hover:bg-green-700' onClick={() => setRoomPopUp(true)}>Upload Excel</div>
          <div className='bg-purple-600 p-2 rounded-md text-white cursor-pointer w-fit text-[14px] font-bold hover:bg-purple-700' onClick={() => setRoomPopUp(true)}>Add Room</div>
        </div>
      </div>
      {filteredData.length === 0 ? <div className='italic px-4 py-2 text-center'>No Search Results</div>
        : <div className="overflow-x-auto h-[400px] overflow-y-auto">
          <table className="table-auto w-full">
            <thead className="sticky top-0 bg-white">
              <tr className="">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Capacity</th>
                <th className="px-4 py-2">Department</th>
                <th className="px-4 py-2"></th> {/* Empty column for edit */}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((room, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2 text-center">{room.name}</td>
                  <td className="border px-4 py-2 text-center">{room.capacity}</td>
                  <td className="border px-4 py-2 text-center">{room.department}</td>
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

export default Rooms
