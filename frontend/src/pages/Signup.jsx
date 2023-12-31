import React, { useState } from 'react'
import toast,{Toaster} from 'react-hot-toast';
import {Link, useNavigate} from 'react-router-dom'
import axios from '../axios'

function Signup() {
  const navigate = useNavigate()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [prevToastId, setPrevToastId] = useState(null);

  const showToast = (message)=>{
    
    if(prevToastId){
      toast.dismiss(prevToastId)
    }

    const newToastId = toast.error(message,{
      duration: 3000,
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
        width: '300px',
      },
    })

    setPrevToastId(newToastId)

  }

  const handleSubmit = (e)=>{
    e.preventDefault();

    if(name.trim() === "" || email.trim() === "" || password.trim() === "" || confirmPassword.trim() === ""){
      showToast("fill the form")
      return
    }

    if(password !== confirmPassword){
      showToast("password does not match")
      return
    }

    const postData = {
      name,
      email,
      password,
    }

    axios.post('/signup',postData)
    .then((res)=>{
      navigate('/login')
      console.log("success");
    })
    .catch((err)=>{
      showToast(err.response.data.message)
      console.log(err.message);
    })
    
  }



  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-screen flex justify-center items-center ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen md:w-screen lg:py-0">
          
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Create and account
                  </h1>
                  <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                      <div>
                          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                          <input 
                            type="text" 
                            name="name" 
                            id="name" 
                            value={name}
                            onChange={(e)=> setName(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="John Doe" 
                          />
                      </div>
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
                      <div>
                          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                          <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            value={password}
                            onChange={(e)=> setPassword(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="••••••••" 
                          />
                      </div>
                      <div>
                          <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                          <input 
                            type="password" 
                            name="confirm-password" 
                            id="confirm-password" 
                            value={confirmPassword}
                            onChange={(e)=> setConfirmPassword(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="••••••••" 
                          />
                      </div>
                      <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create an account</button>
                      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                          Already have an account? <Link to='/login' className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                      </p>
                  </form>
              </div>
          </div>
      </div>
      <Toaster />
    </section>
  

  )
}

export default Signup