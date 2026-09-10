import React, { useEffect, useRef, useState } from 'react'

export interface RevealProps {
  children: React.ReactNode
  animation?: 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'zoom-in' | 'fade'
  duration?: number
  delay?: number
  className?: string
  threshold?: number
  repeat?: boolean
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  animation = 'slide-up',
  duration = 700,
  delay = 0,
  className = '',
  threshold = 0.12,
  repeat = false,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (!repeat) {
            observer.unobserve(el)
          }
        } else if (repeat) {
          setIsVisible(false)
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, repeat])

  const getTransitionStyle = () => {
    switch (animation) {
      case 'slide-up':
        return isVisible
          ? 'translate-y-0 opacity-100 scale-100'
          : 'translate-y-12 opacity-0 scale-[0.98]'
      case 'slide-down':
        return isVisible
          ? 'translate-y-0 opacity-100'
          : '-translate-y-12 opacity-0'
      case 'slide-left':
        return isVisible
          ? 'translate-x-0 opacity-100'
          : '-translate-x-16 opacity-0'
      case 'slide-right':
        return isVisible
          ? 'translate-x-0 opacity-100'
          : 'translate-x-16 opacity-0'
      case 'zoom-in':
        return isVisible
          ? 'scale-100 opacity-100'
          : 'scale-90 opacity-0'
      case 'fade':
      default:
        return isVisible ? 'opacity-100' : 'opacity-0'
    }
  }

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
      className={`transition-all cubic-bezier(0.16, 1, 0.3, 1) transform will-change-transform ${getTransitionStyle()} ${className}`}
    >
      {children}
    </div>
  )
}

export default Reveal
