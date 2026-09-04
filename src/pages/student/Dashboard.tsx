import React, { useState, useEffect, useCallback } from 'react'
import { SlidersHorizontal, ArrowUpDown, ArrowRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import StatCard from '../../components/ui/StatCard'
import CourseCard from '../../components/ui/CourseCard'
import AssignmentRow from '../../components/ui/AssignmentRow'
import PopularCourseCard from '../../components/ui/PopularCourseCard'
import EmptyState from '../../components/ui/EmptyState'
import AllCoursesCatalog, { type CourseItem } from '../../components/ui/AllCoursesCatalog'
import { dashboardService } from '../../services/dashboardService'
import { useAuth } from '../../context/AuthContext'
import type { DashboardData, UpcomingItem, ContinueLearningItem } from '../../types/dashboard'

interface EnrolledCourse {
  title: string
  instructor: string
  progress: number
  tags: string[]
  duration: string
}

const fallbackPopularCourses = [
  {
    id: 'graphic-design-fundamentals',
    title: 'Graphic Design Fundamentals',
    bannerUrl: '/courses/graphic-design.jpg',
    outline: [
      'Design Principles & Visual Hierarchy',
      'Typography & Font Pairing',
      'Colour Theory',
      'Social Media & Marketing Design',
    ],
    instructor: {
      name: 'Grace Johnson',
      role: 'Senior Visual Designer',
      company: 'Canva',
      avatarUrl: '/rita.png',
      rating: 4.9,
    },
  },
  {
    id: 'uiux-design-masterclass',
    title: 'UI/UX Design Masterclass',
    bannerUrl: '/courses/uiux-masterclass.jpg',
    outline: [
      'Introduction to UX Design',
      'User Research & Personas',
      'User Flows & Information Architecture',
      'Wireframing',
    ],
    instructor: {
      name: 'Grace Johnson',
      role: 'Senior Visual Designer',
      company: 'Canva',
      avatarUrl: '/rita.png',
      rating: 4.9,
    },
  },
  {
    id: 'professional-video-editing',
    title: 'Professional Video Editing',
    bannerUrl: '/courses/video-editing.jpg',
    outline: [
      'Video Editing Fundamentals',
      'Storytelling & Visual Narrative',
      'Timeline & Cutting Techniques',
      'Colour Correction & Grading',
    ],
    instructor: {
      name: 'Grace Johnson',
      role: 'Senior Visual Designer',
      company: 'Canva',
      avatarUrl: '/rita.png',
      rating: 4.9,
    },
  },
  {
    id: 'affinity-designer-essentials',
    title: 'Affinity Designer Essentials',
    bannerUrl: '/courses/affinity-designer.jpg',
    outline: [
      'Getting Started with Affinity Designer',
      'Vector & Raster Workflows',
      'Shapes, Paths & Curves',
      'Typography & Layout',
    ],
    instructor: {
      name: 'Grace Johnson',
      role: 'Senior Visual Designer',
      company: 'Canva',
      avatarUrl: '/rita.png',
      rating: 4.9,
    },
  },
]

const Dashboard: React.FC = () => {
  const { user: authUser, updateUser } = useAuth()

  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>(() => {
    try {
      const saved = localStorage.getItem('talent_faculty_enrolled_courses')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })
  const [upcomingAssignments, setUpcomingAssignments] = useState<UpcomingItem[]>([])
  const [upcomingAssessments, setUpcomingAssessments] = useState<UpcomingItem[]>([])

  const [viewMode, setViewMode] = useState<'dashboard' | 'all-courses'>('dashboard')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type })
    setTimeout(() => {
      setToastMessage(null)
    }, 4000)
  }

  const fetchDashboard = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await dashboardService.getDashboardData()
      const dataItem = Array.isArray(response.data) ? response.data[0] : response.data

      if (dataItem) {
        setDashboardData(dataItem)

        if (dataItem.user && (!authUser?.first_name || dataItem.user.id === authUser?.id)) {
          updateUser(dataItem.user)
        }

        if (dataItem.continue_learning && dataItem.continue_learning.length > 0) {
          const courses: EnrolledCourse[] = dataItem.continue_learning.map((c: ContinueLearningItem) => ({
            title: c.title,
            instructor: c.instructor || 'Grace Johnson',
            progress: c.progress || 0,
            tags: c.tags || ['Design'],
            duration: c.duration || '20 mins',
          }))
          setEnrolledCourses(courses)
          try {
            localStorage.setItem('talent_faculty_enrolled_courses', JSON.stringify(courses))
          } catch { }
        }

        if (dataItem.upcoming_assignments) {
          setUpcomingAssignments(dataItem.upcoming_assignments)
        }
        if (dataItem.upcoming_assessments) {
          setUpcomingAssessments(dataItem.upcoming_assessments)
        }
      }
    } catch {
      // Fallback gracefully
    } finally {
      setIsLoading(false)
    }
  }, [authUser?.first_name, authUser?.id, updateUser])

  useEffect(() => {
    fetchDashboard()
  }, [fetchDashboard])

  const handleEnrollCourse = async (course: { title: string; instructor?: { name: string } } | CourseItem) => {
    try {
      await dashboardService.enrollCohort({ cohort_id: 2, track_id: 3 }).catch(() => null)

      const instructorName = typeof course.instructor === 'object' ? course.instructor.name : 'Grace Johnson'
      const newCourse: EnrolledCourse = {
        title: course.title,
        instructor: instructorName,
        progress: 0,
        tags: ['Design'],
        duration: '20 mins',
      }

      setEnrolledCourses((prev) => {
        const updated = [newCourse, ...prev]
        try {
          localStorage.setItem('talent_faculty_enrolled_courses', JSON.stringify(updated))
        } catch { }
        return updated
      })
      showToast(`Successfully enrolled in "${course.title}"!`)
    } catch (err: unknown) {
      const apiErr = err as { message?: string }
      showToast(apiErr?.message || 'Could not complete enrollment', 'error')
    }
  }

  const hasEnrollments = enrolledCourses.length > 0
  const metrics = dashboardData?.metrics

  const calculatedOverallProgress = metrics?.overall_progress != null
    ? metrics.overall_progress
    : hasEnrollments
      ? Math.round(enrolledCourses.reduce((acc, c) => acc + (c.progress || 0), 0) / enrolledCourses.length)
      : 0

  const calculatedPending = metrics?.pending_assignments_count != null
    ? metrics.pending_assignments_count
    : upcomingAssignments.length

  const calculatedAverage = metrics?.assessment_average != null
    ? metrics.assessment_average
    : hasEnrollments
      ? Math.round(enrolledCourses.reduce((acc, c) => acc + (c.progress || 0), 0) / enrolledCourses.length)
      : 0

  const calculatedStreak = metrics?.learning_streak_days != null
    ? metrics.learning_streak_days
    : hasEnrollments
      ? 1
      : 0

  const stats = {
    overall: `${calculatedOverallProgress}%`,
    pending: `${calculatedPending}`,
    average: `${calculatedAverage}%`,
    streak: `${calculatedStreak} ${calculatedStreak === 1 ? 'Day' : 'Days'}`,
  }

  const learnerName = authUser?.first_name || dashboardData?.user?.first_name || authUser?.username || 'Learner'

  return (
    <DashboardLayout
      title={`Good Morning, ${learnerName} 👋`}
      subtitle="Continue your learning journey and stay on track!"
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl animate-fade-in ${toastMessage.type === 'error' ? 'bg-red-600 text-white' : 'bg-[#057834] text-white'
            }`}
        >
          {toastMessage.type === 'error' ? (
            <AlertCircle size={20} className="text-white shrink-0" />
          ) : (
            <CheckCircle2 size={20} className="text-white shrink-0" />
          )}
          <span className="text-sm font-semibold">{toastMessage.text}</span>
        </div>
      )}

      {/* Main View Router inside Dashboard */}
      {viewMode === 'all-courses' ? (
        <AllCoursesCatalog
          onBack={() => setViewMode('dashboard')}
          onEnrollCourse={handleEnrollCourse}
        />
      ) : (
        <div className="space-y-8 animate-fade-in">
          {/* Stats Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Overall Progress" value={stats.overall} variant="green" />
            <StatCard label="Pending Assignments" value={stats.pending} variant="red" />
            <StatCard label="Assessment Average" value={stats.average} variant="blue" />
            <StatCard label="Learning Streak" value={stats.streak} variant="orange" />
          </div>

          {/* Conditional Middle Section */}
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="animate-spin text-primary" size={32} />
            </div>
          ) : hasEnrollments ? (
            <>
              {/* Active Enrolled Courses */}
              <section>
                <div className="mb-4">
                  <h2 className="text-lg font-bold text-neutral-900 mb-1">Continue Learning</h2>
                  <p className="text-sm text-neutral-500">
                    Pick up where you left off and continue progressing through your active courses.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                  {enrolledCourses.map((course, idx) => (
                    <CourseCard key={idx} {...course} />
                  ))}
                </div>
              </section>

              {/* Assignments & Assessments Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-3xl border border-neutral-100 p-6 shadow-xs">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-neutral-900">Upcoming Assignments</h3>
                    <button className="text-xs font-bold text-[#057834] hover:underline cursor-pointer">
                      View All
                    </button>
                  </div>
                  <div className="divide-y divide-neutral-100">
                    {upcomingAssignments.length > 0 ? (
                      upcomingAssignments.map((item, idx) => (
                        <AssignmentRow key={idx} title={item.title} date={item.date || item.due_date || 'Upcoming'} />
                      ))
                    ) : (
                      <p className="text-xs text-neutral-400 py-6 text-center">No pending assignments</p>
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-neutral-100 p-6 shadow-xs">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-neutral-900">Upcoming Assessments</h3>
                    <button className="text-xs font-bold text-[#057834] hover:underline cursor-pointer">
                      View All
                    </button>
                  </div>
                  <div className="divide-y divide-neutral-100">
                    {upcomingAssessments.length > 0 ? (
                      upcomingAssessments.map((item, idx) => (
                        <AssignmentRow key={idx} title={item.title} date={item.date || 'Upcoming'} />
                      ))
                    ) : (
                      <p className="text-xs text-neutral-400 py-6 text-center">No upcoming assessments</p>
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* First Time Empty Explore Section */
            <section className="bg-white rounded-3xl border border-neutral-100 p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-neutral-900 mb-1">Explore Courses</h2>
                  <p className="text-sm text-neutral-500">
                    Discover courses designed to help you build new skills and deepen your knowledge.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setViewMode('all-courses')}
                  className="rounded-full bg-[#057834] px-6 py-3 text-sm font-bold text-white hover:bg-[#04632b] transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  <ArrowRight size={16} />
                  <span>Find Your Next Skill</span>
                </button>
              </div>

              <EmptyState onActionClick={() => setViewMode('all-courses')} />
            </section>
          )}

          {/* Popular Courses Section */}
          <section>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-lg font-bold text-neutral-900 mb-1">Popular Courses</h2>
                <p className="text-sm text-neutral-500">
                  See what other learners are currently exploring and building their skills with.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setViewMode('all-courses')}
                  className="rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition flex items-center gap-2 cursor-pointer shadow-2xs"
                >
                  <SlidersHorizontal size={14} className="text-neutral-500" />
                  <span>Filter</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('all-courses')}
                  className="rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition flex items-center gap-2 cursor-pointer shadow-2xs"
                >
                  <ArrowUpDown size={14} className="text-neutral-500" />
                  <span>Sort</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('all-courses')}
                  className="rounded-full bg-[#057834] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#04632b] transition flex items-center gap-2 cursor-pointer shadow-sm hover:shadow-md"
                >
                  <ArrowRight size={14} />
                  <span>View More</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
              {fallbackPopularCourses.map((course) => (
                <PopularCourseCard
                  key={course.id}
                  title={course.title}
                  bannerUrl={course.bannerUrl}
                  outline={course.outline}
                  instructor={course.instructor}
                  onEnroll={() => handleEnrollCourse(course)}
                />
              ))}
            </div>
          </section>
        </div>
      )}
    </DashboardLayout>
  )
}

export default Dashboard