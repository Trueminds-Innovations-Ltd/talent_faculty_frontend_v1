import React from 'react'
import { Construction } from 'lucide-react'
import DashboardLayout from '../../../components/layout/instruct/DashboardLayout'
import CourseBuilderHeader from '../../../components/ui/instructor/CourseBuilderHeader'
import CourseBuilderTabs from '../../../components/ui/instructor/CourseBuilderTabs'

interface ComingSoonTabProps {
  title: string
}

const ComingSoonTab: React.FC<ComingSoonTabProps> = ({ title }) => {
  return (
    <DashboardLayout>
      <div className="max-w-[1400px]">
        <CourseBuilderHeader />
        <CourseBuilderTabs />

        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-admin-ash-7 bg-white py-24 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-admin-primary-light text-admin-primary">
            <Construction size={22} />
          </span>
          <h2 className="text-lg font-bold text-admin-ink">{title} is coming soon</h2>
          <p className="max-w-sm text-sm text-admin-ash-3">
            This tab is still being built. Check back soon, or head over to Modules / lessons in the meantime.
          </p>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ComingSoonTab
