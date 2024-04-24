import React from 'react'
import { useDispatch } from 'react-redux'
import { togglePopUp } from '../../utils/slices/popupSlice';

function PopUpWrapper({ component, isConfirmationPopUp,openPopUp }) {
    const dispatch = useDispatch();
    const onClickEventHandler = () => {
        console.log(isConfirmationPopUp, "Clicked");
        if (!isConfirmationPopUp) {
            openPopUp(false);
        }
    }
    return (
        <div className='overlay-container' onClick={onClickEventHandler}>
            <div className='overlay-background'></div>
            <div className='overlay-content'>
                <div className='flex flex-row justify-center items-center min-h-screen flex-wrap gap-3 p-3'>
                    {/* <div className='h-[200px] w-[200px] bg-white rounded-md'></div> */}
                    {component}
                </div>
            </div>
        </div>
    )
}

export default PopUpWrapper