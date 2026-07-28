import React, { forwardRef } from 'react'

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode
  error?: string
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className={`flex items-start gap-3 ${className}`}>
        <div className="flex items-center h-5">
          <input
            ref={ref}
            type="checkbox"
            className="w-5 h-5 rounded border border-neutral-200 text-primary focus:ring-primary/20 focus:ring-2 cursor-pointer"
            {...props}
          />
        </div>
        <label className="text-sm text-neutral-500 leading-5 cursor-pointer select-none">
          {label}
        </label>
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'

export default Checkbox
