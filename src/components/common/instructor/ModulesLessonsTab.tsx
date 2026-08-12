import { useState } from 'react'
import {
  ChevronDown,
  ChevronRight,
  GripVertical,
  Video,
  Plus,
} from 'lucide-react'
import ModuleFormPanel from '../../ui/instructor/ModuleFormPanel'
import CreateLessonPanel from '../../ui/instructor/CreateLessonPanel'
import ModuleDetailsPanel from '../../ui/instructor/ModuleDetailsPanel'
import SuccessToast from '../../ui/instructor/SuccessToast'

interface Lesson {
  id: string
  title: string
}

interface ModuleItem {
  id: number
  title: string
  description: string
  lessons: Lesson[]
}

const INITIAL_MODULES: ModuleItem[] = [
  {
    id: 1,
    title: 'UX Research Basics',
    description: 'Learn the foundations of UX Research, including how to understand users, identify problems, and gather insights to create better experiences.',
    lessons: [
      { id: '1-1', title: 'What is UX Research' },
      { id: '1-2', title: 'Why It Matters' },
      { id: '1-3', title: 'Research Roles' },
    ],
  },
  {
    id: 2,
    title: 'User Understanding',
    description: 'Explore techniques to build empathy and understand your target audience deeply.',
    lessons: [
      { id: '2-1', title: 'Empathy Mapping' },
      { id: '2-2', title: 'User Personas' },
      { id: '2-3', title: 'Customer Journey Mapping' },
    ],
  },
  {
    id: 3,
    title: 'Research Planning',
    description: 'Structure your research goals, define methodologies, and prepare test scripts.',
    lessons: [
      { id: '3-1', title: 'Setting Research Goals' },
      { id: '3-2', title: 'Choosing Methodologies' },
      { id: '3-3', title: 'Script Writing' },
    ],
  },
  {
    id: 4,
    title: 'User Interviews',
    description: 'Master qualitative user interviewing techniques and question design.',
    lessons: [
      { id: '4-1', title: 'Interview Preparation' },
      { id: '4-2', title: 'Asking Non-biased Questions' },
      { id: '4-3', title: 'Synthesizing Notes' },
    ],
  },
  {
    id: 5,
    title: 'Surveys & Data',
    description: 'Design quantitative surveys to collect actionable data at scale.',
    lessons: [
      { id: '5-1', title: 'Survey Question Types' },
      { id: '5-2', title: 'Distribution Channels' },
      { id: '5-3', title: 'Quantitative Data Cleaning' },
    ],
  },
  {
    id: 6,
    title: 'Usability Testing',
    description: 'Plan, execute, and analyze moderated and unmoderated usability tests.',
    lessons: [
      { id: '6-1', title: 'Test Scenario Setup' },
      { id: '6-2', title: 'Moderating Sessions' },
      { id: '6-3', title: 'Usability Metrics' },
    ],
  },
  {
    id: 7,
    title: 'Research Analysis',
    description: 'Turn raw qualitative and quantitative data into meaningful findings.',
    lessons: [
      { id: '7-1', title: 'Affinity Diagramming' },
      { id: '7-2', title: 'Identifying Patterns' },
      { id: '7-3', title: 'Insight Extraction' },
    ],
  },
  {
    id: 8,
    title: 'User Models',
    description: 'Translate insights into mental models, workflows, and behavioral profiles.',
    lessons: [
      { id: '8-1', title: 'Behavioral Archetypes' },
      { id: '8-2', title: 'Task Models' },
      { id: '8-3', title: 'Mental Models' },
    ],
  },
  {
    id: 9,
    title: 'Research Reports',
    description: 'Communicate findings effectively to stakeholders and product teams.',
    lessons: [
      { id: '9-1', title: 'Structuring Reports' },
      { id: '9-2', title: 'Presenting to Stakeholders' },
      { id: '9-3', title: 'Actionable Recommendations' },
    ],
  },
]

// What's currently shown on the right-hand panel.
type RightPanel =
  | { type: 'details'; moduleId: number }
  | { type: 'edit-module'; moduleId: number }
  | { type: 'add-module' }
  | { type: 'add-lesson'; moduleId: number }

export default function ModulesLessonsTab() {
  const [modules, setModules] = useState<ModuleItem[]>(INITIAL_MODULES)
  const [expandedModuleId, setExpandedModuleId] = useState<number | null>(1)
  const [rightPanel, setRightPanel] = useState<RightPanel>({ type: 'details', moduleId: 1 })
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const getModule = (id: number) => modules.find((m) => m.id === id)

  const toggleModuleAccordion = (id: number) => {
    setExpandedModuleId((current) => (current === id ? null : id))
    // Browsing a module's lessons also brings its details up on the right,
    // unless the right panel is already busy with an add/edit form for it.
    setRightPanel((current) => {
      const alreadyOnThisModule =
        (current.type === 'edit-module' || current.type === 'add-lesson' || current.type === 'details') &&
        current.moduleId === id
      return alreadyOnThisModule ? current : { type: 'details', moduleId: id }
    })
  }

  const handleAddLessonClick = (moduleId: number) => {
    setExpandedModuleId(moduleId)
    setRightPanel({ type: 'add-lesson', moduleId })
  }

  const handleAddModuleClick = () => {
    setRightPanel({ type: 'add-module' })
  }

  const handleEditModuleClick = (moduleId: number) => {
    setRightPanel({ type: 'edit-module', moduleId })
  }

  const handleModuleCreated = (values: { name: string; description: string; lessonCount: string }) => {
    const nextId = Math.max(...modules.map((m) => m.id)) + 1
    setModules((prev) => [
      ...prev,
      { id: nextId, title: values.name, description: values.description, lessons: [] },
    ])
    setToastMessage(`"${values.name}" has been created`)
  }

  const handleModuleUpdated = (
    moduleId: number,
    values: { name: string; description: string; lessonCount: string }
  ) => {
    setModules((prev) =>
      prev.map((m) => (m.id === moduleId ? { ...m, title: values.name, description: values.description } : m))
    )
    setToastMessage(`"${values.name}" has been updated`)
    setRightPanel({ type: 'details', moduleId })
  }

  const handleLessonCreated = (moduleId: number, lessonName: string) => {
    setModules((prev) =>
      prev.map((m) =>
        m.id === moduleId
          ? { ...m, lessons: [...m.lessons, { id: `${moduleId}-${m.lessons.length + 1}`, title: lessonName }] }
          : m
      )
    )
    setToastMessage(`"${lessonName}" has been created`)
  }

  const editingModule = rightPanel.type === 'edit-module' ? getModule(rightPanel.moduleId) : undefined
  const lessonModule = rightPanel.type === 'add-lesson' ? getModule(rightPanel.moduleId) : undefined
  const detailsModule = rightPanel.type === 'details' ? getModule(rightPanel.moduleId) : undefined

  return (
    <div className="pt-4">
      {toastMessage && (
        <SuccessToast message={toastMessage} onDismiss={() => setToastMessage(null)} />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-6 space-y-3">
          <div className="rounded-2xl border border-admin-ash-7 bg-white overflow-hidden divide-y divide-admin-ash-7">
            {modules.map((moduleItem) => {
              const isExpanded = expandedModuleId === moduleItem.id
              const isSelected =
                (rightPanel.type === 'details' ||
                  rightPanel.type === 'edit-module' ||
                  rightPanel.type === 'add-lesson') &&
                rightPanel.moduleId === moduleItem.id

              return (
                <div key={moduleItem.id} className="transition-colors">
                  <button
                    type="button"
                    onClick={() => toggleModuleAccordion(moduleItem.id)}
                    className={`flex w-full items-center justify-between gap-3 p-4 text-left hover:bg-admin-ash-7/20 transition-colors max-md:flex-col max-md:items-start ${
                      isSelected ? 'bg-admin-ash-7/30' : ''
                    }`}
                  >
                    <span className="flex items-center gap-3 min-w-0">
                      <GripVertical size={16} className="text-admin-ash-5 shrink-0" />
                      <span className="shrink-0 rounded-md bg-admin-primary-light px-2.5 py-1 text-xs font-bold text-admin-primary-dark whitespace-nowrap">
                        Module {moduleItem.id}
                      </span>
                      <span className="text-sm font-bold text-admin-ink truncate">{moduleItem.title}</span>
                    </span>

                    <span className="flex items-center gap-3 shrink-0 max-md:ml-auto max-md:mt-2">
                      <span className="text-xs font-medium text-admin-ash-3 whitespace-nowrap">
                        {moduleItem.lessons.length} lessons
                      </span>
                      {isExpanded ? (
                        <ChevronDown size={16} className="text-admin-ash-3" />
                      ) : (
                        <ChevronRight size={16} className="text-admin-ash-3" />
                      )}
                    </span>
                  </button>

                  {isExpanded && (
                    <div className="bg-white px-4 pb-4 pt-1 space-y-1">
                      {moduleItem.lessons.map((lesson, idx) => (
                        <div
                          key={lesson.id}
                          className="flex items-center gap-3 rounded-xl py-2.5 pl-8 pr-4 text-sm font-medium text-admin-ash-1 hover:bg-admin-ash-7/20 transition-colors"
                        >
                          <span className="w-3 text-xs font-bold text-admin-ash-3">{idx + 1}</span>
                          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-admin-info-light text-admin-info shrink-0">
                            <Video size={13} />
                          </span>
                          <span className="flex-1 truncate">{lesson.title}</span>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() => handleAddLessonClick(moduleItem.id)}
                        className="mt-2 flex items-center gap-2 pl-8 py-2 text-sm font-bold text-admin-primary hover:text-admin-primary-dark transition-colors"
                      >
                        <Plus size={16} />
                        Add lessons
                      </button>
                    </div>
                  )}
                </div>
              )
            })}

            <button
              type="button"
              onClick={handleAddModuleClick}
              className={`flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-admin-ash-7/20 ${
                rightPanel.type === 'add-module' ? 'bg-admin-ash-7/30' : ''
              }`}
            >
              <span className="flex items-center gap-3">
                <GripVertical size={16} className="text-admin-ash-5 shrink-0" />
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-admin-primary-light text-admin-primary shrink-0">
                  <Plus size={14} />
                </span>
                <span className="text-sm font-bold text-admin-ink">Add new module</span>
              </span>
              {rightPanel.type === 'add-module' ? (
                <ChevronDown size={16} className="text-admin-ash-3" />
              ) : (
                <ChevronRight size={16} className="text-admin-ash-3" />
              )}
            </button>
          </div>
        </div>

        <div className="lg:col-span-6">
          {rightPanel.type === 'add-module' && (
            <ModuleFormPanel
              mode="create"
              onCancel={() => setRightPanel({ type: 'details', moduleId: expandedModuleId ?? modules[0].id })}
              onSubmit={handleModuleCreated}
            />
          )}

          {rightPanel.type === 'edit-module' && editingModule && (
            <ModuleFormPanel
              mode="edit"
              initialName={editingModule.title}
              initialDescription={editingModule.description}
              initialLessonCount={editingModule.lessons.length}
              onCancel={() => setRightPanel({ type: 'details', moduleId: editingModule.id })}
              onSubmit={(values) => handleModuleUpdated(editingModule.id, values)}
            />
          )}

          {rightPanel.type === 'add-lesson' && lessonModule && (
            <CreateLessonPanel
              moduleTitle={lessonModule.title}
              onCancel={() => setRightPanel({ type: 'details', moduleId: lessonModule.id })}
              onCreated={(lessonName) => handleLessonCreated(lessonModule.id, lessonName)}
            />
          )}

          {rightPanel.type === 'details' && detailsModule && (
            <ModuleDetailsPanel
              moduleNumber={detailsModule.id}
              title={detailsModule.title}
              description={detailsModule.description}
              lessonCount={detailsModule.lessons.length}
              onEditClick={() => handleEditModuleClick(detailsModule.id)}
            />
          )}
        </div>
      </div>
    </div>
  )
}
