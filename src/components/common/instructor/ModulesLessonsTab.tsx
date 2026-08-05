import { useState } from 'react'
import {
  ChevronDown,
  ChevronRight,
  GripVertical,
  Video,
  Plus,
  Pencil
} from 'lucide-react'

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

const MOCK_MODULES: ModuleItem[] = [
  {
    id: 1,
    title: 'UX Research Basics',
    description: 'Learn the foundations of UX Research, including how to understand users, identify problems, and gather insights to create better experiences.',
    lessons: [
      { id: '1-1', title: 'What is UX Research' },
      { id: '1-2', title: 'Why It Matters' },
      { id: '1-3', title: 'Research Roles' }
    ]
  },
  {
    id: 2,
    title: 'User Understanding',
    description: 'Explore techniques to build empathy and understand your target audience deeply.',
    lessons: [
      { id: '2-1', title: 'Empathy Mapping' },
      { id: '2-2', title: 'User Personas' },
      { id: '2-3', title: 'Customer Journey Mapping' }
    ]
  },
  {
    id: 3,
    title: 'Research Planning',
    description: 'Structure your research goals, define methodologies, and prepare test scripts.',
    lessons: [
      { id: '3-1', title: 'Setting Research Goals' },
      { id: '3-2', title: 'Choosing Methodologies' },
      { id: '3-3', title: 'Script Writing' }
    ]
  },
  {
    id: 4,
    title: 'User Interviews',
    description: 'Master qualitative user interviewing techniques and question design.',
    lessons: [
      { id: '4-1', title: 'Interview Preparation' },
      { id: '4-2', title: 'Asking Non-biased Questions' },
      { id: '4-3', title: 'Synthesizing Notes' }
    ]
  },
  {
    id: 5,
    title: 'Surveys & Data',
    description: 'Design quantitative surveys to collect actionable data at scale.',
    lessons: [
      { id: '5-1', title: 'Survey Question Types' },
      { id: '5-2', title: 'Distribution Channels' },
      { id: '5-3', title: 'Quantitative Data Cleaning' }
    ]
  },
  {
    id: 6,
    title: 'Usability Testing',
    description: 'Plan, execute, and analyze moderated and unmoderated usability tests.',
    lessons: [
      { id: '6-1', title: 'Test Scenario Setup' },
      { id: '6-2', title: 'Moderating Sessions' },
      { id: '6-3', title: 'Usability Metrics' }
    ]
  },
  {
    id: 7,
    title: 'Research Analysis',
    description: 'Turn raw qualitative and quantitative data into meaningful findings.',
    lessons: [
      { id: '7-1', title: 'Affinity Diagramming' },
      { id: '7-2', title: 'Identifying Patterns' },
      { id: '7-3', title: 'Insight Extraction' }
    ]
  },
  {
    id: 8,
    title: 'User Models',
    description: 'Translate insights into mental models, workflows, and behavioral profiles.',
    lessons: [
      { id: '8-1', title: 'Behavioral Archetypes' },
      { id: '8-2', title: 'Task Models' },
      { id: '8-3', title: 'Mental Models' }
    ]
  },
  {
    id: 9,
    title: 'Research Reports',
    description: 'Communicate findings effectively to stakeholders and product teams.',
    lessons: [
      { id: '9-1', title: 'Structuring Reports' },
      { id: '9-2', title: 'Presenting to Stakeholders' },
      { id: '9-3', title: 'Actionable Recommendations' }
    ]
  }
]

export default function ModulesLessonsTab() {
  const [expandedModuleId, setExpandedModuleId] = useState<number | null>(1)
  const [selectedModuleId, setSelectedModuleId] = useState<number>(1)

  const selectedModule = MOCK_MODULES.find((m) => m.id === selectedModuleId) || MOCK_MODULES[0]

  const toggleModuleAccordion = (id: number) => {
    setExpandedModuleId(expandedModuleId === id ? null : id)
    setSelectedModuleId(id)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4 items-start">
      <div className="lg:col-span-6 space-y-3">
        <div className="border border-gray-200 rounded-2xl overflow-hidden divide-y divide-gray-100 bg-white">
          {MOCK_MODULES.map((moduleItem) => {
            const isExpanded = expandedModuleId === moduleItem.id
            const isSelected = selectedModuleId === moduleItem.id

            return (
              <div key={moduleItem.id} className="transition-colors">
                <div
                  onClick={() => toggleModuleAccordion(moduleItem.id)}
                  className={`flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50/80 transition-colors max-md:flex-col ${
                    isSelected ? 'bg-gray-50/50' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <GripVertical size={16} className="text-gray-300 hover:text-gray-500 cursor-grab shrink-0" />
                    <span className="px-2.5 py-1 bg-emerald-100/70 text-emerald-800 text-[11px] font-bold rounded-md whitespace-nowrap">
                      Module {moduleItem.id}
                    </span>
                    <span className="text-[14px] font-bold text-gray-800">
                      {moduleItem.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 max-md:ml-auto max-md:mt-2">
                    <span className="text-[12px] text-gray-400 font-medium">
                      {moduleItem.lessons.length} lessons
                    </span>
                    {isExpanded ? (
                      <ChevronDown size={16} className="text-gray-400" />
                    ) : (
                      <ChevronRight size={16} className="text-gray-400" />
                    )}
                  </div>
                </div>

                {isExpanded && (
                  <div className="bg-white px-4 pb-4 space-y-2 pt-1">
                    {moduleItem.lessons.map((lesson, idx) => (
                      <div
                        key={lesson.id}
                        className="flex items-center gap-3 pl-8 pr-4 py-2.5 rounded-xl hover:bg-gray-50 text-gray-700 text-[13px] font-medium transition-colors"
                      >
                        <span className="text-gray-400 font-bold text-[12px] w-3">
                          {idx + 1}
                        </span>
                        <Video size={16} className="text-emerald-600 shrink-0" />
                        <span className="flex-1 line-clamp-1">{lesson.title}</span>
                      </div>
                    ))}

                    <button className="flex items-center gap-2 pl-8 py-2 text-[13px] font-bold text-emerald-700 hover:text-emerald-800 transition-colors mt-2">
                      <Plus size={16} />
                      Add lessons
                    </button>
                  </div>
                )}
              </div>
            )
          })}

          <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 text-gray-500 transition-colors">
            <div className="flex items-center gap-3">
              <GripVertical size={16} className="text-gray-300 shrink-0" />
              <Plus size={16} className="text-gray-400" />
              <span className="text-[14px] font-bold text-gray-700">Add new module</span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </div>
        </div>

        <button className="flex items-center gap-2 text-[13px] font-bold text-emerald-700 hover:text-emerald-800 transition-colors pt-2 px-2">
          <Plus size={16} />
          Add lessons
        </button>
      </div>

      <div className="lg:col-span-6 border border-gray-200 rounded-2xl p-6 bg-white space-y-6 sticky top-6">
        <div className="flex items-center justify-between">
          <h3 className="text-[16px] font-bold text-gray-900">Module Details</h3>
          <button className="p-2 rounded-lg border border-gray-200 text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors">
            <Pencil size={16} />
          </button>
        </div>

        <div className="border border-gray-100 rounded-2xl p-6 bg-gray-50/30 space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-[20px] font-bold text-gray-900 leading-none">
              {selectedModule.id}
            </span>
            <div className="space-y-2">
              <h4 className="text-[15px] font-bold text-gray-900 leading-tight">
                {selectedModule.title}
              </h4>
              <p className="text-[13px] text-gray-400 leading-relaxed">
                {selectedModule.description}
              </p>
              <div className="text-[12px] text-gray-400 font-medium pt-2">
                {selectedModule.lessons.length} lessons
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}