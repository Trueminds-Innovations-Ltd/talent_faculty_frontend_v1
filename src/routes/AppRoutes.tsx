import { Routes, Route, Navigate } from 'react-router-dom'
import App from '../App'
import Login from '../pages/auth/Login'
import Signup1 from '../pages/auth/Signup1.tsx'
import Signup4 from '../pages/auth/Signup4'
import Signup11 from '../pages/auth/Signup11'
import Dashboard from '../pages/student/Dashboard'
import MyCourses from '../pages/student/MyCourses'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup1" element={<Signup1 />} />
      {/* Student sign up flow */}
      <Route path="/signup4" element={<Signup4 />} />
      {/* Tutor / faculty sign up flow */}
      <Route path="/signup11" element={<Signup11 />} />
      {/* Legacy generic /signup link -> send to the student sign up flow */}
      <Route path="/signup" element={<Navigate to="/signup1" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
      {/* Student Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/courses" element={<MyCourses />} />
    </Routes>
  )
}

export default AppRoutes
