import React from 'react'
import type { StatTone } from './StatCard'

const toneStyles: Record<StatTone, { bg: string; text: string }> = {
  blue: { bg: 'bg-admin-info-light', text: 'text-admin-info' },
  green: { bg: 'bg-admin-success-light', text: 'text-admin-success' },
  orange: { bg: 'bg-admin-warning-light', text: 'text-admin-secondary' },
  red: { bg: 'bg-admin-danger-light', text: 'text-admin-danger' },
  purple: { bg: 'bg-admin-purple-light', text: 'text-admin-purple' },
  pink: { bg: 'bg-admin-pink-light', text: 'text-admin-pink' },
}

interface ListRowProps {
  icon: React.ReactNode
  tone: StatTone
  text: string
  trailing: React.ReactNode
}

const ListRow: React.FC<ListRowProps> = ({ icon, tone, text, trailing }) => {
  const style = toneStyles[tone]
  return (
    <div className="flex items-center justify-between gap-3 py-3 border-b border-admin-ash-7 last:border-b-0">
      <div className="flex items-center gap-3 min-w-0">
        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${style.bg} ${style.text}`}>
          {icon}
        </span>
        <p className="text-sm text-admin-ash truncate">{text}</p>
      </div>
      <div className="shrink-0 text-xs text-admin-ash-3">{trailing}</div>
    </div>
  )
}

export default ListRow
