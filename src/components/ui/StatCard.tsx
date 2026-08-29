import React from 'react'

interface StatCardProps {
  label: string
  value: string
  variant: 'green' | 'red' | 'blue' | 'orange' | 'purple'
  helper?: string
}

const variantStyles = {
  green: { bg: 'bg-[#F2FBF6]', border: 'border border-[#D1F2DE]', label: 'text-[#057834]', value: 'text-[#057834]' },
  red: { bg: 'bg-[#FEF3F4]', border: 'border border-[#FDDADB]', label: 'text-[#E63946]', value: 'text-[#E63946]' },
  blue: { bg: 'bg-[#F2F7FF]', border: 'border border-[#D8E6FD]', label: 'text-[#3B82F6]', value: 'text-[#3B82F6]' },
  orange: { bg: 'bg-[#FFF8EE]', border: 'border border-[#FDE5C7]', label: 'text-[#F57C00]', value: 'text-[#F57C00]' },
  purple: { bg: 'bg-[#F9F5FF]', border: 'border border-[#E9D7FE]', label: 'text-[#7F56D9]', value: 'text-[#7F56D9]' },
}

const StatCard: React.FC<StatCardProps> = ({ label, value, variant, helper }) => {
  const style = variantStyles[variant]
  return (
    <div className={`${style.bg} ${style.border} rounded-2xl p-6 transition-all duration-200 hover:shadow-xs`}>
      <p className={`text-xs font-semibold mb-3 ${style.label}`}>{label}</p>
      <p className={`text-3xl font-extrabold ${style.value}`}>{value}</p>
      {helper && <p className="text-[11px] text-neutral-400 mt-1">{helper}</p>}
    </div>
  )
}

export default StatCard