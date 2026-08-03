import React, { useState } from 'react'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import Modal from '../../common/Modal'
import { LogOut } from 'lucide-react'

interface DashboardLayoutProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title, subtitle }) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [logoutModalOpen, setLogoutModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white flex">
      <Sidebar
        onLogoutClick={() => setLogoutModalOpen(true)}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0 lg:ml-0">
        <TopBar
          title={title}
          subtitle={subtitle}
          onMenuClick={() => setMobileSidebarOpen(true)}
        />
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>

      <Modal isOpen={logoutModalOpen} onClose={() => setLogoutModalOpen(false)}>
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
            <LogOut size={28} className="text-red-500" />
          </div>
          <h3 className="text-xl font-bold text-neutral-800 mb-2">Log Out?</h3>
          <p className="text-sm text-neutral-500 mb-6 max-w-xs mx-auto">
            Are you sure you want to log out of your Talent Faculty account?
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => setLogoutModalOpen(false)}
              className="px-6 py-2.5 rounded-xl border border-neutral-200 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setLogoutModalOpen(false)
                window.location.href = '/login'
              }}
              className="px-6 py-2.5 rounded-xl bg-primary text-sm font-semibold text-white hover:bg-primary-dark transition-colors"
            >
              Yes, Log Out
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default DashboardLayout