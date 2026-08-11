import React from 'react'
import StatusPill from '../../../ui/instructor/learners/StatusPill'
import { assignmentStatusTone } from '../../../ui/instructor/learners/statusTones'
import type { LearnerProfile } from '../../../ui/instructor/learners/learnersData'

const AssignmentTab: React.FC<{ profile: LearnerProfile }> = ({ profile }) => {
  return (
    <div className="pt-4">
      <div className="rounded-2xl border border-admin-ash-7 bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] border-collapse">
            <thead>
              <tr className="bg-admin-ash-7/40 text-left">
                <th className="px-5 py-3 text-sm font-semibold text-admin-ash-1">Assignment</th>
                <th className="px-5 py-3 text-sm font-semibold text-admin-ash-1">Modules</th>
                <th className="px-5 py-3 text-sm font-semibold text-admin-ash-1">Due date</th>
                <th className="px-5 py-3 text-sm font-semibold text-admin-ash-1">Score</th>
                <th className="px-5 py-3 text-sm font-semibold text-admin-ash-1">Status</th>
              </tr>
            </thead>
            <tbody>
              {profile.assignments.map((item, i) => (
                <tr key={i} className="border-b border-admin-ash-7 last:border-b-0 hover:bg-admin-ash-7/20">
                  <td className="px-5 py-4 text-sm font-semibold text-admin-ink whitespace-nowrap">{item.assignment}</td>
                  <td className="px-5 py-4 text-sm text-admin-ash-2 whitespace-nowrap">{item.module}</td>
                  <td className="px-5 py-4 text-sm text-admin-ash-3 whitespace-nowrap">{item.dueDate}</td>
                  <td className="px-5 py-4 text-sm text-admin-ash-2 whitespace-nowrap">{item.score}</td>
                  <td className="px-5 py-4">
                    <StatusPill tone={assignmentStatusTone(item.status)}>{item.status}</StatusPill>
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

export default AssignmentTab
