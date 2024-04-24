import React, { useState, useRef, useEffect, memo } from 'react'
import dropdownArrow from '../../images/dropdownArrow.svg'
import { useDispatch, useSelector } from 'react-redux'


function MultiSelectDropdown({ entries, name, objKey, func }) {
    const [showDropdown, setShowDropdown] = useState(false);
    const [items, setItems] = useState(entries);
    // const [selectedOptions, setSelectedOptions] = useState([]);
    const selectedOptions = useSelector((store) => store.timetableFilter[objKey]);
    const dispatch = useDispatch();
    const [selectAll, setSelectAll] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const dropdownRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleSearchChange = (e) => {
        const { value } = e.target;
        console.log("Search Values ", entries.filter(option => option.toLowerCase().includes(value.trim().toLowerCase())));
        setSearchTerm(value);
        setItems(entries.filter(option => option.toLowerCase().includes(value.trim().toLowerCase())));
    }
    console.log(searchTerm);
    const handleOptionChange = (e) => {
        const option = e.target.value;
        if (option === "selectAll") {
            if (e.target.checked) {
                // setSelectedOptions([...items]);
                dispatch(func([...items]));
                setSelectAll(true);
            } else {
                // setSelectedOptions([]);
                dispatch(func([]));
                setSelectAll(false);
            }
        } else {
            if (e.target.checked) {
                // setSelectedOptions([...selectedOptions, option]);
                dispatch(func([...selectedOptions, option]));
            } else {
                // setSelectedOptions(selectedOptions.filter(item => item !== option));
                dispatch(func(selectedOptions.filter(item => item !== option)))
            }
        }
    };

    const handleDropdownClick = () => {
        setShowDropdown(!showDropdown);
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);
    console.log("selectedOptions ", selectedOptions);
    return (
        <div className='flex flex-col gap-2 relative' ref={dropdownRef}>
            <div className='flex flex-row items-center gap-3 border-2 p-2 rounded-md cursor-pointer hover:bg-purple-300 w-fit' onClick={handleDropdownClick}>
                <div>{name}</div>
                <img className='h-4' src={dropdownArrow} alt="error" />
            </div>
            <div className='flex flex-row flex-wrap gap-1'>
                {selectedOptions.map((option) => {
                    return <div key={option} className='p-1 rounded-md bg-slate-300 w-fit text-[10px] font-medium'>{option}</div>
                })}
            </div>
            {showDropdown ? <div className='text-nowrap w-[250px] p-2 shadow-lg rounded-lg border-2 flex flex-col gap-2 absolute  z-10 top-[50px] left-0 bg-white'>
                <input className="text-[12px] border-2 p-1" type="text" placeholder={`Search By ${name}`} value={searchTerm} onChange={handleSearchChange} />
                <div className='max-h-[200px] w-full overflow-y-auto flex flex-col gap-1'>
                    <div className='flex flex-row flex-wrap gap-1 '>
                        {selectedOptions.map((option) => {
                            return <div key={option} className='p-1 rounded-md bg-slate-300 w-fit text-[10px] font-medium'>{option}</div>
                        })}
                    </div>
                    {searchTerm.trim().length !== 0 && items.length !== 0 ? null : items.length !== 0 ?
                        <label className='w-full flex flex-row items-center gap-1 hover:bg-slate-300 p-1 rounded-md'>
                            <input type="checkbox" value="selectAll" checked={selectAll} onChange={handleOptionChange} />Select All
                        </label> :
                        <div className='italic text-red-600 text-[14px]'>No Search Results</div>}
                    {items.map(option => (
                        <label key={option} className="flex flex-row items-center gap-1 hover:bg-slate-300 p-1 rounded-md w-full">
                            <input
                                type="checkbox"
                                value={option}
                                checked={selectedOptions.includes(option)}
                                onChange={handleOptionChange}
                            />
                            {option}
                        </label>
                    ))}
                </div>
            </div> : null}
        </div>
    )
}

export default memo(MultiSelectDropdown)