import React from 'react'
import ProgressBar from './ProgressBar'

interface CourseCardProps {
  title: string
  instructor: string
  progress: number
  tags?: string[]
  duration?: string
}

const CourseCard: React.FC<CourseCardProps> = ({ title, instructor, progress, tags = [], duration }) => {
  return (
    <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-36 bg-neutral-100 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-neutral-200 to-neutral-300 flex items-center justify-center">
            <img src="./course-image.jpg" alt="" />
        </div>
        <div className="absolute top-3 right-3 flex gap-1.5">
          {tags.map((tag) => (
            <span key={tag} className="px-2 py-0.5 bg-white/90 backdrop-blur-sm rounded-md text-[10px] font-medium text-neutral-700">{tag}</span>
          ))}
        </div>
        {duration && (
          <span className="absolute bottom-3 right-3 px-2 py-0.5 bg-white/90 backdrop-blur-sm rounded-md text-[10px] font-medium text-neutral-600">{duration}</span>
        )}
      </div>
      <div className="p-4">
        <h4 className="text-sm font-semibold text-neutral-800 mb-3 line-clamp-1">{title}</h4>
        <div className="flex items-center gap-2 mb-3">
          <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-primary text-[10px] font-bold">{instructor.split(' ').map(n => n[0]).join('')}</span>
          </div>
          <div>
            <p className="text-xs font-medium text-neutral-700">{instructor}</p>
            <p className="text-[10px] text-neutral-400">Instructor</p>
          </div>
        </div>
        <div className="mb-4">
          <ProgressBar progress={progress} size="sm" />
          <p className="text-[10px] text-neutral-400 mt-1 text-right">{progress}%</p>
        </div>
        <button className="w-full py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-colors">Resume Learning</button>
      </div>
    </div>
  )
}

export default CourseCard