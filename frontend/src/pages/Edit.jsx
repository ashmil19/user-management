import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

function Edit() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const axiosPrivate = useAxiosPrivate()
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const name = searchParams.get('name')

    useEffect(() => {
        axiosPrivate.get(`/user/getuser?name=${name}`)
        .then((response)=>{
            setEmail(response?.data?.user?.email)
        })
    }, []);


    const handleSubmit = (e) =>{
        e.preventDefault();
        
        if(email.trim() === ""){
            alert("fill the field")
            return
        }

        const postData = {
            name,
            email
        }

        axiosPrivate.post("/admin/edit",postData)
        .then((response)=>{
            console.log("success");
            console.log(response);
            navigate("/admin")
        })
        .catch((err)=>{
            console.log(err);
        })
    }

  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-screen flex justify-center items-center ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen md:w-screen lg:py-0">
          
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Edit the details
                  </h1>
                  <form className="space-y-4 md:space-y-6"  onSubmit={handleSubmit}>

                      <div>
                          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
                          <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            value={email}
                            onChange={(e)=> setEmail(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="name@company.com"
                          />
                      </div>
                     
                      <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
                  </form>
              </div>
          </div>
      </div>
    </section>
  )
}

export default Edit