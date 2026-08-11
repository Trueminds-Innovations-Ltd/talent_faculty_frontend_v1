import React from 'react'
import StatusPill from '../../../ui/instructor/learners/StatusPill'
import { courseStatusTone } from '../../../ui/instructor/learners/statusTones'
import ProgressBar from '../../../ui/instructor/learners/ProgressBar'
import type { LearnerProfile } from '../../../ui/instructor/learners/learnersData'

const CoursesTab: React.FC<{ profile: LearnerProfile }> = ({ profile }) => {
  return (
    <div className="pt-4">
      <div className="rounded-2xl border border-admin-ash-7 bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] border-collapse">
            <thead>
              <tr className="bg-admin-ash-7/40 text-left">
                <th className="px-5 py-3 text-sm font-semibold text-admin-ash-1">Courses</th>
                <th className="px-5 py-3 text-sm font-semibold text-admin-ash-1">Progress</th>
                <th className="px-5 py-3 text-sm font-semibold text-admin-ash-1">Lessons</th>
                <th className="px-5 py-3 text-sm font-semibold text-admin-ash-1">Grade</th>
                <th className="px-5 py-3 text-sm font-semibold text-admin-ash-1">Status</th>
              </tr>
            </thead>
            <tbody>
              {profile.courses.map((course, i) => (
                <tr key={i} className="border-b border-admin-ash-7 last:border-b-0 hover:bg-admin-ash-7/20">
                  <td className="px-5 py-4 text-sm font-semibold text-admin-ink whitespace-nowrap">{course.course}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3 min-w-[140px]">
                      <span className="text-sm text-admin-ash-2 w-10 shrink-0">{course.progress}%</span>
                      <ProgressBar value={course.progress} className="w-28" />
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-admin-ash-2 whitespace-nowrap">{course.lessons}</td>
                  <td className="px-5 py-4 text-sm font-semibold whitespace-nowrap">
                    {course.grade === '—' ? (
                      <span className="text-admin-ash-4">—</span>
                    ) : (
                      <span className={Number(course.grade) < 50 ? 'text-admin-danger' : 'text-admin-ink'}>
                        {course.grade}%
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <StatusPill tone={courseStatusTone(course.status)}>{course.status}</StatusPill>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default CoursesTab
