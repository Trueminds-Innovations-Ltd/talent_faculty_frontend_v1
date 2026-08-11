import React from 'react'
import { NavLink } from 'react-router-dom'

const tabs = [
  { label: 'Overview', key: 'overview' },
  { label: 'Courses', key: 'courses' },
  { label: 'Assignment', key: 'assignment' },
  { label: 'Quizzes', key: 'quizzes' },
]

interface LearnerProfileTabsProps {
  learnerId: string
}

const LearnerProfileTabs: React.FC<LearnerProfileTabsProps> = ({ learnerId }) => {
  return (
    <div className="inline-flex flex-wrap items-center gap-1 rounded-full bg-admin-ash-7/50 p-1.5">
      {tabs.map((tab) => (
        <NavLink
          key={tab.key}
          to={`/instructor/learners/${learnerId}/${tab.key}`}
          className={({ isActive }) =>
            `rounded-full px-5 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
              isActive ? 'bg-white text-admin-ink shadow-sm' : 'text-admin-ash-3 hover:text-admin-ink'
            }`
          }
        >
          {tab.label}
        </NavLink>
      ))}
    </div>
  )
}

export default LearnerProfileTabs
