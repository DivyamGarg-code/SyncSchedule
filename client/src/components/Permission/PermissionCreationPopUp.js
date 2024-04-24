import React, { useState } from 'react'

function PermissionCreationPopUp({ openPopUp }) {
    const [formData, setFormData] = useState({
        permission: ""
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        alert("Permission added Successfully");
        openPopUp(false);
    }
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({...formData,[name]:value});
    }
    return (
        <div className='max-w-[500px] max-h-[450px] overflow-y-auto w-full p-4 border-2 flex flex-col gap-6 rounded-lg bg-white' onClick={(event) => { event.stopPropagation() }}>
            <div className='flex flex-row items-center justify-between'>
                <span className='font-bold'>Add Permission Details</span>
                <span className='font-bold cursor-pointer' onClick={() => { openPopUp(false) }}>Close</span>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-row gap-2 items-center'>
                <input type="text" placeholder='Create New Permission' name="permission" value={formData.permission} onChange={handleChange} className='p-2 border border-gray-300 rounded-lg w-full' />
                <button type="submit" className='bg-purple-600 p-2 rounded-md text-white cursor-pointer hover:bg-purple-700'>Add</button>
            </form>
        </div>
    )
}

export default PermissionCreationPopUp