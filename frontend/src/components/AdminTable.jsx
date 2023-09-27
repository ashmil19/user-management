import React, { useEffect, useState } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate';

function AdminTable() {
  const [users, setUsers] = useState([]);
  const axiosPrivate = useAxiosPrivate()

  useEffect(() => {

    axiosPrivate.get('/admin/users')
    .then((response)=>{
      console.log(response.data.users);
      setUsers(response?.data?.users)
    })
    
  }, []);

  return (
    <div className="flex flex-col px-4">
    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
        <div className="overflow-hidden">
          <table className="min-w-full text-center text-sm font-light">
            <thead
              className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
              <tr>
                <th scope="col" className=" px-6 py-4 font-bold">#</th>
                <th scope="col" className=" px-6 py-4 font-bold">Name</th>
                <th scope="col" className=" px-6 py-4 font-bold">Email</th>
                <th scope="col" className=" px-6 py-4 font-bold">Action</th>
              </tr>
            </thead>
            <tbody>
              {/* <tr className="border-b dark:border-neutral-500">
                <td className="whitespace-nowrap  px-6 py-4 font-medium">1</td>
                <td className="whitespace-nowrap  px-6 py-4 font-medium">Mark</td>
                <td className="whitespace-nowrap  px-6 py-4 font-medium">Otto@gmail.com</td>
                <td className="whitespace-nowrap  px-6 py-4 flex gap-2 justify-center">
                    <button className='bg-gray-700 text-white py-1 px-2 rounded font-semibold'>Edit</button>
                    <button className='bg-red-700 text-white py-1 px-2 rounded font-semibold'>Delete</button>
                </td>
              </tr> */}
              {
                users?.map((user)=>{
                  return (
                    <tr className="border-b dark:border-neutral-500">
                    <td className="whitespace-nowrap  px-6 py-4 font-medium">1</td>
                    <td className="whitespace-nowrap  px-6 py-4 font-medium">{user.name}</td>
                    <td className="whitespace-nowrap  px-6 py-4 font-medium">{user.email}</td>
                    <td className="whitespace-nowrap  px-6 py-4 flex gap-2 justify-center">
                        <button className='bg-gray-700 text-white py-1 px-2 rounded font-semibold'>Edit</button>
                        <button className='bg-red-700 text-white py-1 px-2 rounded font-semibold'>Delete</button>
                    </td>
                  </tr>
                  )
                })
              }
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  )
}

export default AdminTable