import React, { forwardRef } from 'react'

interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  countryCode?: string
}

const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ label, error, countryCode = '+234', className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="auth-label">
            {label}
          </label>
        )}
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <div className="auth-input flex items-center justify-center min-w-[72px] text-sm font-medium text-neutral-800 bg-neutral-50 cursor-default">
              {countryCode}
            </div>
          </div>
          <input
            ref={ref}
            type="tel"
            className={`auth-input flex-1 ${error ? 'border-semantic-error focus:border-semantic-error focus:ring-semantic-error/20' : ''} ${className}`}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1 text-xs text-semantic-error">{error}</p>
        )}
      </div>
    )
  }
)

PhoneInput.displayName = 'PhoneInput'

export default PhoneInput
