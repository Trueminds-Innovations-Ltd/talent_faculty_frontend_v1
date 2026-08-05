import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Globe, Eye, Save, EyeOff } from 'lucide-react'
import Sidebar from '../../components/layout/instruct/Sidebar'
import TopBar from '../../components/layout/instruct/TopBar'
import CourseDetailsTab from '../../components/common/instructor/CourseDetailsTab'
import ModulesLessonsTab from '../../components/common/instructor/ModulesLessonsTab'

export default function ManageCourse() {
  const navigate = useNavigate()

  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('Course details')

  const tabs = ['Course details', 'Modules / lessons', 'Activities', 'Resources']

  const handleLogout = () => {
    console.log('Logging out...')
  }

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <Sidebar
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
        onLogoutClick={handleLogout}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-white">
        <TopBar onMenuClick={() => setMobileOpen(true)} />

        <main className="p-6 lg:p-10 space-y-8 max-w-[1200px] w-full mx-auto">
          <button 
            onClick={() => navigate('/instructor/courses')}
            className="flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-emerald-700 transition-colors"
          >
            <ChevronLeft size={18} />
            Back to Courses
          </button>

          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-900">UX Research Fundamentals</h1>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-white border border-emerald-500 rounded-full text-xs font-bold text-emerald-600">
                  <Globe size={14} />
                  Published
                </div>
              </div>
              <p className="text-[15px] text-gray-400">
                Master the core methods of UX research from user interviews to usability testing.
              </p>
              
              <div className="flex flex-wrap items-center gap-6 text-xs text-gray-400 font-medium">
                <span>10 modules</span>
                <span>36 lessons</span>
                <span>36/36 Published</span>
                <span>updated just now</span>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <div className="h-2 flex-1 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-700 rounded-full w-[93%]" />
                </div>
                <span className="text-xs font-bold text-gray-500 whitespace-nowrap">93% saved</span>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 max-md:flex-col">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors max-md:w-full max-md:justify-center">
                <Eye size={16} />
                Preview Course
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors max-md:w-full max-md:justify-center">
                <Save size={16} />
                Save changes
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-lg border border-orange-100 text-sm font-bold text-orange-400 hover:bg-orange-100 transition-colors max-md:w-full max-md:justify-center">
                <EyeOff size={16} />
                Unpublish
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-full md:w-max mt-4 max-md:overflow-x-auto max-md:w-full">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap shrink-0 px-6 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'Course details' && <CourseDetailsTab />}
          
          {activeTab === 'Modules / lessons' && <ModulesLessonsTab />}

          {activeTab === 'Activities' && (
            <div className="py-12 text-center text-gray-400 font-medium text-sm">
              Activities content coming soon.
            </div>
          )}

          {activeTab === 'Resources' && (
            <div className="py-12 text-center text-gray-400 font-medium text-sm">
              Resources content coming soon.
            </div>
          )}
        </main>
      </div>
    </div>
  )
}