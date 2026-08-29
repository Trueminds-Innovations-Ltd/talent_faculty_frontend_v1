import React, { useState } from 'react'
import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import CourseListItem from '../../components/ui/CourseListItem'
import CourseView from '../../components/ui/CourseView'

type TabKey = 'all' | 'active' | 'completed' | 'bookmarked'

interface Course {
  id: number
  title: string
  instructor: string
  progress: number
  totalLectures: number
  completedLectures: number
  status: TabKey
}

const allCourses: Course[] = [
  { id: 1, title: 'UI/UX Design Fundamentals', instructor: 'Grace Johnson', progress: 100, totalLectures: 38, completedLectures: 38, status: 'completed' },
  { id: 2, title: 'UI/UX Design Fundamentals', instructor: 'Grace Johnson', progress: 100, totalLectures: 38, completedLectures: 5, status: 'active' },
  { id: 3, title: 'UI/UX Design Fundamentals', instructor: 'Grace Johnson', progress: 74, totalLectures: 40, completedLectures: 30, status: 'active' },
  { id: 4, title: 'UI/UX Design Fundamentals', instructor: 'Grace Johnson', progress: 52, totalLectures: 38, completedLectures: 15, status: 'active' },
  { id: 5, title: 'UI/UX Design Fundamentals', instructor: 'Grace Johnson', progress: 0, totalLectures: 31, completedLectures: 6, status: 'active' },
  { id: 6, title: 'UI/UX Design Fundamentals', instructor: 'Grace Johnson', progress: 0, totalLectures: 38, completedLectures: 24, status: 'bookmarked' },
]

const tabs: { key: TabKey; label: string; count: number }[] = [
  { key: 'all', label: 'All', count: 6 },
  { key: 'active', label: 'Active', count: 4 },
  { key: 'completed', label: 'Completed', count: 2 },
  { key: 'bookmarked', label: 'Bookmarked', count: 1 },
]

const MyCourses: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const filteredCourses = allCourses.filter((course) => {
    const matchesTab = activeTab === 'all' || course.status === activeTab
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTab && matchesSearch
  })

  return (
    <DashboardLayout title="My Courses" subtitle="Manage and continue all your enrolled courses.">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex items-center bg-white border border-neutral-100 rounded-xl px-4 py-3">
            <Search size={18} className="text-neutral-400 mr-3" />
            <input
              type="text"
              placeholder="Search courses or lessons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm text-neutral-700 placeholder-neutral-400 outline-none"
            />
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-3 bg-white border border-neutral-100 rounded-xl text-sm font-medium text-neutral-600 hover:bg-neutral-50 transition-colors">
              <SlidersHorizontal size={16} />
              <span className="hidden sm:inline">Filter</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-3 bg-white border border-neutral-100 rounded-xl text-sm font-medium text-neutral-600 hover:bg-neutral-50 transition-colors">
              <ArrowUpDown size={16} />
              <span className="hidden sm:inline">Sort</span>
            </button>
          </div>
        </div>

        {!selectedCourse && <div className="flex gap-6 border-b border-neutral-100">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`pb-3 text-sm font-medium transition-colors relative ${activeTab === tab.key ? 'text-primary' : 'text-neutral-400 hover:text-neutral-600'
                }`}
            >
              {tab.label} ({tab.count})
              {activeTab === tab.key && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />}
            </button>
          ))}
        </div>}

        <div className="bg-white rounded-2xl border border-neutral-100 px-5">
          {selectedCourse ? (
            <CourseView course={selectedCourse} />
          ) : filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <CourseListItem
                key={course.id}
                title={course.title}
                instructor={course.instructor}
                progress={course.progress}
                onResume={() => setSelectedCourse(course)}
                totalLectures={course.totalLectures}
                completedLectures={course.completedLectures}
              />
            ))
          ) : (
            <div className="py-12 text-center">
              <p className="text-sm text-neutral-400">No courses found.</p>
            </div>
          )}

        </div>

      </div>
    </DashboardLayout>
  )
}

export default MyCourses