import { Routes, Route, Navigate } from 'react-router-dom'
import App from '../App'
import Login from '../pages/auth/Login'
import Signup1 from '../pages/auth/Signup1.tsx'
import Signup4 from '../pages/auth/Signup4'
import Signup11 from '../pages/auth/Signup11'
import Dashboard from '../pages/student/Dashboard'
import MyCourses from '../pages/student/MyCourses'
import Signup3 from '../pages/auth/Signup3.tsx'
import Signup6 from '../pages/auth/Signup6'
import Signup9 from '../pages/auth/Signup9'
import Signup10 from '../pages/auth/Signup10.tsx'
import Messages from '../pages/student/Messages.tsx'
import Notifications from '../pages/student/Notifications.tsx'
import MyProfile from '../pages/student/MyProfile.tsx'
import Settings from '../pages/student/Settings.tsx'
import Help$Support from '../pages/student/Help & Support.tsx'
import Welcome from '../pages/auth/Welcome.tsx'
import PasswordReset from '../pages/auth/PasswordReset.tsx'
import Progress from '../pages/student/Progress'
import Certificates from '../pages/student/Certificates'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup1" element={<Signup1 />} />
      {/* Student sign up flow */}
      <Route path="/signup4" element={<Signup4 />} />
      <Route path="/signup3" element={<Signup3 />} />
      <Route path="/signup10" element={<Signup10 />} />
      <Route path="/welcome" element={<Welcome />} />

      {/* Password reset flow: Request -> Verify -> Reset */}
      <Route path="/passwordReset" element={<PasswordReset />} />
      <Route path="/signup6" element={<Signup6 />} />
      <Route path="/signup9" element={<Signup9 />} />

      {/* Tutor / faculty sign up flow */}
      <Route path="/signup11" element={<Signup11 />} />

      {/* Legacy generic /signup link -> send to the student sign up flow */}
      <Route path="/signup" element={<Navigate to="/signup1" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />

      {/* Student Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/courses" element={<MyCourses />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/profile" element={<MyProfile />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/help" element={<Help$Support />} />
      <Route path="/progress" element={<Progress />} />
      <Route path="/certificates" element={<Certificates />} />


    </Routes>
  )
}

export default AppRoutes
