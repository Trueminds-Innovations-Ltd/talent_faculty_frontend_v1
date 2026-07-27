import React from 'react'

interface StatCardProps {
  label: string
  value: string
  variant: 'green' | 'red' | 'blue' | 'orange'
}

const variantStyles = {
  green: { bg: 'bg-emerald-50', label: 'text-emerald-600', value: 'text-emerald-700' },
  red: { bg: 'bg-red-50', label: 'text-red-500', value: 'text-red-600' },
  blue: { bg: 'bg-blue-50', label: 'text-blue-500', value: 'text-blue-600' },
  orange: { bg: 'bg-orange-50', label: 'text-orange-500', value: 'text-orange-600' },
}

const StatCard: React.FC<StatCardProps> = ({ label, value, variant }) => {
  const style = variantStyles[variant]
  return (
    <div className={`${style.bg} rounded-2xl p-5 transition-transform hover:scale-[1.02]`}>
      <p className={`text-xs font-medium mb-2 ${style.label}`}>{label}</p>
      <p className={`text-2xl font-bold ${style.value}`}>{value}</p>
    </div>
  )
}

export default StatCard