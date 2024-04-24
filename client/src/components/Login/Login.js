import React from 'react'
import {Link} from 'react-router-dom'
import logo from '../../images/logo.png'
import googleIcon from '../../images/googleLogo.png'

function Login() {
  return (
    <div className='p-10 shadow-2xl rounded-lg border border-1 h-fit w-fit flex flex-col items-center gap-4 m-auto mt-[60px] font-semibold'>
      <img src={logo} alt="error" className='h-[100px]' />
      <div>Sign In To Your Account</div>
      <div className='flex flex-col items-center gap-2'>
        <div className='flex flex-row items-center gap-3 cursor-pointer p-2 bg-slate-300'>
          <img src={googleIcon} alt="error" className='w-5 h-5' />
          <Link to="/timeTable" className='text-nowrap'>Sign In with Google</Link>
        </div>
        <div>Continue without signin? <Link to="/" className='text-gray-600'>Explore</Link></div>
      </div>
    </div>
  )
}

export default Login