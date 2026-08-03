import React from 'react'

export type StatTone = 'blue' | 'green' | 'orange' | 'red' | 'purple' | 'pink'

const toneStyles: Record<StatTone, { bg: string; text: string }> = {
  blue: { bg: 'bg-admin-info-light', text: 'text-admin-info' },
  green: { bg: 'bg-admin-success-light', text: 'text-admin-success' },
  orange: { bg: 'bg-admin-warning-light', text: 'text-admin-secondary' },
  red: { bg: 'bg-admin-danger-light', text: 'text-admin-danger' },
  purple: { bg: 'bg-admin-purple-light', text: 'text-admin-purple' },
  pink: { bg: 'bg-admin-pink-light', text: 'text-admin-pink' },
}

interface StatCardProps {
  icon: React.ReactNode
  tone: StatTone
  label: string
  value: string | number
  delta?: string
  period?: string
}

const StatCard: React.FC<StatCardProps> = ({ icon, tone, label, value, delta, period }) => {
  const style = toneStyles[tone]

  return (
    <div className={`${style.bg} rounded-2xl p-4 sm:p-5 flex flex-col gap-3 min-w-0`}>
      <div className="flex items-center gap-2">
        <span className={`flex h-8 w-8 items-center justify-center rounded-lg bg-white/70 ${style.text}`}>
          {icon}
        </span>
        <p className="text-sm font-medium text-admin-ash-1 truncate">{label}</p>
      </div>
      <div>
        <p className={`text-2xl sm:text-3xl font-bold ${style.text}`}>{value}</p>
        {(delta || period) && (
          <p className="mt-1 text-xs text-admin-ash-3">
            {delta && <span className="font-semibold text-admin-success">{delta}</span>}
            {delta && period && ' '}
            {period}
          </p>
        )}
      </div>
    </div>
  )
}

export default StatCard
