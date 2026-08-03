import React from 'react'

interface ActivityCardProps {
  icon: React.ReactNode
  title: string
  subtitle: string
  value: string | number
}

const ActivityCard: React.FC<ActivityCardProps> = ({ icon, title, subtitle, value }) => {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-admin-ash-7 p-4 min-w-0">
      <div className="flex items-center gap-3 min-w-0">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-admin-info-light text-admin-info">
          {icon}
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-admin-ink truncate">{title}</p>
          <p className="text-xs text-admin-ash-3 truncate">{subtitle}</p>
        </div>
      </div>
      <p className="text-xl font-bold text-admin-ink shrink-0">{value}</p>
    </div>
  )
}

export default ActivityCard
