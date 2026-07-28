import React, { forwardRef } from 'react'

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: React.ReactNode
  error?: string
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, className = '', rows = 4, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="auth-label">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          rows={rows}
          className={`auth-input resize-none ${error ? 'border-semantic-error focus:border-semantic-error focus:ring-semantic-error/20' : ''} ${className}`}
          {...props}
        />
        {error && (
          <p className="mt-1 text-xs text-semantic-error">{error}</p>
        )}
      </div>
    )
  }
)

TextArea.displayName = 'TextArea'

export default TextArea
