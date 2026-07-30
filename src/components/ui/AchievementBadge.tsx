import React from 'react'

interface AchievementBadgeProps {
  label: string
  icon: string
  color: string
}

const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  label,
  icon,
  color,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-neutral-100 flex flex-col items-center text-center gap-3 py-6 px-4 hover:shadow-md transition-shadow">
      <span
        className="flex h-14 w-14 items-center justify-center rounded-full border-2"
        style={{ borderColor: color }}
      >
        <img
          src={icon}
          alt={label}
          className="h-8 w-8 object-contain"
        />
      </span>

      <span className="text-sm font-semibold text-neutral-800">
        {label}
      </span>
    </div>
  )
}

export default AchievementBadge