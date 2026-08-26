import React, { useEffect } from 'react'
import { CircleCheck } from 'lucide-react'

interface SuccessToastProps {
  message: string
  onDismiss: () => void
  durationMs?: number
}

const SuccessToast: React.FC<SuccessToastProps> = ({ message, onDismiss, durationMs = 4000 }) => {
  useEffect(() => {
    const timer = setTimeout(onDismiss, durationMs)
    return () => clearTimeout(timer)
  }, [onDismiss, durationMs])

  return (
    <div className="flex items-center gap-2.5 rounded-xl border border-neutral-100 bg-white px-4 py-3 shadow-lg animate-fade-in">
      <CircleCheck size={20} className="text-primary shrink-0" />
      <p className="text-sm text-neutral-700">{message}</p>
    </div>
  )
}

export default SuccessToast
