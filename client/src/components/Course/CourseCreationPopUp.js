import React, { useEffect, useState } from 'react';
import SingleSelectDropdown from '../common/SingleSelectDropdown';
import { departments } from '../../utils/constants';

function CourseCreationPopUp({openPopUp}) {
    const [formData, setFormData] = useState({
        name: "",
        code: "",
        department: ""  
    });
    const [selectedDepartment, setSelectedDepartment] = useState('');
    useEffect(() => {
        setFormData({
            ...formData,
            ["department"]: selectedDepartment
        })
    }, [selectedDepartment]);
    console.log("selectedDepartment", selectedDepartment);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can handle form submission, such as sending data to a server or performing other actions
        console.log(formData);
        // Reset form fields after submission
        alert("Form Submitted Successfully");
        openPopUp(false);
        setFormData({
            name: "",
            code: "",
            department: ""
        });

        setSelectedDepartment('');
    };

    return (
        <div className='max-w-[500px] max-h-[450px] overflow-y-auto w-full p-4 border-2 flex flex-col gap-4 rounded-lg bg-white' onClick={(event) => { event.stopPropagation() }}>
            <div className='flex flex-row items-center justify-between'>
            <span className='font-bold'>Add Course Details</span>
            <span className='font-bold cursor-pointer' onClick={()=>{openPopUp(false)}}>Close</span>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className='flex flex-col gap-2'>
                    <label htmlFor="name" className="font-semibold">Name:</label>
                    <input type="text" id="name" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="p-2 border border-gray-300 rounded-lg" />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="code" className="font-semibold">Code:</label>
                    <input type="text" id="code" name="code" placeholder="Code" value={formData.code} onChange={handleChange} className="p-2 border border-gray-300 rounded-lg" />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="department" className="font-semibold">Department:</label>
                    <SingleSelectDropdown options={departments} placeholder={"Select Department"} selectedOption={selectedDepartment} setSelectedOption={setSelectedDepartment} />
                </div>
                <button type="submit" className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700">Submit</button>
            </form>
        </div>
    );
}

export default CourseCreationPopUp;
