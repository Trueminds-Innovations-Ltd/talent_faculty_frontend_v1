import React, { useRef } from 'react'

interface OtpInputProps {
  length?: number
  value: string
  onChange: (value: string) => void
  error?: string
}

const OtpInput: React.FC<OtpInputProps> = ({ length = 6, value, onChange, error }) => {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([])
  const digits = Array.from({ length }, (_, i) => value[i] || '')

  const setDigit = (index: number, digit: string) => {
    const next = digits.slice()
    next[index] = digit
    onChange(next.join(''))
  }

  const handleChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '')
    if (!raw) {
      setDigit(index, '')
      return
    }
    const chars = raw.split('')
    const next = digits.slice()
    let cursor = index
    for (const char of chars) {
      if (cursor >= length) break
      next[cursor] = char
      cursor += 1
    }
    onChange(next.join(''))
    const focusIndex = Math.min(cursor, length - 1)
    inputsRef.current[focusIndex]?.focus()
  }

  const handleKeyDown = (index: number) => (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
    if (e.key === 'ArrowRight' && index < length - 1) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, length)
    if (!pasted) return
    onChange(pasted)
    const focusIndex = Math.min(pasted.length, length - 1)
    inputsRef.current[focusIndex]?.focus()
  }

  return (
    <div className="w-full">
      <div className="flex gap-2 sm:gap-3">
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(el) => { inputsRef.current[index] = el }}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            autoFocus={index === 0}
            maxLength={1}
            value={digit}
            onChange={handleChange(index)}
            onKeyDown={handleKeyDown(index)}
            onPaste={handlePaste}
            className={`
              h-12 w-12 sm:h-14 sm:w-14 rounded-lg border bg-white text-center text-lg font-semibold
              text-[#1a1a1a] outline-none transition-colors
              focus:border-[#34C759] focus:ring-1 focus:ring-[#34C759]
              ${error ? 'border-red-400' : 'border-[#d1d5db]'}
            `}
          />
        ))}
      </div>
      {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
    </div>
  )
}

export default OtpInput
