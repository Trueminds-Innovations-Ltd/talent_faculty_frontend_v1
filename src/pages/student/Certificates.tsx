import React, { useState } from 'react'
import { Award, BookOpen, Clock } from 'lucide-react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import CertificateRow from '../../components/ui/CertificateRow'
import ProgressBar from '../../components/ui/ProgressBar'

type TabKey = 'earned' | 'eligible' | 'inProgress'

export interface Certificate {
  title: string
  instructor: string
}

const earned: Certificate[] = [
  {
    title: 'UI/UX Design Fundamentals',
    instructor: 'Grace Johnson',
  },
]

const eligible = [
  {
    title: 'Data Analysis Bootcamp',
    instructor: 'Grace Johnson',
    note: 'Final assessment required',
  },
  {
    title: 'Advanced JavaScript Patterns',
    instructor: 'Grace Johnson',
    note: 'Final assessment required',
  },
]

const inProgress = [
  {
    title: 'Product Management Essentials',
    instructor: 'Grace Johnson',
    progress: 62,
  },
  {
    title: 'Public Speaking for Educators',
    instructor: 'Grace Johnson',
    progress: 40,
  },
  {
    title: 'Intro to Machine Learning',
    instructor: 'Grace Johnson',
    progress: 18,
  },
]

const tabs = [
  {
    key: 'earned' as const,
    label: 'Earned',
    count: earned.length,
  },
  {
    key: 'eligible' as const,
    label: 'Eligible',
    count: eligible.length,
  },
  {
    key: 'inProgress' as const,
    label: 'In Progress',
    count: inProgress.length,
  },
]

const EmptyState: React.FC<{ message: string }> = ({ message }) => (
  <div className="flex flex-col items-center justify-center text-center py-16">
    <Award size={32} className="text-neutral-300 mb-3" />
    <p className="text-sm text-neutral-400 max-w-xs">{message}</p>
  </div>
)

const Certificates: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('earned')

  const handleDownload = (certificate: Certificate) => {
    console.log('Download certificate:', certificate)

    /**
     * Backend Integration
     *
     * const file = await certificateService.downloadCertificate(certificate.id)
     * saveAs(file)
     */
  }

  const handleShare = async (certificate: Certificate) => {
    console.log('Share certificate:', certificate)

    /**
     * Backend Integration
     *
     * const { shareUrl } = await certificateService.getShareLink(certificate.id)
     */

    const shareUrl = `https://talentflow.com/certificates/${encodeURIComponent(
      certificate.title
    )}`

    if (navigator.share) {
      try {
        await navigator.share({
          title: certificate.title,
          text: `Check out my certificate for ${certificate.title}!`,
          url: shareUrl,
        })

        return
      } catch {
        // User cancelled sharing
      }
    }

    await navigator.clipboard.writeText(shareUrl)

    alert('Certificate link copied to clipboard.')
  }

  return (
    <DashboardLayout
      title="Certificates"
      subtitle="View and download your earned certificates."
    >
      <div className="space-y-6">
        <div className="flex gap-6 border-b border-neutral-100">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`pb-3 text-sm font-medium transition-colors relative ${
                activeTab === tab.key
                  ? 'text-primary'
                  : 'text-neutral-400 hover:text-neutral-600'
              }`}
            >
              {tab.label} ({tab.count})

              {activeTab === tab.key && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-neutral-100 px-5">
          {activeTab === 'earned' &&
            (earned.length > 0 ? (
              earned.map((certificate) => (
                <CertificateRow
                  key={certificate.title}
                  certificate={certificate}
                  onDownload={handleDownload}
                  onShare={handleShare}
                />
              ))
            ) : (
              <EmptyState message="Complete a course to earn your first certificate." />
            ))}

          {activeTab === 'eligible' &&
            (eligible.length > 0 ? (
              eligible.map((course) => (
                <div
                  key={course.title}
                  className="flex flex-col sm:flex-row sm:items-center gap-4 py-4 border-b border-neutral-50 last:border-0"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="h-16 w-16 rounded-lg bg-secondary-light/20 flex-shrink-0 flex items-center justify-center text-secondary">
                      <BookOpen size={24} />
                    </div>

                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-neutral-800 truncate">
                        {course.title}
                      </h4>

                      <p className="text-xs text-neutral-400 mt-0.5">
                        {course.note}
                      </p>
                    </div>
                  </div>

                  <button className="px-4 py-2.5 border border-neutral-200 text-neutral-700 text-sm font-semibold rounded-xl hover:bg-neutral-50 transition-colors">
                    Take Assessment
                  </button>
                </div>
              ))
            ) : (
              <EmptyState message="Finish a course's coursework to unlock its certificate." />
            ))}

          {activeTab === 'inProgress' &&
            (inProgress.length > 0 ? (
              inProgress.map((course) => (
                <div
                  key={course.title}
                  className="flex items-center gap-4 py-4 border-b border-neutral-50 last:border-0"
                >
                  <div className="h-16 w-16 rounded-lg bg-neutral-50 flex-shrink-0 flex items-center justify-center text-neutral-400">
                    <Clock size={24} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-neutral-800 truncate">
                      {course.title}
                    </h4>

                    <p className="text-xs text-neutral-400 mb-2">
                      {course.instructor}
                    </p>

                    <div className="flex items-center gap-3">
                      <div className="flex-1 max-w-[200px] sm:max-w-[300px]">
                        <ProgressBar progress={course.progress} size="sm" />
                      </div>

                      <span className="text-xs font-medium text-neutral-600 whitespace-nowrap">
                        {course.progress}%
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <EmptyState message="Courses you're actively working through will show up here." />
            ))}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Certificates