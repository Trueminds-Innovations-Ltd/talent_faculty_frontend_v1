import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const DESCRIPTION_LIMIT = 150
const OUTCOMES_LIMIT = 300

const DEFAULT_DESCRIPTION =
  'Learn the fundamentals of UX research, from understanding user needs and selecting research methods to analyzing insights and presenting findings that support better design decisions.'

const DEFAULT_OUTCOMES =
  `By the end of this course, learners will be able to :\n- Understand UX research principles.\n- Conduct basic user research.\n- Analyze research findings.\n- Present actionable insights.`

const durationOptions = [
  '2 weeks', '3 weeks', '1 month', '1 month 2 weeks',
  '2 months', '2 months 2 weeks', '3 months', '4 months',
]

export default function CourseDetailsTab() {
  const [title, setTitle] = useState('UX Research Fundamentals')
  const [description, setDescription] = useState(DEFAULT_DESCRIPTION)
  const [outcomes, setOutcomes] = useState(DEFAULT_OUTCOMES)
  const [duration, setDuration] = useState('1 month')

  return (
    <div className="pt-6 max-w-[700px] space-y-8">
      <div className="space-y-1">
        <h2 className="text-lg font-bold text-admin-ink">Course details</h2>
        <p className="text-sm text-admin-ash-3">Provide essential information about your course.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="course-title" className="block text-sm font-bold text-admin-ink">
            Course Title
          </label>
          <input
            id="course-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border border-admin-ash-6 px-4 py-3 text-sm text-admin-ink outline-none focus:border-admin-primary transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="course-description" className="block text-sm font-bold text-admin-ink">
            Course description
          </label>
          <textarea
            id="course-description"
            rows={4}
            maxLength={DESCRIPTION_LIMIT}
            value={description}
            onChange={(e) => setDescription(e.target.value.slice(0, DESCRIPTION_LIMIT))}
            className="w-full resize-none rounded-xl border border-admin-ash-6 px-4 py-3 text-sm text-admin-ink outline-none focus:border-admin-primary transition-colors"
          />
          <div className="text-right text-xs font-medium text-admin-ash-4">
            {description.length}/{DESCRIPTION_LIMIT}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="course-outcomes" className="block text-sm font-bold text-admin-ink">
            Learning outcomes
          </label>
          <textarea
            id="course-outcomes"
            rows={5}
            maxLength={OUTCOMES_LIMIT}
            value={outcomes}
            onChange={(e) => setOutcomes(e.target.value.slice(0, OUTCOMES_LIMIT))}
            className="w-full resize-none rounded-xl border border-admin-ash-6 px-4 py-3 text-sm text-admin-ink outline-none focus:border-admin-primary transition-colors"
          />
          <div className="text-right text-xs font-medium text-admin-ash-4">
            {outcomes.length}/{OUTCOMES_LIMIT}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="course-duration" className="block text-sm font-bold text-admin-ink">
            Course duration
          </label>
          <div className="relative">
            <select
              id="course-duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full appearance-none cursor-pointer rounded-xl border border-admin-ash-6 bg-white px-4 py-3 text-sm text-admin-ink outline-none focus:border-admin-primary transition-colors"
            >
              {durationOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-admin-ash-4 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 pt-4">
        <button className="flex-1 rounded-xl border border-admin-ash-6 bg-admin-ash-7/30 py-3.5 text-sm font-bold text-admin-ash-2 hover:bg-admin-ash-7 transition-colors">
          Cancel
        </button>
        <button className="flex-1 rounded-xl bg-admin-primary py-3.5 text-sm font-bold text-white hover:bg-admin-primary-dark transition-colors shadow-sm">
          Save changes
        </button>
      </div>
    </div>
  )
}
