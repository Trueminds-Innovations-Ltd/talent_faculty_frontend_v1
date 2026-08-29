import React, { useState } from 'react'
import { SlidersHorizontal, ArrowUpDown, ArrowRight, CheckCircle2 } from 'lucide-react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import StatCard from '../../components/ui/StatCard'
import CourseCard from '../../components/ui/CourseCard'
import AssignmentRow from '../../components/ui/AssignmentRow'
import PopularCourseCard from '../../components/ui/PopularCourseCard'
import EmptyState from '../../components/ui/EmptyState'
import AllCoursesCatalog, { type CourseItem } from '../../components/ui/AllCoursesCatalog'

interface EnrolledCourse {
  title: string
  instructor: string
  progress: number
  tags: string[]
  duration: string
}

const initialEnrolledCourses: EnrolledCourse[] = [
  { title: 'UI/UX Design Fundamentals', instructor: 'Grace Johnson', progress: 68, tags: ['UI/UX Design'], duration: '15 mins' },
  { title: 'UI/UX Design Fundamentals', instructor: 'Grace Johnson', progress: 68, tags: ['UI/UX Design'], duration: '15 mins' },
  { title: 'UI/UX Design Fundamentals', instructor: 'Grace Johnson', progress: 68, tags: ['UI/UX Design'], duration: '15 mins' },
  { title: 'UI/UX Design Fundamentals', instructor: 'Grace Johnson', progress: 68, tags: ['UI/UX Design'], duration: '15 mins' },
]

const upcomingAssignments = [
  { title: 'Wireframe Mobile Banking', date: 'Tomorrow' },
  { title: 'User Research Report', date: '2nd May, 2024' },
  { title: 'Design System Creation', date: '5th May, 2024' },
]

const upcomingAssessments = [
  { title: 'Design Thinking Quiz', date: 'Tomorrow', duration: '10 mins' },
  { title: 'UX Principles Test', date: '4th, May 2024', duration: '10 mins' },
]

const sharedInstructor = {
  name: 'Grace Johnson',
  role: 'Senior Visual Designer',
  company: 'Canva',
  avatarUrl: '/rita.png',
  rating: 4.9,
}

const popularCourses = [
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
    instructor: sharedInstructor,
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
    instructor: sharedInstructor,
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
    instructor: sharedInstructor,
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
    instructor: sharedInstructor,
  },
]

const Dashboard: React.FC = () => {
  // First time use shows first by default (no enrolled courses initially)
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([])
  const [viewMode, setViewMode] = useState<'dashboard' | 'all-courses'>('dashboard')
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const hasEnrollments = enrolledCourses.length > 0

  const stats = hasEnrollments
    ? { overall: '76%', pending: '3', average: '88%', streak: '12 Days' }
    : { overall: '0%', pending: '0', average: '0%', streak: '0 Day' }

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage(null)
    }, 4000)
  }

  const handleEnrollCourse = (course: { title: string; instructor?: { name: string } } | CourseItem) => {
    const instructorName = typeof course.instructor === 'object' ? course.instructor.name : 'Grace Johnson'
    const newCourse: EnrolledCourse = {
      title: course.title,
      instructor: instructorName,
      progress: 0,
      tags: ['Design'],
      duration: '20 mins',
    }

    setEnrolledCourses((prev) => [newCourse, ...prev])
    showToast(`Successfully enrolled in "${course.title}"!`)
  }

  return (
    <DashboardLayout
      title="Good Morning, Samuel 👋"
      subtitle="Continue your learning journey and stay on track!"
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#057834] text-white px-5 py-3.5 rounded-2xl shadow-xl animate-fade-in">
          <CheckCircle2 size={20} className="text-white shrink-0" />
          <span className="text-sm font-semibold">{toastMessage}</span>
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
          {/* Quick Demo State Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-neutral-50/80 border border-neutral-200/70 px-4 py-2.5 rounded-2xl">
            <div className="flex items-center gap-2">

              <span className="text-xs font-semibold text-neutral-700">
                Dashboard State: <strong className="text-neutral-900">{hasEnrollments ? 'Active Student (Enrolled)' : 'First Time Use (Default)'}</strong>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setEnrolledCourses([])}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${!hasEnrollments
                  ? 'bg-[#057834] text-white shadow-2xs'
                  : 'bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-100'
                  }`}
              >
                First-Time View
              </button>
              <button
                type="button"
                onClick={() => setEnrolledCourses(initialEnrolledCourses)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${hasEnrollments
                  ? 'bg-[#057834] text-white shadow-2xs'
                  : 'bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-100'
                  }`}
              >
                Active Student View
              </button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Overall Progress" value={stats.overall} variant="green" />
            <StatCard label="Pending Assignments" value={stats.pending} variant="red" />
            <StatCard label="Assessment Average" value={stats.average} variant="blue" />
            <StatCard label="Learning Streak" value={stats.streak} variant="orange" />
          </div>

          {/* Conditional Middle Section */}
          {hasEnrollments ? (
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
                    {upcomingAssignments.map((item, idx) => (
                      <AssignmentRow key={idx} {...item} />
                    ))}
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
                    {upcomingAssessments.map((item, idx) => (
                      <AssignmentRow key={idx} {...item} />
                    ))}
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
              {popularCourses.map((course) => (
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