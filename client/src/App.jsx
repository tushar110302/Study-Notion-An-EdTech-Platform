import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ForgotPassword from "./pages/ForgotPassword"
import UpdatePassword from "./pages/UpdatePassword"
import VerifyEmail from "./pages/VerifyEmail"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./components/Auth/ProtectedRoute"
import OpenRoute from "./components/Auth/OpenRoute"
import Profile from "./components/Dashboard/Profile"
import Course from "./pages/Course"
import Error from "./pages/Error"

function App() {

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/update-password/:id" 
          element={
            <OpenRoute>
              <UpdatePassword />
             </OpenRoute>
          }
        />
        <Route path="/verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />
        <Route path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="my-profile"  element={<Profile/>}/>
          <Route path="enrolled-courses"  element={<Course/>}/>

        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
     
    </div>
  )
}

export default App
