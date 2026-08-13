import React from 'react'
import { Pencil } from 'lucide-react'

interface ModuleDetailsPanelProps {
  moduleNumber: number
  title: string
  description: string
  lessonCount: number
  onEditClick: () => void
}

const ModuleDetailsPanel: React.FC<ModuleDetailsPanelProps> = ({
  moduleNumber,
  title,
  description,
  lessonCount,
  onEditClick,
}) => {
  return (
    <div className="rounded-2xl border border-admin-ash-7 bg-white p-5 sm:p-6 space-y-6 lg:sticky lg:top-6">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-admin-ink">Module Details</h3>
        <button
          onClick={onEditClick}
          className="p-2 rounded-lg border border-admin-ash-6 text-admin-ash-3 hover:text-admin-primary hover:bg-admin-primary-light transition-colors"
          title="Edit module"
        >
          <Pencil size={16} />
        </button>
      </div>

      <div className="rounded-2xl border border-admin-ash-7 bg-admin-ash-7/20 p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <span className="text-xl font-bold text-admin-ink leading-none">{moduleNumber}</span>
          <div className="space-y-2 min-w-0">
            <h4 className="text-base font-bold text-admin-ink leading-tight">{title}</h4>
            <p className="text-sm text-admin-ash-3 leading-relaxed">{description}</p>
            <div className="pt-2 text-xs font-medium text-admin-ash-4">{lessonCount} lessons</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModuleDetailsPanel
