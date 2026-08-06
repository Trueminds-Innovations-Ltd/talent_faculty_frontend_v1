import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Globe, Eye, Save, EyeOff, LogOut } from 'lucide-react'
import Sidebar from '../../components/layout/instruct/Sidebar'
import TopBar from '../../components/layout/instruct/TopBar'
import Modal from '../../components/common/Modal'
import CourseDetailsTab from '../../components/common/instructor/CourseDetailsTab'
import ModulesLessonsTab from '../../components/common/instructor/ModulesLessonsTab'

const tabs = ['Course details', 'Modules / lessons', 'Activities', 'Resources'] as const
type Tab = (typeof tabs)[number]

export default function ManageCourse() {
  const navigate = useNavigate()

  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>('Course details')
  const [logoutModalOpen, setLogoutModalOpen] = useState(false)

  const handleLogout = () => {
    setLogoutModalOpen(true)
  }

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <Sidebar
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
        onLogoutClick={handleLogout}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-white">
        <TopBar onMenuClick={() => setMobileOpen(true)} onLogoutClick={handleLogout} />
        
        <main className="p-6 lg:p-10 space-y-8 max-w-full w-full mx-auto">
          <button
            onClick={() => navigate('/instructor/courses')}
            className="flex items-center gap-2 text-sm font-bold text-admin-ink hover:text-admin-primary transition-colors"
          >
            <ChevronLeft size={18} />
            Back to Courses
          </button>

          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-4 flex-wrap">
                <h1 className="text-2xl font-bold text-admin-ink">UX Research Fundamentals</h1>
                <div className="flex items-center gap-1.5 rounded-full border border-admin-success/40 bg-white px-3 py-1 text-xs font-bold text-admin-success">
                  <Globe size={14} />
                  Published
                </div>
              </div>
              <p className="text-sm text-admin-ash-3">
                Master the core methods of UX research from user interviews to usability testing.
              </p>

              <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-admin-ash-3">
                <span>10 modules</span>
                <span>36 lessons</span>
                <span>36/36 Published</span>
                <span>updated just now</span>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <div className="h-2 flex-1 rounded-full bg-admin-ash-7 overflow-hidden">
                  <div className="h-full w-[93%] rounded-full bg-admin-primary" />
                </div>
                <span className="text-xs font-bold text-admin-ash-2 whitespace-nowrap">93% saved</span>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 max-md:flex-col max-md:w-full">
              <button className="flex items-center gap-2 rounded-lg border border-admin-ash-6 px-4 py-2 text-sm font-medium text-admin-ash-2 hover:bg-admin-ash-7/40 transition-colors max-md:w-full max-md:justify-center">
                <Eye size={16} />
                Preview Course
              </button>
              <button className="flex items-center gap-2 rounded-lg border border-admin-ash-6 px-4 py-2 text-sm font-medium text-admin-ash-2 hover:bg-admin-ash-7/40 transition-colors max-md:w-full max-md:justify-center">
                <Save size={16} />
                Save changes
              </button>
              <button className="flex items-center gap-2 rounded-lg border border-admin-secondary/20 bg-admin-secondary-light px-4 py-2 text-sm font-bold text-admin-secondary hover:bg-admin-secondary/20 transition-colors max-md:w-full max-md:justify-center">
                <EyeOff size={16} />
                Unpublish
              </button>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 rounded-full bg-admin-ash-7/50 p-1.5 md:w-max max-md:w-full max-md:overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`shrink-0 whitespace-nowrap rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-white text-admin-ink shadow-sm'
                    : 'text-admin-ash-3 hover:text-admin-ink'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'Course details' && <CourseDetailsTab />}

          {activeTab === 'Modules / lessons' && <ModulesLessonsTab />}

          {activeTab === 'Activities' && (
            <div className="py-12 text-center text-sm font-medium text-admin-ash-3">
              Activities content coming soon.
            </div>
          )}

          {activeTab === 'Resources' && (
            <div className="py-12 text-center text-sm font-medium text-admin-ash-3">
              Resources content coming soon.
            </div>
          )}
        </main>
      </div>

      <Modal isOpen={logoutModalOpen} onClose={() => setLogoutModalOpen(false)}>
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-admin-danger-light">
            <LogOut size={28} className="text-admin-danger" />
          </div>
          <h3 className="text-xl font-bold text-admin-ink mb-2">Log Out?</h3>
          <p className="text-sm text-admin-ash-3 mb-6 max-w-xs mx-auto">
            Are you sure you want to log out of your Talent Faculty account?
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => setLogoutModalOpen(false)}
              className="px-6 py-2.5 rounded-xl border border-admin-ash-6 text-sm font-semibold text-admin-ash-1 hover:bg-admin-ash-7/50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setLogoutModalOpen(false)
                window.location.href = '/login'
              }}
              className="px-6 py-2.5 rounded-xl bg-admin-primary text-sm font-semibold text-white hover:bg-admin-primary-dark transition-colors"
            >
              Yes, Log Out
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
