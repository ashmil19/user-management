import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import AdminTable from '../components/AdminTable'
import useAxiosPrivate from '../hooks/useAxiosPrivate'

function Admin() {


  
  return (
    <>
    <Navbar />
    <AdminTable />
  </>
  )
}

export default Admin