import React from 'react'

interface PageActionButtonProps {
  icon: React.ReactNode
  children: React.ReactNode
  variant?: 'filled' | 'outline'
  onClick?: () => void
  className?: string
}

const PageActionButton: React.FC<PageActionButtonProps> = ({
  icon,
  children,
  variant = 'filled',
  onClick,
  className = '',
}) => {
  const styles =
    variant === 'filled'
      ? 'bg-admin-primary text-white hover:bg-admin-primary-dark border border-transparent'
      : 'bg-white text-admin-ink border border-admin-ash-6 hover:bg-admin-ash-7/50'

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors ${styles} ${className}`}
    >
      {icon}
      {children}
    </button>
  )
}

export default PageActionButton
