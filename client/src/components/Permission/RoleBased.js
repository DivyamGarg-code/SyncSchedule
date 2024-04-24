import React, { useState } from 'react'
import { roleBasedPermissions } from '../../utils/permissionsData';
import PopUpWrapper from '../common/PopUpWrapper';
import RoleCreationPopUp from './RoleCreationPopUp';

function RoleBased() {
  const [showNewRolePopUp,setNewRolePopUp]=useState(false);
  return (
    <div className='flex flex-col gap-2'>
      {showNewRolePopUp && <PopUpWrapper isConfirmationPopUp={true} component={<RoleCreationPopUp openPopUp={setNewRolePopUp} />} openPopUp={setNewRolePopUp} />}
      <div className='w-full flex flex-row justify-end'>
        <div className='bg-purple-600 p-2 rounded-md text-white cursor-pointer w-fit font-semibold hover:bg-purple-700' onClick={()=>{setNewRolePopUp(true)}}>Add New Role</div>
      </div>
      <div className='w-full border-2 border-gray-100'></div>
      <div className='flex flex-wrap gap-5'>
        {roleBasedPermissions.map((item) => {
          return <RoleBasedPermissionsCard key={item.id} data={item} />
        })}
      </div>
    </div>
  )
}

export default RoleBased

const RoleBasedPermissionsCard = ({ data }) => {
  console.log(data);
  const { id, role, permissions } = data;
  return (
    <div className='shadow-lg border-t-4 border-t-purple-400 rounded-md p-3 flex flex-col gap-4 justify-between w-fit'>
      <div className='flex flex-col gap-3'>
        <span className='font-semibold text-xl'><span className='text-purple-900' title='role'>{role.charAt(0).toUpperCase() + role.substr(1)} </span>Permissions</span>
        <ul className='list-disc pl-8 flex flex-col gap-1'>
          {permissions.map((item) => {
            return <li key={item.id}>{item.permission}</li>
          })}
        </ul>
      </div>
      {/* <div className='flex flex-row flex-wrap gap-2 justify-end'>
        <div className='text-purple-600 font-semibold cursor-pointer hover:text-purple-700'>Edit</div>
        <div className='text-purple-600 font-semibold cursor-pointer hover:text-purple-700'>Delete</div>
      </div> */}
    </div>
  );
}