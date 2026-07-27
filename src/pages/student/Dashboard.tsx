import React from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import StatCard from '../../components/ui/StatCard'
import CourseCard from '../../components/ui/CourseCard'
import AssignmentRow from '../../components/ui/AssignmentRow'

const continueLearningCourses = [
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

const Dashboard: React.FC = () => {
  return (
    <DashboardLayout title="Good Morning, Samuel 👋" subtitle="Continue your learning journey and stay on track!">
      <div className="space-y-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Overall Progress" value="76%" variant="green" />
          <StatCard label="Pending Assignments" value="3" variant="red" />
          <StatCard label="Assessment Average" value="88%" variant="blue" />
          <StatCard label="Learning Streak" value="12 Days" variant="orange" />
        </div>

        <section>
          <h2 className="text-lg font-bold text-neutral-800 mb-1">Continue Learning</h2>
          <p className="text-sm text-neutral-400 mb-5">Pick up where you left off and continue progressing through your active courses.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {continueLearningCourses.map((course, idx) => (
              <CourseCard key={idx} {...course} />
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-neutral-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-neutral-800">Upcoming Assignments</h3>
              <button className="text-xs font-medium text-primary hover:text-primary-dark">View All</button>
            </div>
            <div>
              {upcomingAssignments.map((item, idx) => (
                <AssignmentRow key={idx} {...item} />
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-neutral-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-neutral-800">Upcoming Assessments</h3>
              <button className="text-xs font-medium text-primary hover:text-primary-dark">View All</button>
            </div>
            <div>
              {upcomingAssessments.map((item, idx) => (
                <AssignmentRow key={idx} {...item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard