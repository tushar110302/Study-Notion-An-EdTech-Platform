import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ForgotPassword from "./pages/ForgotPassword"
import UpdatePassword from "./pages/UpdatePassword"
import VerifyEmail from "./pages/VerifyEmail"
import About from "./pages/About"

function App() {

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/update-password/:id" 
          element={
            // <OpenRoute>
              <UpdatePassword />
            // </OpenRoute>
          }
        />
        <Route path="verify-email"
          element={
            // <OpenRoute>
              <VerifyEmail />
            // </OpenRoute>
          }
        />
      </Routes>
     
    </div>
  )
}

export default App
