import React from 'react'

interface ProgressBarProps {
  progress: number
  size?: 'sm' | 'md'
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, size = 'md' }) => {
  const clamped = Math.min(100, Math.max(0, progress))
  const height = size === 'sm' ? 'h-1.5' : 'h-2'
  return (
    <div className="w-full">
      <div className={`w-full ${height} rounded-full bg-primary-light overflow-hidden`}>
        <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${clamped}%` }} />
      </div>
    </div>
  )
}

export default ProgressBar