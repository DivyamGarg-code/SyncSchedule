import React, { memo } from 'react';

function SingleSelectDropdown({ options, placeholder ,selectedOption,setSelectedOption}) {

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
        // console.log('Selected value:', event.target.value);
    };
    return (
        <div>
            <select className='border-2 p-2 rounded-md cursor-pointer' onChange={handleSelectChange} value={selectedOption}>
                <option value={""} >{placeholder}</option>
                {options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );
}

export default memo(SingleSelectDropdown);
