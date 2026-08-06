import React, { useState } from 'react'
import DashboardLayout from '../../../components/layout/instruct/DashboardLayout'
import CourseBuilderHeader from '../../../components/ui/instructor/CourseBuilderHeader'
import CourseBuilderTabs from '../../../components/ui/instructor/CourseBuilderTabs'
import ModuleList from '../../../components/ui/instructor/ModuleList'
import AddModulePanel from '../../../components/ui/instructor/AddModulePanel'
import CreateLessonPanel from '../../../components/ui/instructor/CreateLessonPanel'
import SuccessToast from '../../../components/ui/instructor/SuccessToast'
import { courseBuilderModules } from '../../../components/ui/instructor/courseBuilderData'

type RightPanel =
  | { type: 'add-module' }
  | { type: 'add-lesson'; moduleId: string }

const ModulesLessons: React.FC = () => {
  // Which module (if any) is expanded in the left rail, revealing its lessons.
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(null)

  // Which form is shown on the right — defaults to "Add a New Module".
  const [rightPanel, setRightPanel] = useState<RightPanel>({ type: 'add-module' })

  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const handleToggleModule = (moduleId: string) => {
    setExpandedModuleId((current) => (current === moduleId ? null : moduleId))
  }

  const handleAddLessonClick = (moduleId: string) => {
    setExpandedModuleId(moduleId)
    setRightPanel({ type: 'add-lesson', moduleId })
  }

  const handleAddModuleClick = () => {
    setRightPanel({ type: 'add-module' })
  }

  const handleCancelAddModule = () => {
    setExpandedModuleId(null)
  }

  const handleCancelAddLesson = () => {
    setExpandedModuleId(null)
    setRightPanel({ type: 'add-module' })
  }

  const activeModule = courseBuilderModules.find(
    (m) => rightPanel.type === 'add-lesson' && m.id === rightPanel.moduleId
  )

  return (
    <DashboardLayout>
      <div className="max-w-[1400px]">
        <CourseBuilderHeader />
        <CourseBuilderTabs />

        {toastMessage && (
          <SuccessToast message={toastMessage} onDismiss={() => setToastMessage(null)} />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6 items-start">
          <ModuleList
            expandedModuleId={expandedModuleId}
            onToggleModule={handleToggleModule}
            onAddLessonClick={handleAddLessonClick}
            onAddModuleClick={handleAddModuleClick}
            isAddModuleActive={rightPanel.type === 'add-module'}
          />

          {rightPanel.type === 'add-module' ? (
            <AddModulePanel
              onCancel={handleCancelAddModule}
              onCreated={(moduleName) => setToastMessage(`"${moduleName}" has been created`)}
            />
          ) : (
            <CreateLessonPanel
              moduleTitle={activeModule?.title ?? 'this module'}
              onCancel={handleCancelAddLesson}
              onCreated={(lessonName) => setToastMessage(`"${lessonName}" has been created`)}
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ModulesLessons
