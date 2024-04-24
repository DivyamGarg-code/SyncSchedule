import React, { useState } from 'react'
import { permissions } from '../../utils/permissionsData'
import PopUpWrapper from '../common/PopUpWrapper'

function ViewPermissionsPopUp({ openPopUp }) {

    return (
        <div className='max-w-[500px] max-h-[450px] overflow-y-auto w-full p-4 border-2 flex flex-col gap-6 rounded-lg bg-white' onClick={(event) => { event.stopPropagation() }}>
            <div className='flex flex-row items-center justify-between'>
                <span className='font-bold'>View All Permissions</span>
                <span className='font-bold cursor-pointer' onClick={() => { openPopUp(false) }}>Close</span>
            </div>
            <div className='flex flex-col gap-4'>
                {permissions.map((permission) => {
                    return <PermissionCard key={permission.id} data={permission} />
                })}
            </div>
        </div>
    )
}

export default ViewPermissionsPopUp

const PermissionCard = ({ data }) => {
    const { id, permission } = data;
    const [formData, setFormData] = useState(data);
    const [showEditPopUp, setEditPopUp] = useState(false);
    const [showDeletePopUp, setDeletePopUp] = useState(false);
    return (
        <div className='shadow-lg w-full p-2 border border-gray-200 border-t-4 border-t-purple-300 rounded-md flex flex-row justify-between items-center'>
            {showEditPopUp && <PopUpWrapper isConfirmationPopUp={true} component={<EditPermissionPopUp formData={formData} setFormData={setFormData} openPopUp={setEditPopUp} />} openPopUp={setEditPopUp} />}
            {showDeletePopUp && <PopUpWrapper isConfirmationPopUp={true} component={<DeletePermissionPopUp data={data} openPopUp={setDeletePopUp} />} openPopUp={setDeletePopUp} />}
            <span >{formData.permission}</span>
            <div className='flex flex-row gap-2 items-center'>
                <span className='font-semibold cursor-pointer' onClick={() => { setEditPopUp(true) }}>Edit</span>
                <span className='font-semibold cursor-pointer' onClick={() => { setDeletePopUp(true) }}>Delete</span>
            </div>
        </div>
    )
}

const EditPermissionPopUp = ({ formData, setFormData, openPopUp }) => {
    const [text, setText] = useState(formData.permission);
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        alert("Permission added Successfully");
        openPopUp(false);
        setFormData({ ...formData, permission: text });
    }
    const handleChange = (event) => {
        const { value } = event.target;
        setText(value);
    }
    return (
        <div className='max-w-[500px] max-h-[450px] overflow-y-auto w-full p-4 border-2 flex flex-col gap-6 rounded-lg bg-white' onClick={(event) => { event.stopPropagation() }}>
            <div className='flex flex-row items-center justify-between'>
                <span className='font-bold'>Edit Permission</span>
                <span className='font-bold cursor-pointer' onClick={() => { openPopUp(false) }}>Close</span>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-row gap-2 items-center'>
                <input type="text" placeholder='Create New Permission' name="permission" value={text} onChange={handleChange} className='p-2 border border-gray-300 rounded-lg w-full' />
                <button type="submit" className='bg-purple-600 p-2 rounded-md text-white cursor-pointer hover:bg-purple-700'>Save</button>
            </form>
        </div>
    );
}

const DeletePermissionPopUp = ({ data, openPopUp }) => {
    const handleDelete = () => {
        console.log("Data to be deleted ", data);
        alert("Deleted Successfully");
        openPopUp(false);
    }
    return (
        <div className='max-w-[500px] max-h-[450px] overflow-y-auto  p-4 border-2 flex flex-col gap-6 rounded-lg bg-white' onClick={(event) => { event.stopPropagation() }}>
            <span className='font-semibold'>Are you sure you want to delete ?</span>
            <div className='flex flex-row items-center gap-6 justify-center'>
                <button className='bg-purple-600 p-2 rounded-md text-white cursor-pointer hover:bg-purple-700' onClick={handleDelete}>Delete</button>
                <button className='bg-gray-600 p-2 rounded-md text-white cursor-pointer hover:bg-gray-700' onClick={() => { openPopUp(false) }}>Cancel</button>
            </div>
        </div>
    )
}