import React from 'react'

interface ProgressBarProps {
  value: number
  className?: string
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, className = '' }) => {
  const clamped = Math.max(0, Math.min(100, value))
  return (
    <div className={`h-2 w-full rounded-full bg-admin-ash-7 overflow-hidden ${className}`}>
      <div
        className="h-full rounded-full bg-admin-primary transition-all duration-500"
        style={{ width: `${clamped}%` }}
      />
    </div>
  )
}

export default ProgressBar
