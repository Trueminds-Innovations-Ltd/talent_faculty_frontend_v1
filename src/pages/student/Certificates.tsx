import React, { useState } from 'react'
import { Award, Download } from 'lucide-react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import CertificateRow from '../../components/ui/CertificateRow'
import Modal from '../../components/common/Modal'
import SuccessToast from '../../components/ui/SuccessToast'

type TabKey = 'earned' | 'inProgress'

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

const inProgress: Certificate[] = [
  {
    title: 'Data Analysis Bootcamp',
    instructor: 'Grace Johnson',
  },
  {
    title: 'Advanced JavaScript Patterns',
    instructor: 'Grace Johnson',
  },
  {
    title: 'Product Management Essentials',
    instructor: 'Grace Johnson',
  },
  {
    title: 'Public Speaking for Educators',
    instructor: 'Grace Johnson',
  },
]

const tabs = [
  { key: 'earned' as const, label: 'Earned', count: earned.length },
  { key: 'inProgress' as const, label: 'In Progress', count: inProgress.length },
]

const EmptyState: React.FC<{ message: string }> = ({ message }) => (
  <div className="flex flex-col items-center justify-center text-center py-16">
    <Award size={32} className="text-neutral-300 mb-3" />
    <p className="text-sm text-neutral-400 max-w-xs">{message}</p>
  </div>
)

const Certificates: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('earned')

  const [pendingCertificate, setPendingCertificate] = useState<Certificate | null>(null)
  const [downloadedCertificate, setDownloadedCertificate] = useState<Certificate | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const handleDownloadClick = (certificate: Certificate) => {
    setPendingCertificate(certificate)
  }

  const handleConfirmDownload = () => {
    const certificate = pendingCertificate

    /**
     * Backend Integration
     *
     * const file = await certificateService.downloadCertificate(certificate.id)
     * saveAs(file)
     */

    setPendingCertificate(null)
    setDownloadedCertificate(certificate)
  }

  const handleShare = async (certificate: Certificate) => {
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
    setToastMessage('Certificate link copied to clipboard.')
  }

  return (
    <DashboardLayout
      title="Certificates"
      subtitle="View and download your earned certificates."
    >
      <div className="space-y-6 relative">
        {toastMessage && (
          <div className="absolute top-0 right-0 z-20">
            <SuccessToast message={toastMessage} onDismiss={() => setToastMessage(null)} />
          </div>
        )}

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
                  onDownload={handleDownloadClick}
                  onShare={handleShare}
                />
              ))
            ) : (
              <EmptyState message="Complete a course to earn your first certificate." />
            ))}

          {activeTab === 'inProgress' &&
            (inProgress.length > 0 ? (
              inProgress.map((certificate) => (
                <CertificateRow key={certificate.title} certificate={certificate} locked />
              ))
            ) : (
              <EmptyState message="Courses you're actively working through will show up here." />
            ))}
        </div>
      </div>

      {/* Your certificate is ready! */}
      <Modal isOpen={!!pendingCertificate} onClose={() => setPendingCertificate(null)}>
        <div className="text-center">
          <h3 className="text-2xl font-extrabold text-neutral-900 mb-3">
            Your certificate is ready!
          </h3>
          <p className="text-sm text-neutral-500 mb-6 leading-relaxed px-2">
            You&apos;ve successfully completed this course. Download your certificate to save,
            share, or add to your professional portfolio.
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setPendingCertificate(null)}
              className="flex-1 px-4 py-3 rounded-xl border border-neutral-200 text-neutral-700 text-sm font-semibold hover:bg-neutral-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmDownload}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors"
            >
              <Download size={16} />
              Download Certificate
            </button>
          </div>
        </div>
      </Modal>

      {/* Download Success! */}
      <Modal isOpen={!!downloadedCertificate} onClose={() => setDownloadedCertificate(null)}>
        <div className="text-center">
          <h3 className="text-2xl font-extrabold text-neutral-900 mb-3">Download Success!</h3>
          <p className="text-sm text-neutral-500 mb-6 leading-relaxed px-2">
            Your course completion certificate is now saved to your device. You can access it
            anytime from your downloads or your Talent Faculty profile.
          </p>
          <button
            onClick={() => setDownloadedCertificate(null)}
            className="w-full px-4 py-3.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors"
          >
            Done
          </button>
        </div>
      </Modal>
    </DashboardLayout>
  )
}

export default Certificates
