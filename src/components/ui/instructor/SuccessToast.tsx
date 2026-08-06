import React, { useEffect } from 'react'
import { CircleCheckBig } from 'lucide-react'

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
    <div className="mb-6 flex justify-end">
      <div className="flex items-center gap-2.5 rounded-xl border border-admin-ash-7 bg-white px-4 py-3 shadow-sm animate-fade-in">
        <CircleCheckBig size={20} className="text-admin-success shrink-0" />
        <p className="text-sm text-admin-ink">{message}</p>
      </div>
    </div>
  )
}

export default SuccessToast
