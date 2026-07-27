import React from 'react'
import ProgressBar from './ProgressBar'

interface CourseListItemProps {
  title: string
  instructor: string
  progress: number
  totalLectures: number
  completedLectures: number
}

const CourseListItem: React.FC<CourseListItemProps> = ({ title, instructor, progress, totalLectures, completedLectures }) => {
  return (
    <div className="flex items-center gap-4 py-4 border-b border-neutral-50 last:border-0 hover:bg-neutral-50/50 transition-colors rounded-lg px-2 -mx-2">
      <div className="h-16 w-24 rounded-lg bg-neutral-100 flex-shrink-0 overflow-hidden">
        <img src="./course-image.jpg" alt="" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-neutral-800 mb-0.5 truncate">{title}</h4>
        <p className="text-xs text-neutral-400 mb-2">{instructor}</p>
        <div className="flex items-center gap-3">
          <div className="flex-1 max-w-[200px] sm:max-w-[300px]">
            <ProgressBar progress={progress} size="sm" />
          </div>
          <span className="text-xs font-medium text-neutral-600 whitespace-nowrap">{progress}%</span>
        </div>
        <p className="text-[11px] text-neutral-400 mt-1">{completedLectures} of {totalLectures} lectures</p>
      </div>
      <button className="text-sm font-semibold text-primary hover:text-primary-dark whitespace-nowrap transition-colors px-2">Continue</button>
    </div>
  )
}

export default CourseListItem