import React from 'react'
import { ChartColumnBig, Target, BookOpenCheck, FileCheck } from 'lucide-react'
import StatusPill from '../../../ui/instructor/learners/StatusPill'
import { activityStatusTone } from '../../../ui/instructor/learners/statusTones'
import type { LearnerProfile } from '../../../ui/instructor/learners/learnersData'

const OverviewTab: React.FC<{ profile: LearnerProfile }> = ({ profile }) => {
  const stats = [
    { label: 'Overall Progress', value: `${profile.overallProgress}%`, icon: <ChartColumnBig size={16} />, highlight: profile.overallProgress < 30 },
    { label: 'Average Score', value: String(profile.averageScore), icon: <Target size={16} /> },
    { label: 'Lessons Completed', value: profile.lessonsCompleted, icon: <BookOpenCheck size={16} /> },
    { label: 'Assignment Completed', value: profile.assignmentsCompleted, icon: <FileCheck size={16} /> },
  ]

  return (
    <div className="pt-4 space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-admin-ash-7 bg-white p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-admin-ash-3">{stat.label}</p>
              <span className="text-admin-ash-4">{stat.icon}</span>
            </div>
            <p className={`mt-2 text-2xl font-bold ${stat.highlight ? 'text-admin-danger' : 'text-admin-ink'}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-lg font-bold text-admin-ink mb-3">Recent Activities</h3>
        <div className="rounded-2xl border border-admin-ash-7 bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse">
              <thead>
                <tr className="bg-admin-ash-7/40 text-left">
                  <th className="px-5 py-3 text-sm font-semibold text-admin-ash-1">Activity</th>
                  <th className="px-5 py-3 text-sm font-semibold text-admin-ash-1">Modules</th>
                  <th className="px-5 py-3 text-sm font-semibold text-admin-ash-1">Date</th>
                  <th className="px-5 py-3 text-sm font-semibold text-admin-ash-1">Status</th>
                </tr>
              </thead>
              <tbody>
                {profile.recentActivities.map((activity, i) => (
                  <tr key={i} className="border-b border-admin-ash-7 last:border-b-0 hover:bg-admin-ash-7/20">
                    <td className="px-5 py-4 text-sm font-medium text-admin-ink max-w-[280px]">{activity.activity}</td>
                    <td className="px-5 py-4 text-sm text-admin-ash-2 whitespace-nowrap">{activity.module}</td>
                    <td className="px-5 py-4 text-sm text-admin-ash-3 whitespace-nowrap">{activity.date}</td>
                    <td className="px-5 py-4">
                      <StatusPill tone={activityStatusTone(activity.status)}>{activity.status}</StatusPill>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OverviewTab
