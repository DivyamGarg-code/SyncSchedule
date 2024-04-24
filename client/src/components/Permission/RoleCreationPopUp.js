import React, { useState } from 'react'
import { permissions } from '../../utils/permissionsData';

function RoleCreationPopUp({ openPopUp }) {
  const [role, setRole] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      role: role,
      permissions: selectedPermissions
    });
    alert("New Role Created Successfully");
    openPopUp(false);
  }

  const handleRoleChange = (e) => {
    const { value } = e.target;
    setRole(value);
  }

  return (
    <div className='max-w-[500px] max-h-[450px] overflow-y-auto w-full p-4 border-2 flex flex-col gap-4 rounded-lg bg-white' onClick={(event) => { event.stopPropagation() }}>
      <div className='flex flex-row items-center justify-between'>
        <span className='font-bold'>Create New Role</span>
        <span className='font-bold cursor-pointer' onClick={() => { openPopUp(false) }}>Close</span>
      </div>
      <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
        <div className='flex flex-row gap-2 items-center'>
          <input type="text" placeholder='Create New Role' name="role" value={role} onChange={handleRoleChange} className='p-2 border border-gray-300 rounded-lg w-full' />
          <button type="submit" className='bg-purple-600 p-2 rounded-md text-white cursor-pointer hover:bg-purple-700'>Add</button>
        </div>
        <div className='flex flex-col gap-2'>
          <span className='font-semibold'>Select Permissions</span>
          <div className='flex flex-col gap-1 pl-4'>
            {permissions.map((item) => {
              return <PermissionCheckbox data={item} selectedPermissions={selectedPermissions} setSelectedPermissions={setSelectedPermissions} key={item.id} />
            })}
          </div>
        </div>

      </form>

    </div>
  )
}

export default RoleCreationPopUp

const PermissionCheckbox = ({ data, selectedPermissions, setSelectedPermissions }) => {
  const { id, permission } = data;
  const handleOptionChange = (e) => {
    console.log(data, e.target.checked);
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedPermissions([...selectedPermissions, data]);
    } else {
      setSelectedPermissions(selectedPermissions.filter((item) => item !== data));
    }
  }
  return (
    <label htmlFor={id} className='flex flex-row items-center gap-2'>
      <input type="checkbox" id={id} onChange={handleOptionChange} className='mt-1' />
      <span className='cursor-pointer'>{permission}</span>
    </label>
  );
}