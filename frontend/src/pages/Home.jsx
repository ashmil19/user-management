import React from 'react'
import { Link } from 'react-router-dom'
import useRefreshToken from '../hooks/useRefreshToken'

function Home() {
  const refresh = useRefreshToken()
  return (
    <div className='underline flex flex-col items-center h-screen justify-center' >
      <div >Home</div>
      
      <h2>
        <Link to="/admin" >admin</Link>
      </h2>

      <button onClick={()=> refresh()}>Refresh</button>
    </div>
  )
}

export default Home