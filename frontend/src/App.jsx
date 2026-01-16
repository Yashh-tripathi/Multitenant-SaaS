import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import {Register }from './components/Register.jsx'
import { Login } from './components/Login.jsx'
import { Home } from './components/Home.jsx'
import { ProtectedRoute } from './components/ProtectedRoute.jsx'
import { Console } from './components/Console.jsx'
import { IAM } from './components/IAM.jsx'
import Blog from './components/Blog.jsx'
import { BlogView } from './components/BlogView.jsx'
import ConsoleLayout from './components/ConsoleLayout.jsx'
import PendingRequests from './components/PendingRequests.jsx'
import { About } from './components/About.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes> 

        {/* Public Routes  */}

        <Route path='/' element={<Home/>} />
        <Route path='/register' element={<Register/>}  />
        <Route path='/login' element={<Login/>}  />
        <Route path='/about' element={<About/>} />

        {/* Protected Routes  */}


        <Route
          path="/console"
          element={
            <ProtectedRoute>
              <ConsoleLayout />
            </ProtectedRoute>
          }
        >

        
        <Route path='/console' element={
         
            <Console/>
        
        }/>

        <Route
          path="/console/iam"
          element={
        
              <IAM/>
         
          }
        />

        <Route
          path="/console/org/:orgId/blogs"
          element={
            
              <Blog />
           
          }
        />

        <Route
          path="/console/org/:orgId/blogs/:blogId"
          element={
            
              <BlogView />
          
          }
        />
        <Route
  path="org/:orgId/pending-requests"
  element={<PendingRequests />}
/>


    </Route>

      </Routes>
    </>
  )
}

export default App
