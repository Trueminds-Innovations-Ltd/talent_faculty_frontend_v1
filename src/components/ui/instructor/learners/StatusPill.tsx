import React from 'react'
import type { PillTone } from './statusTones'

const toneStyles: Record<PillTone, string> = {
  success: 'bg-admin-success-light text-admin-success',
  warning: 'bg-admin-warning-light text-admin-secondary',
  danger: 'bg-admin-danger-light text-admin-danger',
  info: 'bg-admin-info-light text-admin-info',
  neutral: 'bg-admin-ash-7/60 text-admin-ash-2',
}

export const StatusPill: React.FC<{ tone: PillTone; children: React.ReactNode }> = ({ tone, children }) => (
  <span className={`inline-flex items-center justify-center whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-semibold ${toneStyles[tone]}`}>
    {children}
  </span>
)

export default StatusPill
