import React from 'react'
import { NavLink } from 'react-router-dom'

const filters = [
  { label: 'All learners', to: '/instructor/learners/all'},
  { label: 'Active', to: '/instructor/learners/active' },
  { label: 'Learner Support', to: '/instructor/learners/support' },
  { label: 'Completed', to: '/instructor/learners/completed' },
]

const LearnerStatusFilterTabs: React.FC = () => {
  return (
    <div className="inline-flex flex-wrap items-center gap-1 rounded-full bg-admin-ash-7/50 p-1.5">
      {filters.map((filter) => (
        <NavLink
          key={filter.to}
          to={filter.to}
          className={({ isActive }) =>
            `rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
              isActive ? 'bg-white text-admin-ink shadow-sm' : 'text-admin-ash-3 hover:text-admin-ink'
            }`
          }
        >
          {filter.label}
        </NavLink>
      ))}
    </div>
  )
}

export default LearnerStatusFilterTabs
