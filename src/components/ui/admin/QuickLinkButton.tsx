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

interface QuickLinkButtonProps {
  icon: React.ReactNode
  tone: StatTone
  label: string
  onClick?: () => void
}

const QuickLinkButton: React.FC<QuickLinkButtonProps> = ({ icon, tone, label, onClick }) => {
  const style = toneStyles[tone]
  return (
    <button
      onClick={onClick}
      className="flex flex-1 min-w-[140px] flex-col items-center justify-center gap-3 rounded-xl border border-admin-ash-7 px-4 py-6 text-center transition-colors hover:border-admin-primary/40 hover:bg-admin-primary-light/40"
    >
      <span className={`flex h-11 w-11 items-center justify-center rounded-full ${style.bg} ${style.text}`}>
        {icon}
      </span>
      <span className="text-sm font-semibold text-admin-ink">{label}</span>
    </button>
  )
}

export default QuickLinkButton
