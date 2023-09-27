import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useRefreshToken from '../hooks/useRefreshToken'
import Profile from './Profile'

function Home() {
  const refresh = useRefreshToken()
  const authstate = useSelector((state)=> state.auth)


  return (
    <>
      <div className='h-screen flex flex-col justify-center items-center gap-4'>
        <h1 className='font-bold text-5xl'>Welcome <span className='text-red-600'>{authstate?.user}</span>!!!</h1>
        <div>
          <p className='font-medium border-2 border-blue-800 px-2 py-1 rounded hover:bg-blue-800 hover:text-white cursor-pointer'>Go to Profile</p>
        </div>
      </div>
    </>
  )
}

export default Home