import React, { useState } from 'react'
import { Heart, BookOpen, Star } from 'lucide-react'

export interface PopularCourseCardProps {
  title: string
  bannerUrl: string
  outline: string[]
  instructor: {
    name: string
    role: string
    company: string
    avatarUrl: string
    rating: number
  }
  onEnroll?: () => void
}

const PopularCourseCard: React.FC<PopularCourseCardProps> = ({
  title,
  bannerUrl,
  outline,
  instructor,
  onEnroll,
}) => {
  const [isFavorited, setIsFavorited] = useState(false)

  return (
    <article className="bg-white rounded-3xl border border-neutral-100 p-4.5 flex flex-col justify-between h-full hover:shadow-lg transition-all duration-300">
      <div>
        <div className="relative overflow-hidden rounded-2xl">
          <img
            src={bannerUrl}
            alt={title}
            className="h-40 w-full object-cover rounded-2xl transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div className="flex items-start justify-between gap-3 mt-4">
          <h3 className="text-base font-bold text-neutral-900 leading-snug line-clamp-2">
            {title}
          </h3>
          <button
            type="button"
            aria-pressed={isFavorited}
            aria-label={isFavorited ? 'Remove from favorites' : 'Save to favorites'}
            onClick={() => setIsFavorited((prev) => !prev)}
            className="shrink-0 h-8 w-8 rounded-full bg-[#FFF1F2] hover:bg-[#FFE4E6] flex items-center justify-center transition-colors cursor-pointer"
          >
            <Heart
              size={16}
              className={isFavorited ? 'fill-[#F43F5E] text-[#F43F5E]' : 'text-[#FB7185]'}
            />
          </button>
        </div>

        <div className="my-4 border-t border-dashed border-neutral-200" />

        <div>
          <p className="text-xs font-bold text-neutral-800 tracking-tight">Course Outline</p>
          <ul className="mt-2.5 space-y-2">
            {outline.map((item, idx) => (
              <li key={idx} className="text-xs text-neutral-500 font-medium flex items-center gap-2">
                <BookOpen size={14} className="shrink-0 text-neutral-700" />
                <span className="line-clamp-1">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-5">
        <p className="text-xs font-bold text-neutral-800 tracking-tight mb-2">Course Instructor</p>
        <div className="flex items-center justify-between rounded-xl border border-neutral-100 bg-neutral-50/50 p-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src={instructor.avatarUrl}
              alt={instructor.name}
              className="h-8 w-8 rounded-full object-cover shrink-0"
            />
            <div className="min-w-0">
              <p className="text-xs font-bold text-neutral-900 truncate">{instructor.name}</p>
              <p className="text-[11px] text-neutral-400 truncate">
                {instructor.role}, <span className="text-[#057834] font-medium">{instructor.company}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0 ml-2">
            <Star size={13} className="fill-[#F59E0B] text-[#F59E0B]" />
            <span className="text-xs font-bold text-neutral-800">{instructor.rating}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onEnroll}
          className="mt-4 w-full rounded-full bg-[#057834] py-3 text-sm font-bold text-white hover:bg-[#04632b] transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer text-center"
        >
          Enroll Now
        </button>
      </div>
    </article>
  )
}

export default PopularCourseCard