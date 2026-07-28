import React from 'react'

interface AssignmentRowProps {
  title: string
  date: string
  duration?: string
}

const AssignmentRow: React.FC<AssignmentRowProps> = ({ title, date, duration }) => {
  return (
    <div className="flex items-center justify-between py-3 border-b border-neutral-50 last:border-0">
      <p className="text-sm text-neutral-700 truncate pr-4">{title}</p>
      <div className="text-right flex-shrink-0">
        <p className="text-xs text-neutral-500">{date}</p>
        {duration && <p className="text-[11px] text-neutral-400">{duration}</p>}
      </div>
    </div>
  )
}

export default AssignmentRow