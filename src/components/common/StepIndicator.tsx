import React from 'react'

interface Step {
  label: string
  status: 'completed' | 'current' | 'upcoming'
}

interface StepIndicatorProps {
  steps: Step[]
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ steps }) => {
  return (
    <div className="flex flex-col gap-4">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center gap-3">
          <div
            className={`
              w-3 h-3 rounded-full flex-shrink-0
              ${step.status === 'upcoming' ? 'bg-white/30' : 'bg-secondary'}
            `}
          />
          <span
            className={`
              text-sm font-medium
              ${step.status === 'current' ? 'text-white' : 'text-white/70'}
            `}
          >
            {step.label}
          </span>
        </div>
      ))}
    </div>
  )
}

export default StepIndicator
