import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import useAxiosPrivate  from '../hooks/useAxiosPrivate';
import { IMAGE_BASE_URL } from '../constants/constants';
import { useLocation, useNavigate } from 'react-router-dom';

function Profile() {
  const axiosPrivate = useAxiosPrivate()
  const [userData, setUserData] = useState({})
  const [image, setImage] = useState(null)
  const authstate = useSelector((state)=> state.auth)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    
    axiosPrivate.get(`/user/getuser?name=${authstate.user}`)
    .then((res)=>{
      setUserData(res?.data?.user)
      console.log(res?.data?.user);
    })
  }, []);

  const handleSubmit = () =>{
    if(!image){
      alert("no image")
      return
    }

    
    const postData = {
      id: userData._id,
      image
    }

    axiosPrivate.post("/user/image",postData,{
      headers: {'Content-Type': 'multipart/form-data'}
    })
    .then((res)=>{
      alert("success")
    })

  }

  return (
    <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-sm bg-white rounded-lg shadow-xl">
          <form encType='multipart/form-data' className="flex justify-end px-4 pt-4">
            <button
              id="dropdownButton"
              className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
              type="button"
            >
              <span className="sr-only">Open dropdown</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 3"
              >
                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
              </svg>
            </button>
            {/* Dropdown menu */}
            <div
              id="dropdown"
              className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
            >
              <ul className="py-2" aria-labelledby="dropdownButton">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Edit
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover-bg-gray-100 dark:hover-bg-gray-600 dark:text-gray-200 dark:hover-text-white"
                  >
                    Export Data
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover-bg-gray-600 dark:text-gray-200 dark:hover-text-white"
                  >
                    Delete
                  </a>
                </li>
              </ul>
            </div>
          </form>
          <div className="flex flex-col items-center pb-10">
            {'userData' && (
              <img
                 // Access the image URL from the userData object
                src={image ? URL.createObjectURL(image) : IMAGE_BASE_URL+userData.profileImage}
                className="w-24 h-24 mb-3 rounded-full shadow-lg"
                alt="profile picture"
                onError={() => {
                  console.log("Error loading image");
                //   console.log("Image URL:", userData.profile_img);
                }}
              />
            )}

            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-dark">
              {userData ? userData.name : ""}
            </h5>
            <span className="text-sm text-gray-900 dark:text-gray-900 font-medium">
              {userData ? userData.email : ""}
            </span>
            <div className="flex mt-4 space-x-3 md:mt-6">
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="imageInput"
                style={{ display: "none" }}
              />

              <label
                htmlFor="imageInput"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Change Image
              </label>

              <p
                onClick={handleSubmit}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
              >
                Submit Image
              </p>
            </div>
            <p onClick={()=> navigate("/")} className='mt-4 font-medium border-2 border-gray-600 px-2 py-1 rounded bg-gray-600 text-white cursor-pointer'>Back</p>
          </div>
        </div>
        <div>
        </div>
      </div>
  )
}

export default Profile