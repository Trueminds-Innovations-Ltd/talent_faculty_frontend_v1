import React from 'react'
import { GripVertical, ChevronDown, ChevronRight, Plus, Video } from 'lucide-react'
import { courseBuilderModules } from './courseBuilderData'

interface ModuleListProps {
  /** The module currently expanded (showing its lessons), if any */
  expandedModuleId?: string | null
  /** Toggle a module's expanded/collapsed state */
  onToggleModule?: (moduleId: string) => void
  /** "+ Add lessons" was clicked under a given (expanded) module */
  onAddLessonClick?: (moduleId: string) => void
  /** "Add new module" trigger row was clicked */
  onAddModuleClick?: () => void
  /** Whether the "Add new module" row is the active target on the right panel */
  isAddModuleActive?: boolean
  /** Mode preset for standalone pages */
  mode?: 'add-module' | 'add-lesson' | 'default' | string
  /** The active module ID for add-lesson mode */
  activeModuleId?: string
}

const ModuleList: React.FC<ModuleListProps> = ({
  expandedModuleId: propExpandedModuleId,
  onToggleModule,
  onAddLessonClick,
  onAddModuleClick,
  isAddModuleActive: propIsAddModuleActive,
  mode = 'default',
  activeModuleId,
}) => {
  const isAddModuleActive = propIsAddModuleActive ?? (mode === 'add-module')
  const expandedModuleId =
    propExpandedModuleId !== undefined
      ? propExpandedModuleId
      : mode === 'add-lesson'
        ? (activeModuleId ?? courseBuilderModules[0]?.id ?? null)
        : null
  return (
    <div className="rounded-2xl border border-admin-ash-7 bg-white overflow-hidden">
      {courseBuilderModules.map((module) => {
        const isExpanded = module.id === expandedModuleId

        return (
          <div key={module.id} className="border-b border-admin-ash-7 last:border-b-0">
            <button
              type="button"
              onClick={() => onToggleModule?.(module.id)}
              className={`flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors ${
                isExpanded ? 'bg-admin-ash-7/40' : 'hover:bg-admin-ash-7/20'
              }`}
            >
              <GripVertical size={16} className="text-admin-ash-5 shrink-0" />
              <span className="shrink-0 rounded-full bg-admin-primary-light px-2.5 py-1 text-xs font-semibold text-admin-primary">
                {module.label}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-admin-ink truncate">{module.title}</span>
                <span className="block text-xs text-admin-ash-3">{module.lessonCount} lessons</span>
              </span>
              {isExpanded ? (
                <ChevronDown size={16} className="text-admin-ash-3 shrink-0" />
              ) : (
                <ChevronRight size={16} className="text-admin-ash-3 shrink-0" />
              )}
            </button>

            {isExpanded && (
              <div className="pb-2">
                {module.lessons.map((lesson, i) => (
                  <div key={lesson.id} className="flex items-center gap-3 px-4 py-2.5 pl-11">
                    <span className="w-4 text-sm text-admin-ash-3 shrink-0">{i + 1}</span>
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-admin-info-light text-admin-info shrink-0">
                      <Video size={13} />
                    </span>
                    <span className="text-sm text-admin-ash-1 truncate">{lesson.title}</span>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => onAddLessonClick?.(module.id)}
                  className="flex w-full items-center gap-3 px-4 py-2.5 pl-11 text-left hover:bg-admin-ash-7/20 transition-colors"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-admin-primary-light text-admin-primary shrink-0">
                    <Plus size={14} />
                  </span>
                  <span className="text-sm text-admin-ash-2">Add lessons</span>
                </button>
              </div>
            )}
          </div>
        )
      })}

      {/* Add new module trigger row */}
      <button
        type="button"
        onClick={() => onAddModuleClick?.()}
        className={`flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors ${
          isAddModuleActive ? 'bg-admin-ash-7/40' : 'hover:bg-admin-ash-7/20'
        }`}
      >
        <GripVertical size={16} className="text-admin-ash-5 shrink-0" />
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-admin-primary-light text-admin-primary shrink-0">
          <Plus size={14} />
        </span>
        <span className="flex-1 text-sm font-semibold text-admin-ink">Add new module</span>
        {isAddModuleActive ? (
          <ChevronDown size={16} className="text-admin-ash-3 shrink-0" />
        ) : (
          <ChevronRight size={16} className="text-admin-ash-3 shrink-0" />
        )}
      </button>
    </div>
  )
}

export default ModuleList
