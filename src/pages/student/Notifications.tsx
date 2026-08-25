import React, { useState } from 'react'
import { AlertTriangle, Bell } from 'lucide-react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import Modal from '../../components/common/Modal'

type TabKey = 'all' | 'unread'

interface NotificationItem {
  id: number
  title: string
  description: string
  time: string
  unread: boolean
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 1,
    title: 'Assignment Due Tomorrow',
    description: 'Wireframe Mobile Banking is due tomorrow',
    time: '10:05 AM',
    unread: true,
  },
  {
    id: 2,
    title: 'New Announcement',
    description: 'UI/UX Design Workshop on Friday at 5 PM',
    time: 'Yesterday',
    unread: true,
  },
  {
    id: 3,
    title: 'Quiz Released',
    description: 'Design Thinking Quiz is now available',
    time: '2nd May, 2024',
    unread: true,
  },
  {
    id: 4,
    title: 'New Message',
    description: 'Grace Johnson sent you a message',
    time: '2nd May, 2024',
    unread: true,
  },
  {
    id: 5,
    title: 'Certificate Ready',
    description: "You're eligible for a new certificate",
    time: '1st May, 2024',
    unread: true,
  },
  {
    id: 6,
    title: 'Assignment Graded',
    description: 'Your UX Research Plan has been graded',
    time: '29th Apr, 2024',
    unread: false,
  },
  {
    id: 7,
    title: 'New Announcement',
    description: 'Platform will undergo maintenance this weekend',
    time: '27th Apr, 2024',
    unread: false,
  },
  {
    id: 8,
    title: 'Quiz Released',
    description: 'User Research Basics Quiz is now available',
    time: '25th Apr, 2024',
    unread: false,
  },
  {
    id: 9,
    title: 'New Message',
    description: 'Grace Johnson replied to your question',
    time: '22nd Apr, 2024',
    unread: false,
  },
  {
    id: 10,
    title: 'Certificate Ready',
    description: "You're eligible for the Data Analysis certificate",
    time: '18th Apr, 2024',
    unread: false,
  },
]

const EmptyState: React.FC<{ message: string }> = ({ message }) => (
  <div className="flex flex-col items-center justify-center text-center py-16">
    <Bell size={32} className="text-neutral-300 mb-3" />
    <p className="text-sm text-neutral-400 max-w-xs">{message}</p>
  </div>
)

export default function Notifications() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS)
  const [activeTab, setActiveTab] = useState<TabKey>('all')
  const [confirmMarkAllOpen, setConfirmMarkAllOpen] = useState(false)

  const unreadCount = notifications.filter((n) => n.unread).length

  const visibleNotifications =
    activeTab === 'unread' ? notifications.filter((n) => n.unread) : notifications

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'all', label: `All (${notifications.length})` },
    { key: 'unread', label: `Unread (${unreadCount})` },
  ]

  const handleMarkOneAsRead = (id: number) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, unread: false } : n)))
  }

  const handleConfirmMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))
    setConfirmMarkAllOpen(false)
  }

  return (
    <DashboardLayout title="Notifications" subtitle="Stay updated with important activities.">
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex gap-6 border-b border-neutral-100 flex-1">
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
                {tab.label}

                {activeTab === tab.key && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </button>
            ))}
          </div>

          <button
            onClick={() => setConfirmMarkAllOpen(true)}
            disabled={unreadCount === 0}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${
              unreadCount === 0
                ? 'bg-primary/30 text-white cursor-not-allowed'
                : 'bg-primary text-white hover:bg-primary-dark'
            }`}
          >
            Mark All as Read
          </button>
        </div>

        <div className="space-y-3">
          {visibleNotifications.length > 0 ? (
            visibleNotifications.map((notification) => (
              <button
                key={notification.id}
                onClick={() => handleMarkOneAsRead(notification.id)}
                className={`w-full flex items-center justify-between gap-4 text-left px-6 py-5 rounded-xl transition-colors ${
                  notification.unread ? 'bg-neutral-50 hover:bg-neutral-100' : 'hover:bg-neutral-50'
                }`}
              >
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-semibold text-neutral-900 truncate">
                    {notification.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-500 mt-0.5 truncate">
                    {notification.description}
                  </p>
                </div>
                <span className="text-xs text-neutral-400 font-medium shrink-0">
                  {notification.time}
                </span>
              </button>
            ))
          ) : (
            <EmptyState message="You're all caught up. New notifications will show up here." />
          )}
        </div>
      </div>

      {/* Mark All as Read confirmation */}
      <Modal isOpen={confirmMarkAllOpen} onClose={() => setConfirmMarkAllOpen(false)}>
        <div className="text-center">
          <h3 className="text-2xl font-extrabold text-neutral-900 mb-3">Mark All as Read?</h3>
          <p className="text-sm text-neutral-500 mb-6 leading-relaxed px-2 flex items-start gap-2 justify-center">
            <AlertTriangle size={16} className="text-secondary shrink-0 mt-0.5" />
            <span>This action is permanent and you won&apos;t be able to restore the notifications to their unread state.</span>
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setConfirmMarkAllOpen(false)}
              className="flex-1 px-4 py-3 rounded-xl border border-neutral-200 text-neutral-700 text-sm font-semibold hover:bg-neutral-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmMarkAllAsRead}
              className="flex-1 px-4 py-3 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors"
            >
              Mark All as Read
            </button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  )
}
