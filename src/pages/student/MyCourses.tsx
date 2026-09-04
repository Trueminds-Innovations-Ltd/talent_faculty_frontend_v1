import React, { useState, useEffect, useCallback } from 'react'
import { Search, SlidersHorizontal, ArrowUpDown, Loader2 } from 'lucide-react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import CourseListItem from '../../components/ui/CourseListItem'
import CourseView from '../../components/ui/CourseView'
import { dashboardService } from '../../services/dashboardService'

type TabKey = 'all' | 'active' | 'completed' | 'bookmarked'

interface Course {
  id: number | string
  title: string
  instructor: string
  progress: number
  totalLectures: number
  completedLectures: number
  status: TabKey
}

const defaultCourses: Course[] = [
  { id: 1, title: 'UI/UX Design Fundamentals', instructor: 'Grace Johnson', progress: 100, totalLectures: 38, completedLectures: 38, status: 'completed' },
  { id: 2, title: 'Front-end Development Essentials', instructor: 'Grace Johnson', progress: 68, totalLectures: 38, completedLectures: 26, status: 'active' },
  { id: 3, title: 'Backend API Architecture', instructor: 'Grace Johnson', progress: 74, totalLectures: 40, completedLectures: 30, status: 'active' },
  { id: 4, title: 'Product Strategy & Wireframing', instructor: 'Grace Johnson', progress: 52, totalLectures: 38, completedLectures: 15, status: 'active' },
  { id: 5, title: 'Design Systems at Scale', instructor: 'Grace Johnson', progress: 0, totalLectures: 31, completedLectures: 0, status: 'active' },
  { id: 6, title: 'Affinity Designer Masterclass', instructor: 'Grace Johnson', progress: 0, totalLectures: 38, completedLectures: 0, status: 'bookmarked' },
]

const mapRawCourse = (c: any, index: number): Course => {
  const title = typeof c?.title === 'string' ? c.title : (c?.title?.name || c?.name || 'Untitled Course')
  const instName = typeof c?.instructor === 'object' ? (c?.instructor?.name || 'Grace Johnson') : (c?.instructor || 'Grace Johnson')
  const prog = typeof c?.progress === 'number' ? c.progress : 0
  const statusVal = (c?.status as TabKey) || (prog === 100 ? 'completed' : 'active')

  return {
    id: c?.id || c?.uuid || index + 1,
    title,
    instructor: String(instName),
    progress: prog,
    totalLectures: c?.totalLectures ?? c?.total_lectures ?? 30,
    completedLectures: c?.completedLectures ?? c?.completed_lectures ?? 0,
    status: ['all', 'active', 'completed', 'bookmarked'].includes(statusVal) ? statusVal : 'active',
  }
}

const MyCourses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>(() => {
    try {
      const saved = localStorage.getItem('talent_faculty_enrolled_courses')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(mapRawCourse)
        }
      }
    } catch { }
    return defaultCourses
  })
  const [activeTab, setActiveTab] = useState<TabKey>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchCourses = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await dashboardService.getMyCourses({
        search: searchQuery,
        status: activeTab !== 'all' ? activeTab : undefined,
      })

      if (response?.data && Array.isArray(response.data) && response.data.length > 0) {
        setCourses(response.data.map(mapRawCourse))
      }
    } catch {
      // Fall back gracefully
    } finally {
      setIsLoading(false)
    }
  }, [searchQuery, activeTab])

  useEffect(() => {
    fetchCourses()
  }, [fetchCourses])

  const filteredCourses = courses.filter((course) => {
    const matchesTab = activeTab === 'all' || course?.status === activeTab
    const matchesSearch = (course?.title || '').toLowerCase().includes((searchQuery || '').toLowerCase())
    return matchesTab && matchesSearch
  })

  const counts = {
    all: courses.length,
    active: courses.filter((c) => c?.status === 'active').length,
    completed: courses.filter((c) => c?.status === 'completed').length,
    bookmarked: courses.filter((c) => c?.status === 'bookmarked').length,
  }

  const tabs: { key: TabKey; label: string; count: number }[] = [
    { key: 'all', label: 'All', count: counts.all },
    { key: 'active', label: 'Active', count: counts.active },
    { key: 'completed', label: 'Completed', count: counts.completed },
    { key: 'bookmarked', label: 'Bookmarked', count: counts.bookmarked },
  ]

  return (
    <DashboardLayout title="My Courses" subtitle="Manage and continue all your enrolled courses.">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex items-center bg-white border border-neutral-100 rounded-xl px-4 py-3 shadow-2xs">
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
            <button className="flex items-center gap-2 px-4 py-3 bg-white border border-neutral-100 rounded-xl text-sm font-medium text-neutral-600 hover:bg-neutral-50 transition-colors shadow-2xs cursor-pointer">
              <SlidersHorizontal size={16} />
              <span className="hidden sm:inline">Filter</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-3 bg-white border border-neutral-100 rounded-xl text-sm font-medium text-neutral-600 hover:bg-neutral-50 transition-colors shadow-2xs cursor-pointer">
              <ArrowUpDown size={16} />
              <span className="hidden sm:inline">Sort</span>
            </button>
          </div>
        </div>

        {!selectedCourse && (
          <div className="flex gap-6 border-b border-neutral-100">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`pb-3 text-sm font-medium transition-colors relative cursor-pointer ${activeTab === tab.key ? 'text-primary font-bold' : 'text-neutral-400 hover:text-neutral-600'
                  }`}
              >
                {tab.label} ({tab.count})
                {activeTab === tab.key && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />}
              </button>
            ))}
          </div>
        )}

        <div className="bg-white rounded-2xl border border-neutral-100 px-5 py-2 shadow-2xs">
          {isLoading ? (
            <div className="py-16 flex justify-center items-center">
              <Loader2 className="animate-spin text-primary" size={28} />
            </div>
          ) : selectedCourse ? (
            <CourseView course={selectedCourse as any} onBack={() => setSelectedCourse(null)} />
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
            <div className="py-16 text-center">
              <p className="text-sm font-medium text-neutral-500">No courses found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default MyCourses