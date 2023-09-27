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

function App() {

  return (
    <>
    
      <Routes>
        <Route path='/' element={<Layout />} >
          {/* public routes */}
          {/* <Route element={<CheckAuth allows={true} /> }> */}
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<Signup />} />
          {/* </Route> */}
          
          <Route path='error' element={<ErrorPage />} />

          {/* protected routes */}
          <Route element={<RequireAuth allows={false} />}>
            <Route path='/' element={<Home />} />
          </Route>

          <Route element={<RequireAuth allows={true} />}>
            <Route path='/admin' element={<Admin />} />
          </Route>

        </Route>
      </Routes>
    
    </>
  )
}

export default App
