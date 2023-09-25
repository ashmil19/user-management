import React from 'react'
import { Link } from 'react-router-dom'

function Admin() {
  return (
    <div className='underline flex flex-col items-center h-screen justify-center'>
      <div>Admin</div>
      
      <h1>
        <Link to="/" >home</Link>
      </h1>

    </div>
  )
}

export default Admin