import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../features/auth/authSlice'

function Home() {
  const authstate = useSelector((state)=> state.auth)
  const dispatch = useDispatch()

  const handleLogout = () =>{
    dispatch(logOut())
  }


  return (
    <>
      <div className='h-screen flex flex-col justify-center items-center gap-4'>
        <h1 className='font-bold text-5xl text-center'>Welcome <span className='text-red-600'>{authstate?.user}</span>!!!</h1>
        <div className='flex gap-2'>
          <p className='font-medium border-2 border-blue-800 px-2 py-1 rounded hover:bg-blue-800 hover:text-white cursor-pointer'><Link to="/profile">Go to Profile</Link></p>
          <p onClick={handleLogout} className='font-medium border-2 border-red-600 px-2 py-1 rounded hover:bg-red-600 hover:text-white cursor-pointer'>Logout</p>
        </div>

      </div>
    </>
  )
}

export default Home