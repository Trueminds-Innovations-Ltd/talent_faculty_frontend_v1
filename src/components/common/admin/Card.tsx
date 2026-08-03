import React from 'react'

interface CardProps {
  title?: string
  action?: React.ReactNode
  children: React.ReactNode
  className?: string
  bodyClassName?: string
}

const Card: React.FC<CardProps> = ({ title, action, children, className = '', bodyClassName = '' }) => {
  return (
    <div className={`rounded-2xl border border-admin-ash-7 bg-white ${className}`}>
      {(title || action) && (
        <div className="flex items-center justify-between px-4 sm:px-5 pt-4 sm:pt-5 pb-2">
          {title && <h3 className="text-base font-bold text-admin-ink">{title}</h3>}
          {action}
        </div>
      )}
      <div className={`px-4 sm:px-5 pb-4 sm:pb-5 ${bodyClassName}`}>{children}</div>
    </div>
  )
}

export default Card
