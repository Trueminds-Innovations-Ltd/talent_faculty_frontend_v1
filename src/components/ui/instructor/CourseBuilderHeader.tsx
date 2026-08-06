import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, Globe, Eye, Save, EyeOff } from 'lucide-react'
import { courseBuilderCourse } from './courseBuilderData'

const CourseBuilderHeader: React.FC = () => {
  const c = courseBuilderCourse

  return (
    <div className="mb-6">
      <Link
        to="/instructor/courses"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-admin-ink hover:text-admin-primary transition-colors"
      >
        <ChevronLeft size={18} />
        Back to Courses
      </Link>

      <div className="mt-4 flex flex-col lg:flex-row lg:items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold text-admin-ink">{c.title}</h1>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-admin-success/40 bg-white px-3 py-1 text-xs font-semibold text-admin-success">
              <Globe size={14} />
              {c.status}
            </span>
          </div>
          <p className="mt-1.5 text-sm text-admin-ash-3 max-w-2xl">{c.description}</p>
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-admin-ash-3">
            <span>{c.moduleCount} modules</span>
            <span className="text-admin-ash-6">•</span>
            <span>{c.lessonCount} lessons</span>
            <span className="text-admin-ash-6">•</span>
            <span>{c.publishedLessonCount} Published</span>
            <span className="text-admin-ash-6">•</span>
            <span>{c.updatedLabel}</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button className="inline-flex items-center gap-2 rounded-xl border border-admin-ash-6 px-4 py-2.5 text-sm font-semibold text-admin-ash-2 hover:bg-admin-ash-7/40 transition-colors">
            <Eye size={16} />
            Preview Course
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl border border-admin-ash-6 px-4 py-2.5 text-sm font-semibold text-admin-ash-2 hover:bg-admin-ash-7/40 transition-colors">
            <Save size={16} />
            Save changes
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl bg-admin-secondary-light px-4 py-2.5 text-sm font-semibold text-admin-secondary hover:bg-admin-secondary/20 transition-colors">
            <EyeOff size={16} />
            Unpublish
          </button>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-4">
        <div className="h-2 flex-1 max-w-xl rounded-full bg-admin-ash-7 overflow-hidden">
          <div
            className="h-full rounded-full bg-admin-primary transition-all duration-500"
            style={{ width: `${c.savedPercent}%` }}
          />
        </div>
        <span className="text-sm text-admin-ash-2 shrink-0">{c.savedPercent}% saved</span>
      </div>
    </div>
  )
}

export default CourseBuilderHeader
