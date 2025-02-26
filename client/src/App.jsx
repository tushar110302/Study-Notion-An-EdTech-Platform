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
import Error from "./pages/Error"
import { Settings } from "./components/Dashboard/Settings"
import EnrolledCourse from "./components/Dashboard/EnrolledCourse"
import Cart from "./components/Dashboard/Cart"
import { useSelector } from "react-redux"
import AddCourse from "./components/Dashboard/AddCourse"
import { ACCOUNT_TYPE } from "./utils/constants"
import MyCourses from "./components/Dashboard/MyCourses"
import EditCourse from "./components/Dashboard/EditCourse"
import Catalog from "./pages/Catalog"
import CourseDetails from "./pages/CourseDetails"

function App() {
  const {user} = useSelector(state => state.profile);
  return (
    <div className="w-screen min-h-screen overflow-y-clip bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/catalog/:catalogName" element={<Catalog />} />
        <Route path="/courses/:courseId" element={<CourseDetails />} />
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
          <Route path="settings" element={<Settings />} />

          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && 
              <>
                <Route path="add-course"  element={<AddCourse/>}/>
                <Route path="my-courses"  element={<MyCourses/>}/>
                <Route path="instructor"  element={<Cart/>}/>
                <Route path="edit-course/:courseId" element={<EditCourse />}/>
              </>
          }
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && 
              <>
                <Route path="enrolled-courses"  element={<EnrolledCourse/>}/>
                <Route path="cart"  element={<Cart/>}/>
              </>
          }

        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
     
    </div>
  )
}

export default App
