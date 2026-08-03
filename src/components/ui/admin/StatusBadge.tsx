import React from 'react'

export type CourseStatus = 'Published' | 'Draft' | 'Archived'

const styles: Record<CourseStatus, string> = {
  Published: 'bg-admin-success-light text-admin-success',
  Draft: 'bg-admin-warning-light text-admin-secondary',
  Archived: 'bg-admin-danger-light text-admin-danger',
}

const StatusBadge: React.FC<{ status: CourseStatus }> = ({ status }) => {
  return (
    <span className={`inline-flex items-center justify-center rounded-full px-4 py-1.5 text-xs font-semibold whitespace-nowrap ${styles[status]}`}>
      {status}
    </span>
  )
}

export default StatusBadge
