import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Globe,
  Archive as ArchiveIcon,
  Pencil,
  Play,
  BookOpen,
  Clock,
  Plus,
  LogOut,
} from 'lucide-react'
import Sidebar from '../../../components/layout/instruct/Sidebar'
import TopBar from '../../../components/layout/instruct/TopBar'
import Modal from '../../../components/common/Modal'

type CourseStatus = 'Published' | 'Draft' | 'Archive'

interface Course {
  id: string
  title: string
  description: string
  status: CourseStatus
  lessons: number
  timeAgo: string
  image: string
  buttonText: string
}

const MOCK_COURSES: Course[] = [
  {
    id: '1',
    title: 'Wireframing & Prototyping',
    description: 'From lo-fi sketches to hi-fi Figma prototypes — the complete workflow.',
    status: 'Published',
    lessons: 30,
    timeAgo: '2 days ago',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&q=80',
    buttonText: 'Manage course',
  },
  {
    id: '2',
    title: 'Visual Design Principles',
    description: 'Typography, color theory, layout, and hierarchy for digital interfaces.',
    status: 'Archive',
    lessons: 20,
    timeAgo: '2 week ago',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&q=80',
    buttonText: 'Manage course',
  },
  {
    id: '3',
    title: 'Design System',
    description: 'Learn to create reusable components, styles, and guidelines for consistent user interfaces.',
    status: 'Draft',
    lessons: 30,
    timeAgo: '2 days ago',
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=500&q=80',
    buttonText: 'Manage course',
  },
  {
    id: '4',
    title: 'Information Architecture',
    description: 'Structure content and navigation for intuitive, scalable digital products.',
    status: 'Draft',
    lessons: 30,
    timeAgo: '3 days ago',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=500&q=80',
    buttonText: 'Manage course',
  },
  {
    id: '5',
    title: 'UX Research Fundamentals',
    description: 'Master the core methods of UX research from user interviews to usability testing.',
    status: 'Published',
    lessons: 30,
    timeAgo: '2 days ago',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&q=80',
    buttonText: 'Manage course',
  },
  {
    id: '6',
    title: 'Design Thinking Essentials',
    description: 'Apply design thinking frameworks to solve complex problems and drive innovation...',
    status: 'Draft',
    lessons: 30,
    timeAgo: '1 week ago',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500&q=80',
    buttonText: 'Manage course',
  },
]

const renderBadge = (status: CourseStatus) => {
  switch (status) {
    case 'Published':
      return (
        <div className="flex items-center gap-1 px-2.5 py-1 bg-white/95 backdrop-blur-sm rounded-full text-[11px] font-bold text-admin-success shadow-sm">
          <Globe size={12} />
          Published
        </div>
      )
    case 'Archive':
      return (
        <div className="flex items-center gap-1 px-2.5 py-1 bg-white/95 backdrop-blur-sm rounded-full text-[11px] font-bold text-admin-info shadow-sm">
          <ArchiveIcon size={12} />
          Archive
        </div>
      )
    case 'Draft':
      return (
        <div className="flex items-center gap-1 px-2.5 py-1 bg-white/95 backdrop-blur-sm rounded-full text-[11px] font-bold text-admin-secondary shadow-sm">
          <Pencil size={12} />
          Draft
        </div>
      )
  }
}

export default function InstructorCourses() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('All')
  const [logoutModalOpen, setLogoutModalOpen] = useState(false)

  const tabs = ['All', 'Published', 'Drafts', 'Archive']

  const handleLogout = () => {
    setLogoutModalOpen(true)
  }

  const filteredCourses = MOCK_COURSES.filter((course) => {
    if (activeTab === 'All') return true
    if (activeTab === 'Drafts') return course.status === 'Draft'
    return course.status === activeTab
  })

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <Sidebar
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
        onLogoutClick={handleLogout}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <TopBar onMenuClick={() => setMobileOpen(true)} onLogoutClick={handleLogout} />

        <main className="p-6 lg:p-8 space-y-8 max-w-[1400px] mx-auto w-full">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-admin-ink">Courses</h1>
            <p className="text-sm text-admin-ash-3">
              Manage your assigned courses, organize learning content, and keep course materials up to date.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-admin-ash-7/50 p-1.5 rounded-full w-max">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${activeTab === tab
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-[20px] p-4 border border-admin-ash-7 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] flex flex-col h-full"
              >
                <Link to={`/instructor/courses/${course.id}`} className="block relative h-36 w-full rounded-xl overflow-hidden mb-4 group cursor-pointer">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    {renderBadge(course.status)}
                  </div>
                  <div className="absolute inset-0 m-auto w-9 h-9 bg-admin-secondary/90 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                    <Play size={14} className="text-white fill-current ml-0.5" />
                  </div>
                </Link>

                <h3 className="text-[15px] font-bold text-admin-ink mb-1.5 line-clamp-1">
                  {course.title}
                </h3>
                <p className="text-sm text-admin-ash-3 line-clamp-2 leading-relaxed mb-5 flex-1">
                  {course.description}
                </p>

                <div className="flex items-center gap-5 text-sm text-admin-ash-3 mb-5">
                  <span className="flex items-center gap-1.5">
                    <BookOpen size={16} className="text-admin-ash-5" />
                    {course.lessons} lessons
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={16} className="text-admin-ash-5" />
                    {course.timeAgo}
                  </span>
                </div>

                <Link
                  to={`/instructor/courses/${course.id}`}
                  className="w-full block text-center py-2.5 rounded-xl border border-admin-ash-6 text-sm font-medium text-admin-ash-1 hover:bg-admin-ash-7/40 transition-colors"
                >
                  {course.buttonText}
                </Link>
              </div>
            ))}

            <div className="rounded-[20px] border-2 border-dashed border-admin-ash-6 p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-admin-ash-7/20 hover:border-admin-purple/40 transition-colors min-h-[320px]">
              <Link to="/instructor/CreateCourse" className='w-full flex flex-col justify-center items-center'>
                <div className="w-14 h-14 rounded-full bg-admin-purple-light text-admin-purple flex items-center justify-center mb-4 transition-transform hover:scale-105">
                  <Plus size={24} />
                </div>
                <span className="font-bold text-[15px] text-admin-ink">
                  Create Course
                </span>
              </Link>
            </div>
          </div>
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
