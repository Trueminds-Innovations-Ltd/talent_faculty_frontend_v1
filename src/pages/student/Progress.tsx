import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import StatCard from '../../components/ui/StatCard'
import WeeklyHoursChart from '../../components/ui/WeeklyHoursChart'
import CompletionDonut from '../../components/ui/CompletionDonut'
import AchievementBadge from '../../components/ui/AchievementBadge'

import fireIcon from '../../assets/fire.jpg'
import trophyIcon from '../../assets/trophy.jpg'
import brainIcon from '../../assets/brain.jpg'
import certIcon from '../../assets/certificate.jpg'

const weeklyHours = [
  { day: 'Sun', hours: 8, color: '#2B72FB' },
  { day: 'Mon', hours: 6, color: '#64BDC6' },
  { day: 'Tue', hours: 14, color: '#EECA34' },
  { day: 'Wed', hours: 40, color: '#FE6A35' },
  { day: 'Thu', hours: 42, color: '#FA4B42' },
  { day: 'Fri', hours: 34, color: '#EE60E0' },
  { day: 'Sat', hours: 46, color: '#7B47E9' },
]

const completionBreakdown = [
  { name: 'In Progress', value: 51.6, color: '#EECA34' },
  { name: 'Completed', value: 32.3, color: '#64BDC6' },
  { name: 'Not Started', value: 16.1, color: '#2B72FB' },
]

const achievements = [
  {
    label: '7-Day Streak',
    icon: fireIcon,
    color: '#F59E0B',
  },
  {
    label: 'Top Performer',
    icon: trophyIcon,
    color: '#3B82F6',
  },
  {
    label: 'Quiz Master',
    icon: brainIcon,
    color: '#9747FF',
  },
  {
    label: 'First Certificate',
    icon: certIcon,
    color: '#057834',
  },
]

const Progress: React.FC = () => {
  const [range, setRange] = useState<
    'This Week' | 'Last Week' | 'This Month'
  >('This Week')
  const [rangeOpen, setRangeOpen] = useState(false)

  return (
    <DashboardLayout
      title="Progress"
      subtitle="Track your learning progress and achievements"
    >
      <div className="space-y-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Course Completion"
            value="76%"
            variant="green"
            helper="12 of 16 modules completed"
          />
          <StatCard
            label="Assignments Completed"
            value="18"
            variant="blue"
          />
          <StatCard
            label="Assessment Average"
            value="88%"
            variant="orange"
          />
          <StatCard
            label="Learning Hours"
            value="84"
            variant="purple"
            helper="Total Hours"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:flex-[1.5] bg-white rounded-2xl border border-neutral-100 p-5 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold text-neutral-800">
                Weekly Learning Hours
              </h3>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setRangeOpen((v) => !v)}
                  className="flex items-center gap-1.5 text-xs font-medium text-neutral-600 border border-neutral-200 rounded-lg px-3 py-1.5 hover:bg-neutral-50 transition-colors"
                >
                  {range}
                  <ChevronDown size={14} />
                </button>

                {rangeOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setRangeOpen(false)}
                    />
                    <div className="absolute right-0 mt-1 w-36 bg-white border border-neutral-100 rounded-lg shadow-lg py-1 z-20">
                      {(['This Week', 'Last Week', 'This Month'] as const).map(
                        (opt) => (
                          <button
                            key={opt}
                            onClick={() => {
                              setRange(opt)
                              setRangeOpen(false)
                            }}
                            className="w-full text-left px-3 py-1.5 text-xs text-neutral-600 hover:bg-neutral-50"
                          >
                            {opt}
                          </button>
                        )
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>

            <WeeklyHoursChart data={weeklyHours} />
          </div>

          <div className="w-full lg:flex-1 bg-white rounded-2xl border border-neutral-100 p-5 min-w-0">
            <h3 className="text-sm font-bold text-neutral-800 mb-6">
              Course Completion
            </h3>

            <CompletionDonut data={completionBreakdown} />
          </div>
        </div>

        <section>
          <h2 className="text-lg font-bold text-neutral-800 mb-5">
            Recent Achievements
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {achievements.map((item) => (
              <AchievementBadge key={item.label} {...item} />
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  )
}

export default Progress