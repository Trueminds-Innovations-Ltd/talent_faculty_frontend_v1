import React, { useState } from 'react'
import AdminSidebar from '../AdminSidebar'
import AdminTopBar from '../AdminTopBar'
import Modal from '../../../common/Modal'
import { LogOut } from 'lucide-react'

interface AdminDashboardLayoutProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
}

const AdminDashboardLayout: React.FC<AdminDashboardLayoutProps> = ({ children, title, subtitle }) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [logoutModalOpen, setLogoutModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white flex">
      <AdminSidebar
        onLogoutClick={() => setLogoutModalOpen(true)}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminTopBar
          title={title}
          subtitle={subtitle}
          onMenuClick={() => setMobileSidebarOpen(true)}
        />
        <main className="flex-1 p-3 sm:p-4 md:p-6 overflow-y-auto min-w-0">
          {children}
        </main>
      </div>

      <Modal isOpen={logoutModalOpen} onClose={() => setLogoutModalOpen(false)}>
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-admin-danger-light">
            <LogOut size={28} className="text-admin-danger" />
          </div>
          <h3 className="text-xl font-bold text-admin-ink mb-2">Log Out?</h3>
          <p className="text-sm text-admin-ash-3 mb-6 max-w-xs mx-auto">
            Are you sure you want to log out of your Talent Faculty account?
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => setLogoutModalOpen(false)}
              className="px-6 py-2.5 rounded-xl border border-admin-ash-6 text-sm font-semibold text-admin-ash-1 hover:bg-admin-ash-7/50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setLogoutModalOpen(false)
                window.location.href = '/login'
              }}
              className="px-6 py-2.5 rounded-xl bg-admin-primary text-sm font-semibold text-white hover:bg-admin-primary-dark transition-colors"
            >
              Yes, Log Out
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default AdminDashboardLayout
