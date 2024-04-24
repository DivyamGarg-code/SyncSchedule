import React from 'react'
import { useNavigate } from 'react-router-dom'
function ErrorPage() {
    const navigate = useNavigate();
    return (
        <div className='flex flex-col items-center gap-2 text-2xl font-bold'>
            <div>404</div>
            <div>Page Not Found</div>
            <div className='text-xs font-medium border-2 cursor-pointer border-purple-500 p-2 rounded-lg' onClick={() => { navigate('/') }}>Go Back To Home</div>
        </div>
    )
}

export default ErrorPage