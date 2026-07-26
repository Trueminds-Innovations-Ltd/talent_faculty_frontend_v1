import React, { forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode
  error?: string
  helperText?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="auth-label">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`auth-input ${error ? 'border-semantic-error focus:border-semantic-error focus:ring-semantic-error/20' : ''} ${className}`}
          {...props}
        />
        {error && (
          <p className="mt-1 text-xs text-semantic-error">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-xs text-neutral-400">{helperText}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
