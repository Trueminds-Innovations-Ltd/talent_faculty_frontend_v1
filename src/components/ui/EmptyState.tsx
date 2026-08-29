import React from 'react'

interface EmptyStateProps {
  onActionClick?: () => void
}

const EmptyState: React.FC<EmptyStateProps> = () => {
  return (
    <div className="flex flex-col items-center justify-center py-6 px-4">
      <div className="relative max-w-[420px] w-full flex items-center justify-center">
        <img
          src="/courses/empty-explore.jpg"
          alt="Explore courses illustration"
          className="w-full max-h-[300px] object-contain rounded-2xl"
          onError={(e) => {
            // Fallback SVG if image fails to load
            e.currentTarget.style.display = 'none'
            const fallback = document.getElementById('empty-state-svg-fallback')
            if (fallback) fallback.style.display = 'block'
          }}
        />
        
        {/* Vector SVG Fallback */}
        <div id="empty-state-svg-fallback" style={{ display: 'none' }} className="w-full max-w-[340px]">
          <svg viewBox="0 0 400 300" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="200" cy="260" rx="140" ry="12" fill="#F1F5F9" />
            <path d="M110 120 C90 80, 150 40, 170 90 C190 40, 250 80, 230 120 Z" fill="#D1FAE5" opacity="0.6" />
            <path d="M120 180 L180 80 L290 80 L310 180 Z" fill="#6366F1" rx="8" />
            <path d="M100 250 L120 150 L310 150 L325 250 Z" fill="#4F46E5" />
            <circle cx="160" cy="190" r="22" fill="#818CF8" />
            <text x="153" y="198" fontSize="24" fontWeight="bold" fill="white">?</text>
            {/* Person silhouette */}
            <circle cx="285" cy="115" r="16" fill="#FCA5A5" />
            <path d="M265 145 C265 125, 305 125, 305 145 L295 210 L275 210 Z" fill="#34D399" />
            <path d="M275 210 L270 270 L285 270 L290 210 Z" fill="#1F2937" />
            <path d="M290 210 L295 270 L305 270 L300 210 Z" fill="#1F2937" />
            <circle cx="230" cy="160" r="18" stroke="#3B82F6" strokeWidth="4" fill="white" fillOpacity="0.4" />
            <line x1="243" y1="173" x2="265" y2="195" stroke="#1F2937" strokeWidth="5" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      <div className="mt-4 px-6 py-2.5 rounded-full bg-[#F4F4F6] text-[#737373] text-xs sm:text-sm font-medium text-center shadow-2xs">
        Nothing for now. Click the button above to start your learning journey.
      </div>
    </div>
  )
}

export default EmptyState