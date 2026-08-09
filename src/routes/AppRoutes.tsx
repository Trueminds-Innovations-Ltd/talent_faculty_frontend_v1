import { Routes, Route, Navigate } from 'react-router-dom'
import App from '../App'
import Login from '../pages/auth/Login'
import Signupemail from '../pages/auth/SignupEmail.tsx'
import SignupSubmitDetails from '../pages/auth/SignupSubmitDetails.tsx'
import Signup11 from '../pages/auth/Signup11'
import Dashboard from '../pages/student/Dashboard'
import MyCourses from '../pages/student/MyCourses'
import SignupVerifyEmail from '../pages/auth/SignupVerifyEmail.tsx'
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
import Assignments from '../pages/student/Assignment.tsx'
import Assessments from '../pages/student/Assessment.tsx'
import Progress from '../pages/student/Progress.tsx'
import Certificates from '../pages/student/Certificates.tsx'
import InstructorDashboard from '../pages/instructor/Dashboard.tsx'
import CreateCourse from '../pages/instructor/CreateCourse.tsx'
import AdminDashboard from '../pages/admin/Dashboard.tsx'
import AdminCourses from '../pages/admin/Courses.tsx'
import AdminUsers from '../pages/admin/Users.tsx'
import InstructorCourses from '../pages/instructor/courses/Courses.tsx'
import ManageCourse from '../pages/instructor/courses/ManageCourse.tsx'
import Assignment from '../pages/instructor/courses/Assignment.tsx'
import Quiz from '../pages/instructor/courses/Quiz.tsx'
import Pdf from '../pages/instructor/courses/Pdf.tsx'
import LinkResource from '../pages/instructor/courses/Link.tsx'
import VideoResource from '../pages/instructor/courses/Video.tsx'
import ReportsAnalytics from '../pages/instructor/courses/Report.tsx'


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup-email" element={<Signupemail />} />

      {/* Student sign up flow */}
      <Route path="/signup-verify-email" element={<SignupVerifyEmail />} />
      <Route path="/signup-submit-details" element={<SignupSubmitDetails />} />
      <Route path="/signup10" element={<Signup10 />} />
      <Route path="/welcome" element={<Welcome />} />

      {/* Password reset flow: Request -> Verify -> Reset */}
      <Route path="/passwordReset" element={<PasswordReset />} />
      <Route path="/signup6" element={<Signup6 />} />
      <Route path="/signup9" element={<Signup9 />} />

      {/* Tutor / faculty sign up flow */}
      <Route path="/signup11" element={<Signup11 />} />

      {/* Legacy generic /signup link -> send to the student sign up flow */}
      <Route path="/signup" element={<Navigate to="/signup-email" replace />} />
      <Route path="/signup-verify-email" element={<Navigate to="/signup-verify-email" replace />} />
      <Route path="/signup-submit-details" element={<Navigate to="/signup-submit-details" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />

      {/* Student Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/courses" element={<MyCourses />} />
      <Route path="/assignments" element={<Assignments />} />
      <Route path="/assessments" element={<Assessments />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/profile" element={<MyProfile />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/help" element={<Help$Support />} />
      <Route path="/progress" element={<Progress />} />
      <Route path="/certificates" element={<Certificates />} />

      {/* Admin */}
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/courses" element={<AdminCourses />} />
      <Route path="/admin/users" element={<AdminUsers />} />

      {/* Instructor Dashboard */}
      <Route path="/instructor" element={<Navigate to="/instructor/dashboard" replace />} />
      <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
      <Route path="/instructor/create-course" element={<CreateCourse />} />
      <Route path="/instructor/CreateCourse" element={<CreateCourse />} />
      <Route path="/instructor/courses" element={<InstructorCourses />} />
      <Route path="/instructor/courses/:courseId" element={<ManageCourse />} />
      <Route path="/instructor/courses/assignment" element={<Assignment />} />
      <Route path="/instructor/courses/quiz" element={<Quiz />} />
      <Route path="/instructor/courses/pdf" element={<Pdf />} />
      <Route path='/instructor/courses/link' element={<LinkResource />} />
      <Route path='/instructor/courses/video' element={<VideoResource />} />
      <Route path='/instructor/report' element={<ReportsAnalytics />} />



      {/* Catch-all route for unhandled paths */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRoutes
