import { Route, Routes } from 'react-router-dom'
import './App.css'

import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import Layout from './components/layout'
import Admin from './pages/Admin'
import ErrorPage from './pages/ErrorPage'

import RequireAuth from './components/RequireAuth'
import CheckAuth from './components/checkAuth'
import Profile from './pages/Profile'
import Edit from './pages/Edit'
import Create from './pages/Create'

function App() {

  return (
    <>
    
      <Routes>
        <Route path='/' element={<Layout />} >
          {/* public routes */}
          <Route element={<CheckAuth />}>
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<Signup />} />
          </Route>


          {/* protected routes */}
          <Route element={<RequireAuth allows={false} />}>
            <Route path='/' element={<Home />} />
            <Route path='/profile' element={<Profile />} />
          </Route>

          <Route element={<RequireAuth allows={true} />}>
            <Route path='/admin' element={<Admin />} />
            <Route path='/edit' element={<Edit />} />
            <Route path='/create' element={<Create />} />
          </Route>

        </Route>
      </Routes>
    
    </>
  )
}

export default App
