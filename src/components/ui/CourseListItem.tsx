import React from 'react'
import ProgressBar from './ProgressBar'

interface CourseListItemProps {
  title: string
  instructor: string
  progress: number
  onResume: ()=>void
  totalLectures: number
  completedLectures: number
}

const CourseListItem: React.FC<CourseListItemProps> = ({ title, instructor, progress, onResume, totalLectures, completedLectures }) => {
  return (
    <div
      onClick={onResume}
      className="flex items-center gap-8 py-4 border-b border-neutral-50 last:border-0 hover:bg-neutral-50/50 transition-colors rounded-lg px-2 -mx-2 cursor-pointer"
    >
      <div className="flex gap-[24px] h-16 w-24 rounded-lg flex-shrink-0 w-[312px]">
        <img src="/course-image.jpg" alt={title} className="rounded-[8px] object-cover w-24 h-16 bg-neutral-200" />
        <div className="flex flex-col gap-2.5 justify-center">
          <h4 className="text-[14px] font-[400] text-neutral-800 mb-0.5 truncate">{title}</h4>
          <p className="text-xs text-neutral-400 mb-2">{instructor}</p>
        </div>
      </div>
      <div className="flex-1 flex flex-col min-w-0 gap-2 w-[500px]">
        <span className="text-xs font-medium text-neutral-600 whitespace-nowrap">{progress}%</span>
        <div className="flex items-center gap-3">
          <div className="flex-1 max-w-[200px] sm:max-w-[300px]">
            <ProgressBar progress={progress} size="sm" />
          </div>
        </div>
        <p className="text-[11px] text-neutral-400 mt-1">{completedLectures} of {totalLectures} lectures</p>
      </div>
      {progress === 100 ? (
        <button
          className="text-sm font-semibold text-primary hover:text-[#057834] whitespace-nowrap transition-colors w-[164px] px-2 cursor-pointer"
          onClick={(e) => { e.stopPropagation(); onResume(); }}
        >
          See Certificate
        </button>
      ) : progress >= 1 ? (
        <button
          className="text-sm font-semibold text-primary hover:text-[#057834] whitespace-nowrap transition-colors w-[164px] px-2 cursor-pointer"
          onClick={(e) => { e.stopPropagation(); onResume(); }}
        >
          Resume Course
        </button>
      ) : (
        <button
          className="text-sm font-semibold text-primary hover:text-[#057834] whitespace-nowrap transition-colors w-[164px] px-2 cursor-pointer"
          onClick={(e) => { e.stopPropagation(); onResume(); }}
        >
          Start Course
        </button>
      )}
    </div>
  )
}

export default CourseListItem