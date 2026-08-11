import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { ChevronLeft, Mail } from 'lucide-react'
import LearnerProfileTabs from '../../../components/ui/instructor/learners/LearnerProfileTabs'
import StatusPill from '../../../components/ui/instructor/learners/StatusPill'
import { learnerStatusTone } from '../../../components/ui/instructor/learners/statusTones'
import { getLearner, getLearnerProfile } from '../../../components/ui/instructor/learners/learnersData'
import OverviewTab from '../../../components/common/instructor/learners/OverviewTab'
import CoursesTab from '../../../components/common/instructor/learners/CoursesTab'
import AssignmentTab from '../../../components/common/instructor/learners/AssignmentTab'
import QuizzesTab from '../../../components/common/instructor/learners/QuizzesTab'

const VALID_TABS = ['overview', 'courses', 'assignment', 'quizzes'] as const
type TabParam = (typeof VALID_TABS)[number]

export default function LearnerProfile() {
  const { learnerId, tab } = useParams<{ learnerId: string; tab: string }>()
  const navigate = useNavigate()

  const learner = learnerId ? getLearner(learnerId) : undefined

  if (!learner) {
    return <Navigate to="/instructor/learners/all" replace />
  }

  if (!tab || !VALID_TABS.includes(tab as TabParam)) {
    return <Navigate to={`/instructor/learners/${learner.id}/overview`} replace />
  }

  const profile = getLearnerProfile(learner)

  return (
    <div className="space-y-6 m-auto max-w-[1400px] w-full mx-auto">
      <button
        onClick={() => navigate('/instructor/learners/all')}
        className="flex items-center gap-2 text-sm font-bold text-admin-ink hover:text-admin-primary transition-colors"
      >
        <ChevronLeft size={18} />
        Back to Learners
      </button>

      <div className="flex items-center gap-4">
        <img
          src={learner.avatar}
          alt={learner.name}
          className="h-16 w-16 rounded-full object-cover shrink-0"
        />
        <div>
          <h1 className="text-xl font-bold text-admin-ink">{learner.name}</h1>
          <p className="text-sm text-admin-ash-3">{learner.email}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-lg font-bold text-admin-ink">{profile.track}</h2>
          <StatusPill tone={learnerStatusTone(learner.status)}>{learner.status}</StatusPill>
        </div>
        <p className="text-sm text-admin-ash-3">Last Active: {profile.lastActiveLabel}</p>

        <a
          href={`mailto:${learner.email}`}
          className="inline-flex items-center gap-2 rounded-xl border border-admin-ash-6 px-5 py-2.5 text-sm font-semibold text-admin-ash-1 hover:bg-admin-ash-7/40 transition-colors"
        >
          <Mail size={15} />
          Reach out
        </a>
      </div>

      <LearnerProfileTabs learnerId={learner.id} />

      {tab === 'overview' && <OverviewTab profile={profile} />}
      {tab === 'courses' && <CoursesTab profile={profile} />}
      {tab === 'assignment' && <AssignmentTab profile={profile} />}
      {tab === 'quizzes' && <QuizzesTab profile={profile} />}
    </div>
  )
}
