import React from 'react'
import { NavLink } from 'react-router-dom'

const tabs = [
  { label: 'Course details', to: '/instructor/courses/course-details' },
  { label: 'Modules / lessons', to: '/instructor/courses/modules-lessons' },
  { label: 'Activities', to: '/instructor/courses/activities' },
  { label: 'Resources', to: '/instructor/courses/resources' },
]

const CourseBuilderTabs: React.FC = () => {
  return (
    <div className="mb-6 inline-flex flex-wrap items-center gap-1 rounded-full bg-admin-ash-7/50 p-1.5">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          className={({ isActive }) =>
            `rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
              isActive
                ? 'bg-white text-admin-ink shadow-sm'
                : 'text-admin-ash-3 hover:text-admin-ink'
            }`
          }
        >
          {tab.label}
        </NavLink>
      ))}
    </div>
  )
}

export default CourseBuilderTabs
