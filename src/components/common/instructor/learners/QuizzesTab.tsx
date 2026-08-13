import React from 'react'
import StatusPill from '../../../ui/instructor/learners/StatusPill'
import { quizStatusTone } from '../../../ui/instructor/learners/statusTones'
import type { LearnerProfile } from '../../../ui/instructor/learners/learnersData'

const QuizzesTab: React.FC<{ profile: LearnerProfile }> = ({ profile }) => {
  return (
    <div className="pt-4">
      <div className="rounded-2xl border border-admin-ash-7 bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] border-collapse">
            <thead>
              <tr className="bg-admin-ash-7/40 text-left">
                <th className="px-5 py-3 text-sm font-semibold text-admin-ash-1">Quiz</th>
                <th className="px-5 py-3 text-sm font-semibold text-admin-ash-1">Modules</th>
                <th className="px-5 py-3 text-sm font-semibold text-admin-ash-1">Attempts</th>
                <th className="px-5 py-3 text-sm font-semibold text-admin-ash-1">Score</th>
                <th className="px-5 py-3 text-sm font-semibold text-admin-ash-1">Status</th>
              </tr>
            </thead>
            <tbody>
              {profile.quizzes.map((item, i) => (
                <tr key={i} className="border-b border-admin-ash-7 last:border-b-0 hover:bg-admin-ash-7/20">
                  <td className="px-5 py-4 text-sm font-semibold text-admin-ink whitespace-nowrap">{item.quiz}</td>
                  <td className="px-5 py-4 text-sm text-admin-ash-2 whitespace-nowrap">{item.module}</td>
                  <td className="px-5 py-4 text-sm text-admin-ash-2 whitespace-nowrap">{item.attempts}</td>
                  <td className="px-5 py-4 text-sm text-admin-ash-2 whitespace-nowrap">{item.score}</td>
                  <td className="px-5 py-4">
                    <StatusPill tone={quizStatusTone(item.status)}>{item.status}</StatusPill>
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

export default QuizzesTab
