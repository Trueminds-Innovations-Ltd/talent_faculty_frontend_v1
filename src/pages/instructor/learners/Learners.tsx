import { useParams, useNavigate, Navigate } from 'react-router-dom'
import LearnerStatusFilterTabs from '../../../components/ui/instructor/learners/LearnerStatusFilterTabs'
import StatusPill from '../../../components/ui/instructor/learners/StatusPill'
import { learnerStatusTone } from '../../../components/ui/instructor/learners/statusTones'
import ProgressBar from '../../../components/ui/instructor/learners/ProgressBar'
import { learners, type LearnerStatus } from '../../../components/ui/instructor/learners/learnersData'

const VALID_STATUSES = ['all', 'active', 'support', 'completed'] as const
type StatusParam = (typeof VALID_STATUSES)[number]

const matchesFilter = (status: LearnerStatus, filter: StatusParam) => {
  switch (filter) {
    case 'active':
      return status === 'On Track' || status === 'At Risk'
    case 'support':
      return status === 'At Risk'
    case 'completed':
      return status === 'Completed'
    case 'all':
    default:
      return true
  }
}

export default function Learners() {
  const { status } = useParams<{ status: string }>()
  const navigate = useNavigate()

  if (!status || !VALID_STATUSES.includes(status as StatusParam)) {
    return <Navigate to="/instructor/learners/all" replace />
  }

  const filteredLearners = learners.filter((l) => matchesFilter(l.status, status as StatusParam))

  return (
    <div className="space-y-6 m-auto max-w-[1400px] w-full">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-admin-ink">Learners</h1>
        <p className="text-sm text-admin-ash-3">
          View learner progress, track performance, and support their learning journey.
        </p>
      </div>

      <LearnerStatusFilterTabs />

      <div className="space-y-3">
        <h2 className="text-lg font-bold text-admin-ink">Assigned learners</h2>

        <div className="rounded-2xl border border-admin-ash-7 bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse">
              <thead>
                <tr className="bg-admin-ash-7/40 text-left">
                  <th className="px-5 py-3 text-sm font-semibold text-admin-ash-1">Learners</th>
                  <th className="px-5 py-3 text-sm font-semibold text-admin-ash-1">Module</th>
                  <th className="px-5 py-3 text-sm font-semibold text-admin-ash-1">Grade</th>
                  <th className="px-5 py-3 text-sm font-semibold text-admin-ash-1">Progress</th>
                  <th className="px-5 py-3 text-sm font-semibold text-admin-ash-1">Last activity</th>
                  <th className="px-5 py-3 text-sm font-semibold text-admin-ash-1">Status</th>
                  <th className="px-5 py-3 text-sm font-semibold text-admin-ash-1"></th>
                </tr>
              </thead>
              <tbody>
                {filteredLearners.map((learner) => (
                  <tr key={learner.id} className="border-b border-admin-ash-7 last:border-b-0 hover:bg-admin-ash-7/20">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3 min-w-[200px]">
                        <img
                          src={learner.avatar}
                          alt={learner.name}
                          className="h-10 w-10 rounded-full object-cover shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-admin-ink truncate">{learner.name}</p>
                          <p className="text-xs text-admin-ash-3 truncate">{learner.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-admin-ash-2 whitespace-nowrap">{learner.module}</td>
                    <td className="px-5 py-4 text-sm font-semibold whitespace-nowrap">
                      {learner.grade === null ? (
                        <span className="text-admin-ash-4">—</span>
                      ) : (
                        <span className={learner.grade < 50 ? 'text-admin-danger' : 'text-admin-ink'}>
                          {learner.grade}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3 min-w-[140px]">
                        <span className="text-sm text-admin-ash-2 w-10 shrink-0">{learner.progress}%</span>
                        <ProgressBar value={learner.progress} className="w-28" />
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-admin-ash-2 max-w-[180px]">{learner.lastActivity}</td>
                    <td className="px-5 py-4">
                      <StatusPill tone={learnerStatusTone(learner.status)}>{learner.status}</StatusPill>
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => navigate(`/instructor/learners/${learner.id}/overview`)}
                        className="rounded-lg border border-admin-ash-6 px-4 py-1.5 text-sm font-medium text-admin-ash-1 hover:bg-admin-ash-7/40 transition-colors whitespace-nowrap"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredLearners.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-5 py-10 text-center text-sm text-admin-ash-3">
                      No learners in this view yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
